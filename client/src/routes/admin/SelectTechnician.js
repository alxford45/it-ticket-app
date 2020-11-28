import React, { useState, useEffect, useReducer } from "react";

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiTitle,
} from "@elastic/eui";
import { MySelectField } from "../../components/form/MySelectField";
import {
  handleFormFieldBlur,
  handleFormFieldChange,
} from "../../components/form/ManageTicketForm/handlers";
import { NewTechnicianFlyout } from "./NewTechnicianFlyout";
import { Debug } from "../../components/debug/debug";
import {
  fields,
  selectOptions,
} from "../../components/form/ManageTechnicianForm/fields";
import axios from "../../api/api.js";
import { dataFetchReducer } from "../../api/reducers";

var _ = require("lodash");

export const SelectTechnician = ({ setTechnician }, ...props) => {
  const [options, setOptions] = useState(selectOptions);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: fields,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      // TODO: ONCE BACKEND IS SET UP, FORMAT AND IMPLEMENT DATA
      try {
        const result = await axios.get("ticket");
        // TODO: REMOVE! change back to result.data
        dispatch({ type: "FETCH_SUCCESS", payload: fields });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = (e, data) => {
    const errors = _.find(data, ["error", true]);
    if (errors === undefined) {
      console.log(data);
      setTechnician(data);
    }
  };

  return (
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="m">
              <h3>Choose Technician</h3>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiForm>
            <MySelectField
              name={"technician"}
              data={state.data}
              selectOptions={selectOptions}
              handleChange={(e) =>
                handleFormFieldChange(e, state.data, dispatch)
              }
              handleBlur={(e) => handleFormFieldBlur(e, state.data, dispatch)}
            />
            <EuiSpacer />
            <EuiFlexGroup gutterSize="s" alignItems="center">
              <EuiFlexItem grow={false}>
                <EuiButton
                  type={"submit"}
                  onClick={(e) => setIsFlyoutVisible(true)}
                >
                  New
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton
                  type={"submit"}
                  onClick={(e) => handleFormSubmit(e, state.data)}
                >
                  Select
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
            <Debug data={state.data} />
          </EuiForm>
        </EuiPageContent>
      </EuiPageBody>
      <NewTechnicianFlyout
        isFlyoutVisible={isFlyoutVisible}
        setIsFlyoutVisible={setIsFlyoutVisible}
      />
    </EuiPage>
  );
};
