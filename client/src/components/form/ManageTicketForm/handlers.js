import { addToast } from "../../toast";
import axios from "../../../api/api";
var _ = require("lodash");

const postData = async (endpoint, data) => {
  console.log(data);
  const response = await axios.post(endpoint, data);
  return response;
};

export const handleFormSubmit = (e, data) => {
  const errors = _.find(data, ["error", true]);
  if (errors === undefined) {
    let d = data.map((o) => ({ [o.name]: o.value }));
    const dd = Object.assign({}, ...d);

    const response = postData("/user", dd);
    addToast({
      title: "Ticket Submitted!",
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

export const handleFormFieldChange = (e, data, setData) => {
  const target = e.target;
  const value = target.value;
  const name = target.name;

  const newData = data;
  const index = newData.findIndex((o) => o.name === name);

  newData[index].value = value;
  setData(newData);
};

export const handleFormFieldChangeDispatch = (e, data, dispatch) => {
  const target = e.target;
  const value = target.value;
  const name = target.name;

  const newData = data;
  const index = newData.findIndex((o) => o.name === name);

  newData[index].value = value;
  dispatch({ type: "UPDATE_DATA", payload: newData });
};

export const handleDateChange = (date, name, data, dispatch) => {
  const newData = data;
  const index = newData.findIndex((o) => o.name === name);

  newData[index].value = date.toJSON();
  dispatch({ type: "UPDATE_DATA", payload: newData });
};

export const handleDateChangeDispatch = (date, name, data, setData) => {
  const newData = data;
  const index = newData.findIndex((o) => o.name === name);

  newData[index].value = date.toJSON();
  setData(newData);
};

export const handleFormFieldBlurDispatch = (e, data, dispatch) => {
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

export const handleFormFieldBlur = (e, data, setData) => {
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

  setData(newData);
};
