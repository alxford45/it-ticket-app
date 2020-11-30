import React, { useEffect, useReducer, useState } from "react";

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiForm,
  EuiFlexItem,
  EuiFlexGroup,
  EuiFormRow,
  EuiButton,
  EuiDescribedFormGroup,
  EuiFlexGrid,
  EuiLink,
  EuiSpacer,
  EuiTextArea,
  EuiFieldText,
  EuiSelect,
  EuiFilePicker,
  EuiRange,
  EuiCode,
} from "@elastic/eui";
import { NavBar } from "../../components/navbar/navbar";
import { UserView } from "../../components/form/ManageTicketForm/userView";
import { fields } from "../../components/form/ManageTicketForm/fields";
import { handleFormSubmit } from "../../components/form/ManageTicketForm/handlers";
import { Debug } from "../../components/debug/debug";
import { dataFetchReducer } from "../../api/reducers";
import { selectTechnicianOptions_default } from "../../components/form/ManageTechnicianForm/fields";

var _ = require("lodash");

export const UserRoute = (props) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: fields,
  });

  const internalFormSubmit = async (e, data) => {
    data.find((o) => o.name === "component").value = "N/A";
    const response = await handleFormSubmit(e, data, "/ticket");
    if (response.status === 201) {
      dispatch({ type: "CLEAR_FORM" });
    }
  };
  return (
    <>
      <NavBar location={props.location} />
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Submit Ticket</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentBody>
              <EuiTitle size={"s"}>
                <h3>My Information</h3>
              </EuiTitle>
              <EuiForm>
                <UserView data={state.data} dispatch={dispatch} />
                <EuiSpacer />
                <EuiFlexGroup gutterSize="s" alignItems="center">
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      type={"submit"}
                      onClick={(e) => internalFormSubmit(e, state.data)}
                    >
                      Submit
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiForm>
              <Debug data={state.data} />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
