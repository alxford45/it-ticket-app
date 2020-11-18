import {
  EuiButton,
  EuiCode,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSpacer,
  EuiTextArea,
  EuiDatePickerRange,
  EuiTitle,
} from "@elastic/eui";
import React, { useState } from "react";
import { MyTextField } from "../MyTextField";
import { MySelectField } from "../MySelectField";
import { addToast } from "../../toast";
import { DEBUG } from "../../app/app";
import { errorMessages } from "./fields";
import {
  handleDateChange,
  handleFormFieldBlur,
  handleFormFieldChange,
} from "./handlers";
import { selectOptions } from "../selectOptions";
import { MyDatePicker } from "../MyDatePicker";

var _ = require("lodash");

export const AdminView = ({ data, setData }, ...props) => {
  return (
    <>
      <EuiSpacer />
      <EuiTitle size={"s"}>
        <h3>Technical Details</h3>
      </EuiTitle>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem>
          <MySelectField
            data={data}
            name={"core_issue"}
            selectOptions={selectOptions}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <MySelectField
            data={data}
            name={"component"}
            selectOptions={selectOptions}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
          />
        </EuiFlexItem>
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
          <EuiFormRow>
            <EuiFlexGroup>
              <EuiFlexItem>
                <MyDatePicker
                  data={data}
                  name={"start_datetime"}
                  handleChange={(date) =>
                    handleDateChange(date, "start_datetime", data, setData)
                  }
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <MyDatePicker
                  data={data}
                  name={"end_datetime"}
                  // handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
                  handleChange={(e) =>
                    handleDateChange(e, "end_datetime", data, setData)
                  }
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
