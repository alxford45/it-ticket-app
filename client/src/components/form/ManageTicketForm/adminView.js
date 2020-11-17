import {
  EuiButton,
  EuiCode,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSpacer,
  EuiTextArea,
  EuiTitle,
} from "@elastic/eui";
import React, { useState } from "react";
import { MyTextField } from "../MyTextField";
import { MySelectField } from "../MySelectField";
import { addToast } from "../../toast";
import { DEBUG } from "../../app/app";
import { errorMessages } from "./fields";
import { handleFormFieldBlur, handleFormFieldChange } from "./handlers";
import { selectOptions } from "../person/fields";

var _ = require("lodash");

export const AdminView = ({ data, setData }, ...props) => {
  return (
    <>
      <EuiSpacer />
      <EuiTitle size={"s"}>
        <h3>Technical Details</h3>
      </EuiTitle>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        {/*    TODO*/} blah blah blah
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiTitle size={"s"}>
        <h3>Ticket Information</h3>
      </EuiTitle>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem>
          <EuiFormRow
            label={_.find(data, ["name", "description"]).label}
            error={[
              _.find(errorMessages, [
                "error_type",
                _.find(data, ["name", "description"]).error_type,
              ]).error_message,
            ]}
            isInvalid={_.find(data, ["name", "description"]).error}
          >
            <EuiTextArea
              placeholder={"Ticket notes..."}
              name={_.find(data, ["name", "notes"]).name}
              onChange={(e) => handleFormFieldChange(e, data, setData)}
              onBlur={(e) => handleFormFieldBlur(e, data, setData)}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
