import { Component } from "react";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dcscmcd7q",
        uploadPreset: "ml_default",
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        maxImageWidth: 500,
        maxImageHeight: 500,
        styles: {
          palette: {
            window: "#363636",
            sourceBg: "#292929",
            windowBorder: "#FF6600",
            tabIcon: "#FF6600",
            inactiveTabIcon: "#8E8E8E",
            menuIcons: "#FF6600",
            link: "#FF6600",
            action: "#FF6600",
            inProgress: "#00BFFF",
            complete: "#33ff00",
            error: "#EA2727",
            textDark: "#FFFFFF",
            textLight: "#FFFFFF"
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          const image = result.info;
          this.props.onImageUpload(image.secure_url);
        }
      }
    );
    
    const button = document.querySelector(".edit-overlay");
    button.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        myWidget.open();
      },
      false
    );
  }

  render() {
    return this.props.children;
  }
}

export default CloudinaryUploadWidget;