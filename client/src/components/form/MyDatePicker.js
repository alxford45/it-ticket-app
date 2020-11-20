import React, { useState } from "react";

import moment from "moment";

import { EuiDatePicker, EuiFormRow } from "@elastic/eui";
import { errorMessages } from "./ManageTicketForm/fields";

var _ = require("lodash");
export const MyDatePicker = (
  { name, data, setData, handleChange, handleBlur },
  ...props
) => {
  const [startDate, setStartDate] = useState(moment());

  const _handleChange = (e) => {
    setStartDate(e);
    handleChange(e);
  };

  const item = _.find(data, ["name", name]);
  return (
    <EuiFormRow
      label={item.label}
      error={[
        _.find(errorMessages, ["error_type", item.error_type]).error_message,
      ]}
      isInvalid={item.error}
    >
      <EuiDatePicker
        selected={startDate}
        onChange={(e) => _handleChange(e)}
        showTimeSelect={true}
      />
    </EuiFormRow>
  );
};
