import { jwtDecode } from 'jwt-decode'

class AuthService {
  getProfile() {
    try {
      const token = this.getToken();
      if (!token) return null;
      return jwtDecode(token);
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  }

  loggedIn(){
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        // localStorage.removeItem('id_token');
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();