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
import { MySelectField } from "../MySelectField";
import { errorMessages } from "./fields";
import {
  handleDateChange,
  handleFormFieldBlur,
  handleFormFieldChange,
} from "./handlers";
import { selectOptions } from "../selectOptions";
import { TimeLogTable } from "../../table/TimeLogTable";

var _ = require("lodash");

export const AdminView = (
  { data, dispatch, workLogData, assignLogData },
  ...props
) => {
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
            selectOptions={selectOptions.find((o) => o.name === "core_issue")}
            handleBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
            handleChange={(e) => handleFormFieldChange(e, data, dispatch)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <MySelectField
            data={data}
            name={"component"}
            selectOptions={selectOptions.find((o) => o.name === "component")}
            handleBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
            handleChange={(e) => handleFormFieldChange(e, data, dispatch)}
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
            label={_.find(data, ["name", "notes"]).label}
            error={[
              _.find(errorMessages, [
                "error_type",
                _.find(data, ["name", "notes"]).error_type,
              ]).error_message,
            ]}
            isInvalid={_.find(data, ["name", "notes"]).error}
          >
            <EuiTextArea
              placeholder={"Ticket notes..."}
              name={_.find(data, ["name", "notes"]).name}
              onChange={(e) => handleFormFieldChange(e, data, dispatch)}
              onBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
              value={_.find(data, ["name", "description"]).value}
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
              {/*  TODO: WAITING ON BACKEND*/}
              {/*<TicketAssignmentTable />*/}
              {/*<EuiSpacer size={"s"} />*/}
              {/*<AddTechnicianPopover />*/}
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
      {/*  TODO: WAITING ON BACKEND*/}
      {/*<EuiFlexGroup style={{ maxWidth: 1000 }}>*/}
      {/*  <EuiFlexItem style={{ maxWidth: 200 }}>*/}
      {/*    <EuiFormRow>*/}
      {/*      <MyDatePicker*/}
      {/*        data={workLogData}*/}
      {/*        name={"start_datetime"}*/}
      {/*        handleChange={(date) =>*/}
      {/*          handleDateChange(date, "start_datetime", data, dispatch)*/}
      {/*        }*/}
      {/*      />*/}
      {/*    </EuiFormRow>*/}
      {/*  </EuiFlexItem>*/}
      {/*  <EuiFlexItem style={{ maxWidth: 200 }}>*/}
      {/*    <EuiFormRow>*/}
      {/*      <MyDatePicker*/}
      {/*        data={workLogData}*/}
      {/*        name={"end_datetime"}*/}
      {/*        handleChange={(e) =>*/}
      {/*          handleDateChange(e, "end_datetime", data, dispatch)*/}
      {/*        }*/}
      {/*      />*/}
      {/*    </EuiFormRow>*/}
      {/*  </EuiFlexItem>*/}
      {/*  <EuiFlexItem>*/}
      {/*    <EuiFormRow hasEmptyLabelSpace={true}>*/}
      {/*      <EuiButton>Add Time Entry</EuiButton>*/}
      {/*    </EuiFormRow>*/}
      {/*  </EuiFlexItem>*/}
      {/*</EuiFlexGroup>*/}
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem>
          <EuiFormRow>
            <MySelectField
              handleChange={(e) => handleFormFieldChange(e, data, dispatch)}
              handleBlur={(e) => handleFormFieldBlur(e, data, dispatch)}
              selectOptions={selectOptions.find((o) => o.name === "status")}
              data={data}
              name={"status"}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
