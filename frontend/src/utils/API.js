import axios from "axios";
// import { editOneMessage } from "../../../backend/src/controllers/dashboardController";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:3000";

export default {
  login: function(email, password) {
    return axios.post(
      `${burl}/auth/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  register: function(send) {
    return axios.post(`${burl}/auth/register`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  postMessage: function(body,username) {
    return axios.post(
      `${burl}/dashboard/postMessage`,
      {
        body,
        username
      },
    );
  },
  getMessage: function() {
    return axios.post(`${burl}/dashboard/getMessage`);
  },
  logout: function() {
    localStorage.clear();
  },
  editOneMessage: function(id,body) {
    return axios.post(
      `${burl}/dashboard/editOneMessage/:id`,
      {
        id,
        body
      },
    );
  },
  getLastMessage: function() {
    return axios.get(`${burl}/dashboard/getLastMessage`);
  },
  getLastUser: function() {
    return axios.get(`${burl}/auth/getLastUser`);
  }
};
