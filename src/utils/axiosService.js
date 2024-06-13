import axios from "axios";
import { commonService } from "./commonService";

// DATA SEND LIKE BELOW OBJECT
// {
//   method: "",
//   url: "",
//   body: {
//     username: "",
//     password: "",
//   }
// }

// IF formType PARAMETER IS TRUE THEN IT WILL BE FORM DATA OTHERWISE NORMAL JSON

export const apiCall = async (data, formType) => {
  try {
    let formData = new FormData();

    if (formType) {
      for (const [key, value] of Object.entries(data?.body)) {
        if (
          typeof value === "object" &&
          Array.isArray(value) &&
          key !== "componentjson" &&
          key !== "usersid"
        ) {
          value?.map((item, index) => {
            for (const [nestedKey, nestedValue] of Object.entries(item)) {
              formData.append(`${key}[${index}].${nestedKey}`, nestedValue);
            }
          });
        } else if (
          typeof value === "object" &&
          Array.isArray(value) &&
          key === "usersid"
        ) {
          value?.map((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(`${key}`, value);
        }
      }
    }
    let response = await axios({
      method: data.method,
      url: data?.url,
      data: formType ? formData : data?.body,
      headers: formType
        ? commonService.getHeadersFromData()
        : commonService.getHeaders(),
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};
