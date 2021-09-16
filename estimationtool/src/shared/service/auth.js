import axios from "axios";

const Auth = {
  login: function (user) {
    localStorage.setItem("auth", JSON.stringify(user));

    if (user.email === "admin" && user.pass === "admin") {
      return true;
    } else {
      return false;
    }
  },

  logout: function (user) {
    localStorage.removeItem("auth");
  },
  isLogin: function () {
    let getauth = localStorage.getItem("auth");
    //let authObject = JSON.parse(getauth);
    // console.log('retrieved Object: ', JSON.parse(getauth));

    if (getauth) {
      return true;
    } else {
      return false;
    }
  },
};

export default Auth;
