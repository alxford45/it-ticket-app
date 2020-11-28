import React, { useEffect, useReducer, useState } from "react";

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
  selectTechnicianOptions_default,
} from "../../components/form/ManageTechnicianForm/fields";
import axios from "../../api/api.js";
import { dataFetchReducer } from "../../api/reducers";

var _ = require("lodash");

export const SelectTechnician = ({ setTechnician }, ...props) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: fields,
    selectTechnicianOptions: selectTechnicianOptions_default,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios.get("/user/admin");
        const final = {
          name: "technician",
          options: result.data.map((o) => ({
            ...o,
            value: (o.first_name + "_" + o.last_name).toLowerCase(),
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

  const handleFormSubmit = (e, data) => {
    const errors = _.find(data, ["error", true]);
    if (errors === undefined) {
      console.log(data);
      setTechnician(data);
    }
  };

  return (
    <>
      {state.isLoading ? null : (
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
                  selectOptions={state.selectTechnicianOptions}
                  handleChange={(e) =>
                    handleFormFieldChange(e, state.data, dispatch)
                  }
                  handleBlur={(e) =>
                    handleFormFieldBlur(e, state.data, dispatch)
                  }
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
      )}
    </>
  );
};
