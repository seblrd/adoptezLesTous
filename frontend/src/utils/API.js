import axios from "axios";
import FormData from'form-data';
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
    let form_data = new FormData();
    for (let key in dataMessage ) {
      form_data.append(key, dataMessage[key]);
    }
    axios.post(
      `${burl}/postMessage`,form_data)
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
