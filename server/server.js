const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '../../.env' });
}
const express = require("express");
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth')
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        // Get the user token from the headers
        const token = req.headers.authorization || '';

        // Try to retrieve a user with the token
        const user = await getUser(token);

        // Add the user to the context
        return { user };
    },
});

const startApolloServer = async () => {
    await server.start();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware}
    ))

    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')))
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'))
        })
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log('GraphQL listening on http://localhost:3000/graphql');
        })
    })
}

startApolloServer();