const Auth = {
  login: (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
  },
  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    localStorage.removeItem("fullName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("estimationHeaderId");
    localStorage.removeItem("firstName");
  },
};

export default Auth;
