import React, { useState } from "react";

import {
  EuiButton,
  EuiForm,
  EuiPopover,
  EuiFlexGroup,
  EuiFormRow,
  EuiFlexItem,
} from "@elastic/eui";
import { MySelectField } from "../form/MySelectField";
import { fields, selectOptions } from "../form/ManageTechnicianForm/fields";
import {
  handleFormFieldBlur,
  handleFormFieldChange,
} from "../form/ManageTicketForm/handlers";

export const AddTechnicianPopover = () => {
  const [data, setData] = useState(fields);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButton color={"secondary"} size={"s"} onClick={onButtonClick}>
      Add
    </EuiButton>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
    >
      <div>
        <EuiFlexGroup>
          <EuiFlexItem style={{ minWidth: 250 }}>
            <MySelectField
              name={"technician"}
              data={data}
              selectOptions={selectOptions}
              handleChange={(e) => handleFormFieldChange(e, data, setData)}
              handleBlur={(e) => handleFormFieldBlur(e, data, setData)}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow hasEmptyLabelSpace={true}>
              <EuiButton>Add</EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};
