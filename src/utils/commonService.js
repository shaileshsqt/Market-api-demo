// import Moment from "moment";

const cryptoKey = "SqT_cL@SsRoOm_S@T!Sh_393987";

export const commonService = {
  setItem,
  getItem,
  getHeaders,
  getHeadersFromData,
};

function setItem(key, strString) {
  let CryptoJS = require("crypto-js");
  localStorage.setItem(key, CryptoJS.AES.encrypt(strString, cryptoKey));
}

function getItem(key) {
  let CryptoJS = require("crypto-js");
  let dataValues = localStorage.getItem(key) || "";
  let dataStr = "";
  if (dataValues !== "") {
    var bytes = CryptoJS.AES.decrypt(dataValues, cryptoKey);
    dataStr = bytes.toString(CryptoJS.enc.Utf8);
  }
  return dataStr;
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: "Bearer " + getItem("token"),
  };
}

function getHeadersFromData() {
  return {
    "Content-Type": "multipart/form-data",
    accept: "*/*",
    Authorization: "Bearer " + getItem("token"),
  };
}
