import React from "react";

import { EuiCallOut, EuiLink } from "@elastic/eui";

export const ErrorCallout = ({ errMsg }, ...props) => {
  return (
    <EuiCallOut
      title="Sorry, there was an error"
      color="danger"
      iconType="alert"
    >
      <p>{errMsg}</p>
    </EuiCallOut>
  );
};
