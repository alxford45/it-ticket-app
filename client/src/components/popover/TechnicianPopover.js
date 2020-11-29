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
import {
  fields,
  selectTechnicianOptions_default,
} from "../form/ManageTechnicianForm/fields";
import {
  handleFormFieldBlur,
  handleFormFieldChange,
  handleFormSubmit,
} from "../form/ManageTicketForm/handlers";
import { dataFetchReducer } from "../../api/reducers";
import axios from "../../api/api";
import { personFields } from "../form/person/fields";

export const AddTechnicianPopover = (
  { selectedTicket, assignmentRefresh, setAssignmentRefresh },
  ...props
) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: fields,
    selectTechnicianOptions: selectTechnicianOptions_default,
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios.get("/user/admin");
        const final = {
          name: "technician",
          options: result.data.map((o) => ({
            ...o,
            value: o.lsu_id,
            text: o.first_name + " " + o.last_name,
          })),
        };
        dispatch({ type: "FETCH_TECHNICIANS_SUCCESS", payload: final });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
  }, []);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const internalFormSubmit = async (e, data) => {
    const d = [];
    d.push({ name: "lsu_id", value: data[0].value });
    d.push({ name: "ticket_id", value: selectedTicket.ticket_id });

    const response = await handleFormSubmit(e, d, "/assign");
    if (response != null) {
      setIsPopoverOpen(false);
      setAssignmentRefresh(!assignmentRefresh);
    }
  };
  const button = (
    <EuiButton color={"secondary"} size={"s"} onClick={onButtonClick}>
      Add
    </EuiButton>
  );

  return (
    <>
      {state.isLoading === true ? null : (
        <EuiPopover
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
        >
          <EuiForm>
            <EuiFlexGroup>
              <EuiFlexItem style={{ minWidth: 250 }}>
                <MySelectField
                  name={"technician"}
                  data={state.data}
                  selectOptions={state.selectTechnicianOptions}
                  handleChange={(e) => {
                    handleFormFieldChange(e, state.data, dispatch);
                  }}
                  handleBlur={(e) =>
                    handleFormFieldBlur(e, state.data, dispatch)
                  }
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow hasEmptyLabelSpace={true}>
                  <EuiButton onClick={(e) => internalFormSubmit(e, state.data)}>
                    Add
                  </EuiButton>
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiForm>
        </EuiPopover>
      )}
    </>
  );
};
