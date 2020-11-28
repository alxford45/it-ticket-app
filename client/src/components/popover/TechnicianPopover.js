import React, { useEffect, useReducer, useState } from "react";

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
import { dataFetchReducer } from "../../api/reducers";
import axios from "../../api/api";

export const AddTechnicianPopover = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      // TODO: ONCE BACKEND IS SET UP, FORMAT AND IMPLEMENT DATA FOR TABLE
      try {
        const result = await axios.get("ticket");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
  }, []);

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
              data={state.data}
              selectOptions={selectOptions}
              handleChange={(e) =>
                handleFormFieldChange(e, state.data, dispatch)
              }
              handleBlur={(e) => handleFormFieldBlur(e, state.data, dispatch)}
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
