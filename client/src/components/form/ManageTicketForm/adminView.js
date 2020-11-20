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
import { TicketAssignmentTable } from "../../table/assignedTo";
import { AddTechnicianPopover } from "../../popover/TechnicianPopover";
import { TimeLogTable } from "../../table/TimeLogTable";

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
        <EuiFlexItem style={{ maxWidth: 1000 }}>
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
      <EuiSpacer size={"l"} />
      <EuiTitle size={"m"}>
        <h2>Administration</h2>
      </EuiTitle>
      <EuiTitle size={"s"}>
        <h2>Assigned Technicians</h2>
      </EuiTitle>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem style={{ maxWidth: 500 }}>
          <EuiFormRow hasEmptyLabelSpace={true}>
            <>
              <TicketAssignmentTable />
              <EuiSpacer size={"s"} />
              <AddTechnicianPopover />
            </>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size={"l"} />
      <EuiTitle size={"s"}>
        <h2>Work Log</h2>
      </EuiTitle>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem style={{ maxWidth: 400 }}>
          <TimeLogTable />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem style={{ maxWidth: 200 }}>
          <EuiFormRow>
            <MyDatePicker
              data={data}
              name={"start_datetime"}
              handleChange={(date) =>
                handleDateChange(date, "start_datetime", data, setData)
              }
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 200 }}>
          <EuiFormRow>
            <MyDatePicker
              data={data}
              name={"end_datetime"}
              // handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
              handleChange={(e) =>
                handleDateChange(e, "end_datetime", data, setData)
              }
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow hasEmptyLabelSpace={true}>
            <EuiButton>Add Time Entry</EuiButton>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem>
          <EuiFormRow>
            <MySelectField
              handleChange={(e) => handleFormFieldChange(e, data, setData)}
              handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
              selectOptions={selectOptions}
              data={data}
              name={"status"}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
