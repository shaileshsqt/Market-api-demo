import { errorToastMessage, successToastMessage } from "./toastMessage";

export const apiResponse = (isMsgDisplay, data, setLoading) => {
  if (data?.status_code === 0) {
    if (isMsgDisplay) {
      setLoading(false);
      errorToastMessage(data?.message);
    }
    return {
      isValidate: false,
      message: data?.message,
      data: [],
    };
  } else if (data?.status_code === 1) {
    if (setLoading) {
      setLoading(false);
    }

    if (isMsgDisplay) successToastMessage(data?.message);
    return {
      isValidate: true,
      data: data,
    };
  } else if (data?.status_code === 2) {
    localStorage.clear();
    window.location.pathname = "/";
  } else if (data?.name === "AxiosError" && !data?.response) {
    if (isMsgDisplay) {
      setLoading(false);
    }
    errorToastMessage(data?.message);
    return {
      isValidate: false,
      data: data,
    };
  } else if (data?.name === "AxiosError") {
    if (isMsgDisplay) {
      setLoading(false);
    }
    let errMsg = "";
    if (data?.response?.data?.errors) {
      for (const [key, value] of Object.entries(data?.response?.data?.errors)) {
        value?.map((errorItem) => {
          errMsg = errMsg + errorItem;
        });
      }
      errorToastMessage(errMsg);
    }

    return {
      isValidate: false,
      data: data,
    };
  }
};
