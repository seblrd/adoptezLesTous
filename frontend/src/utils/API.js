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
  postMessage: function(dataMessage) {
    const fd = new FormData();
    fd.append("image",dataMessage.petImg, dataMessage.petImg.name)
    // console.log(dataMessage.petImg.name)
    return axios.post(
      `${burl}/postMessage`,dataMessage, fd)
      .then(res=>{console.log("Succes"+res)})
      .catch(error=>{console.log('Error', error)})
  },
  getMessage: function() {
    return axios.post(`${burl}/getMessage`);
  },
  logout: function() {
    localStorage.clear();
  },
  getOneMessage: function(_id) {
    return axios.post(`${burl}/getOneMessage/`+ _id);
  },
};
