import React, { useReducer, useState } from "react";
import {
  EuiButton,
  EuiFlexGrid,
  EuiDatePicker,
  EuiFormControlLayoutDelimited,
  EuiFlexItem,
  EuiForm,
  EuiSpacer,
  EuiFieldText,
  EuiFormRow,
  EuiGlobalToastList,
  EuiFieldNumber,
  EuiToast,
} from "@elastic/eui";
import { uuid } from "uuidv4";

let addToastHandler;
let removeAllToastsHandler;
let toastId = 0;

export function addToast(toast) {
  if (!("id" in toast)) {
    toast.id = uuid();
  }
  addToastHandler(toast);
}

export function removeAllToasts() {
  removeAllToastsHandler();
}

export default () => {
  const [toasts, setToasts] = useState([]);

  addToastHandler = (toast) => {
    setToasts(toasts.concat(toast));
  };

  const removeToast = (removedToast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };

  removeAllToastsHandler = () => {
    setToasts([]);
  };

  return (
    <EuiGlobalToastList
      toasts={toasts}
      dismissToast={removeToast}
      toastLifeTimeMs={6000}
    />
  );
};
