import axios from "axios";
// import { editOneMessage } from "../../../backend/src/controllers/dashboardController";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8000";

export default {
  login: function(email, password) {
    return axios.post(
      `${burl}/auth/login`,
      {email,password},
      {headers: headers})
  },
  register: function(send) {
    return axios.post(`${burl}/auth/register`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  postMessage: function(body) {
    return axios.post(
      `${burl}/postMessage`,
      {
        body
      },
    );
  },
  getMessage: function() {
    return axios.post(`${burl}/getMessage`);
  },
  logout: function() {
    localStorage.clear();
  }
};
