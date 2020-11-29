import { addToast } from "../../toast";
import axios from "../../../api/api";
var _ = require("lodash");

const postData = async (endpoint, data) => {
  console.log(data);
  const response = await axios.post(endpoint, data);
  return response;
};

const putData = async (endpoint, data) => {
  console.log(data);
  const response = await axios.put(endpoint, data);
  return response;
};

export const handleFormSubmit = async (e, data, endpoint, put) => {
  const errors = _.find(data, ["error", true]);
  if (errors === undefined) {
    let d = data.map((o) => ({ [o.name]: o.value }));
    const dd = Object.assign({}, ...d);

    let response;
    if (put === true) {
      response = await putData(endpoint, dd);
    } else {
      response = await postData(endpoint, dd);
    }

    addToast({
      title: "Saved!",
      color: "success",
    });

    return response;
  } else {
    addToast({
      title: "Check Form for Errors",
      color: "danger",
    });

    return null;
  }
};

export const handleFormFieldChange = (e, data, dispatch) => {
  const target = e.target;
  const value = target.value;
  const name = target.name;

  const newData = data;
  const index = newData.findIndex((o) => o.name === name);

  newData[index].value = value;
  dispatch({ type: "UPDATE_DATA", payload: newData });
};

export const handleDateChange = (date, name, data, setData) => {
  const newData = data;
  const index = newData.findIndex((o) => o.name === name);

  newData[index].value = date.toJSON();
  setData(newData);
};

export const handleFormFieldBlur = (e, data, dispatch) => {
  const name = e.target.name;
  const value = e.target.value;

  const newData = data;
  const index = newData.findIndex((o) => o.name === name);

  if (value === "") {
    newData[index].error = true;
    newData[index].error_msg = "required";
  } else {
    newData[index].error = false;
  }

  dispatch({ type: "UPDATE_DATA", payload: newData });
};
