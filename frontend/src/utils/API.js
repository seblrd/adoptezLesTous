import axios from "axios";
import FormData from 'form-data';
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8000";
// const burl = "http://adoptezlestousbackend.nuriwo.ovh";

export default {
  login: function (email, password) {
    return axios.post(
      `${burl}/auth/login`,
      { email, password },
      { headers: headers })
  },
  register: function (send) {
    return axios.post(`${burl}/auth/register`, send, { headers: headers });
  },

  isAuth: function () {
    return localStorage.getItem("token") !== null;
  },
  postMessage: function (dataMessage) {
    let form_data = new FormData();
    for (let key in dataMessage) {
      form_data.append(key, dataMessage[key]);
    }
    axios.post(
      `${burl}/postMessage`, form_data)
      .then(res => { console.log("Succes" + res) })
      .catch(error => { console.log('Error', error) })
  },
  getMessage: function () {
    return axios.post(`${burl}/getMessage`);
  },
  logout: function () {
    localStorage.clear();
  },
  getOneMessage: function (_id) {
    return axios.post(`${burl}/getOneMessage/` + _id);
  },
  modifyMessage: function (id, dataMessage) {
    let form_data = new FormData();
    for (let key in dataMessage) {
      form_data.append(key, dataMessage[key]);
    }
    axios.put(
      `${burl}/editOneMessage/` + id, form_data)
      .then(res => { console.log("Succes Modify " + res) })
      .catch(error => { console.log('Error in modify' + error) })
  },
  deleteMessage: function (id) {
    axios.delete(
      `${burl}/deleteOneMessage/` + id)
      .then(res => { console.log("Successfully Deleted" + res) })
      .catch(error => { console.log('Error in delete' + error) })
  },
  getInfo: function (_id) {
    return axios.post(`${burl}/account/getInfo/` + _id);
  },
  editAccount: function (id, dataUser) {
    axios.put(
      `${burl}/account/editInfo/` + id, dataUser)
      .then(res => { console.log("Succes Modify", res.data.message) })
      .catch(error => { console.log('Error in modify' + error) })
  },
  deleteAccount: function (id) {
    axios.delete(
      `${burl}/account/deleteAccount/` + id)
      .then(res => { console.log("Successfully Deleted" + res) })
      .catch(error => { console.log('Error in delete' + error) })
  },
  getFilterMessage: function (filterParams) {
    // console.log(filterParams)
    return axios.post(`${burl}/finder/getFilterMessage`, filterParams);
  },
};
