import { addToast } from "../../toast";
var _ = require("lodash");

export const handleFormSubmit = (e, data) => {
  const errors = _.find(data, ["error", true]);
  if (errors === undefined) {
    console.log(data);
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
