import { EuiFormRow, EuiSelect } from "@elastic/eui";
import React from "react";
var _ = require("lodash");

export const MySelectField = (
  { name, data, handleChange, handleBlur, selectOptions },
  ...props
) => {
  const item = _.find(data, ["name", name]);

  return (
    <EuiFormRow label={item.label}>
      <EuiSelect
        name={item.name}
        id={item.name}
        options={selectOptions.options}
        value={item.value}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e)}
        hasNoInitialSelection={true}
      />
    </EuiFormRow>
  );
};
