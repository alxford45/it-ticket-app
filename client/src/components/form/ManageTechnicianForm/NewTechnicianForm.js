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
import {
  handleFormFieldBlur,
  handleFormFieldChange,
} from "../ManageTicketForm/handlers";
import { MySelectField } from "../MySelectField";
import { selectOptions } from "../selectOptions";

var _ = require("lodash");

export const NewTechnicianForm = ({ data, dispatch }, ...props) => {
  return (
    <>
      <EuiFlexItem>
        <MyTextField
          name={"first_name"}
          data={data}
          handleChange={(e) => handleFormFieldChange(e, data, dispatch)}
          handleBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <MyTextField
          name={"last_name"}
          data={data}
          handleChange={(e) => handleFormFieldChange(e, data, dispatch)}
          handleBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <MyTextField
          name={"lsu_id"}
          data={data}
          handleChange={(e) => handleFormFieldChange(e, data, dispatch)}
          handleBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <MySelectField
          name={"department"}
          data={data}
          selectOptions={selectOptions.find((o) => o.name === "department")}
          handleChange={(e) => handleFormFieldChange(e, data, dispatch)}
          handleBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <MyTextField
          name={"email"}
          data={data}
          handleChange={(e) => handleFormFieldChange(e, data, dispatch)}
          handleBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <MyTextField
          name={"phone_number"}
          data={data}
          handleChange={(e) => handleFormFieldChange(e, data, dispatch)}
          handleBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
        />
      </EuiFlexItem>
    </>
  );
};
