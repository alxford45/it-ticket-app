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
import { MyTextField } from "./MyTextField";
import { MySelectField } from "./MySelectField";
import { addToast } from "../toast";
import { DEBUG } from "../app/app";
import { errorMessages, selectOptions } from "./fields";
import { handleFormFieldBlur, handleFormFieldChange } from "./handlers";

var _ = require("lodash");

export const UserView = ({ data, setData }, ...props) => {
  return (
    <>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem>
          <MyTextField
            name={"first_name"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <MyTextField
            name={"last_name"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <MyTextField
            name={"lsu_id"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <MyTextField
            name={"department"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem grow={false} style={{ width: 250 }}>
          <MyTextField
            name={"email"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ width: 200 }}>
          <MyTextField
            name={"phone_number"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiTitle size={"s"}>
        <h3>General Information</h3>
      </EuiTitle>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem grow={false} style={{ width: 150 }}>
          <MySelectField
            name={"priority"}
            data={data}
            selectOptions={selectOptions}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup style={{ maxWidth: 1000 }}>
        <EuiFlexItem>
          <MyTextField
            name={"manufacturer"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <MyTextField
            name={"model"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <MyTextField
            name={"operating_system"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <MyTextField
            name={"operating_system_version"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiTitle size={"s"}>
        <h3>Issue Information</h3>
      </EuiTitle>
      <EuiFlexGrid>
        <EuiFlexItem>
          <MySelectField
            name={"problem_category"}
            data={data}
            handleChange={(e) => handleFormFieldChange(e, data, setData)}
            selectOptions={selectOptions}
            handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
          />
        </EuiFlexItem>
      </EuiFlexGrid>
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
              placeholder={"Computer crashes when..."}
              name={_.find(data, ["name", "description"]).name}
              onChange={(e) => handleFormFieldChange(e, data, setData)}
              onBlur={(e) => handleFormFieldBlur(e, data, setData)}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
