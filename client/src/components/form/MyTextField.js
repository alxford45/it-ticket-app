import { EuiFieldText, EuiFormRow } from "@elastic/eui";
import React from "react";
import { errorMessages } from "./ManageTicketForm/fields";

var _ = require("lodash");
export const MyTextField = (
  { name, data, handleChange, handleBlur },
  ...props
) => {
  const item = _.find(data, ["name", name]);
  return (
    <EuiFormRow
      label={item.label}
      error={[
        _.find(errorMessages, ["error_type", item.error_type]).error_message,
      ]}
      isInvalid={item.error}
    >
      <EuiFieldText
        name={item.name}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e)}
      />
    </EuiFormRow>
  );
};
