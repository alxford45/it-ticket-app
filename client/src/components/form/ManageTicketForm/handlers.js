import { addToast } from "../../toast";
import axios from "../../../api/api";
var _ = require("lodash");

const postData = async (endpoint, data) => {
  const response = await axios.post(endpoint, data);
  console.log(response);
};

export const handleFormSubmit = (e, data) => {
  const errors = _.find(data, ["error", true]);
  if (errors === undefined) {
    const d = data.map((o) => ({ [o.name]: o.value }));
    console.log(d);

    postData("/tech", d);

    addToast({
      title: "Ticket Submitted!",
      color: "success",
    });
  } else {
    addToast({
      title: "Check Form for Errors",
      color: "danger",
    });
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

export const handleDateChange = (date, name, data, dispatch) => {
  const newData = data;
  const index = newData.findIndex((o) => o.name === name);

  newData[index].value = date.toJSON();
  dispatch({ type: "UPDATE_DATA", payload: newData });
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
