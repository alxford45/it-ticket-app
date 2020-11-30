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
import { errorMessages, workLogFields } from "./fields";
import {
  handleDateChange,
  handleFormFieldBlur,
  handleFormFieldChange,
  handleFormSubmit,
} from "./handlers";
import { selectOptions } from "../selectOptions";
import { WorkLogTable } from "../../table/WorkLogTable";
import { TicketAssignmentTable } from "../../table/TicketAssignmentTable";
import { AddTechnicianPopover } from "../../popover/TechnicianPopover";
import { MyDatePicker } from "../MyDatePicker";

var _ = require("lodash");

export const AdminView = (
  {
    technician,
    selectedTicket,
    data,
    dispatch,
    workLogData,
    workLogLoading,
    assignLogData,
    assignLogLoading,
    assignmentRefresh,
    setAssignmentRefresh,
    workRefresh,
    setWorkRefresh,
  },
  ...props
) => {
  const internalFormSubmit = async (e, data) => {
    const d = [];
    d.push({ name: "start_datetime", value: data[0].value });
    d.push({ name: "end_datetime", value: data[1].value });
    d.push({ name: "ticket_id", value: selectedTicket.ticket_id });
    d.push({ name: "lsu_id", value: technician[0].value });

    const response = await handleFormSubmit(e, d, "/work");
    if (response != null) {
      const w = !workRefresh;
      setWorkRefresh(w);
    }
  };
  const [timeData, setTimeData] = useState(workLogFields);
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
              value={_.find(data, ["name", "notes"]).value}
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
              {assignLogLoading === true ? null : (
                <>
                  <TicketAssignmentTable
                    items={assignLogData}
                    isLoading={assignLogLoading}
                  />
                  <EuiSpacer size={"s"} />
                  <AddTechnicianPopover
                    selectedTicket={selectedTicket}
                    assignmentRefresh={assignmentRefresh}
                    setAssignmentRefresh={setAssignmentRefresh}
                  />
                </>
              )}
            </>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size={"l"} />
      <EuiTitle size={"s"}>
        <h2>Work Log</h2>
      </EuiTitle>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem>
          {workLogLoading === true ? null : (
            <WorkLogTable items={workLogData} isLoading={workLogLoading} />
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem style={{ maxWidth: 200 }}>
          <EuiFormRow>
            <MyDatePicker
              data={timeData}
              name={"start_datetime"}
              handleChange={(date) =>
                handleDateChange(date, "start_datetime", timeData, setTimeData)
              }
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 200 }}>
          <EuiFormRow>
            <MyDatePicker
              data={timeData}
              name={"end_datetime"}
              handleChange={(e) =>
                handleDateChange(e, "end_datetime", timeData, setTimeData)
              }
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow hasEmptyLabelSpace={true}>
            <EuiButton onClick={(e) => internalFormSubmit(e, timeData)}>
              Add Time Entry
            </EuiButton>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
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
