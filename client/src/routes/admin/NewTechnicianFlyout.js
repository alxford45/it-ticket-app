import React, { useEffect, useReducer, useState } from "react";

import {
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiButton,
  EuiForm,
  EuiText,
  EuiTitle,
  EuiFlexItem,
  EuiSpacer,
  EuiFlexGroup,
} from "@elastic/eui";
import { NewTechnicianForm } from "../../components/form/ManageTechnicianForm/NewTechnicianForm";
import { personFields } from "../../components/form/person/fields";
import { handleFormSubmit } from "../../components/form/ManageTicketForm/handlers";
import { Debug } from "../../components/debug/debug";
import { dataFetchReducer } from "../../api/reducers";
import axios from "../../api/api";

export const NewTechnicianFlyout = (
  { isFlyoutVisible, setIsFlyoutVisible },
  ...props
) => {
  const closeFlyout = () => setIsFlyoutVisible(false);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: personFields,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: "FETCH_INIT" });
  //     try {
  //       dispatch({ type: "FETCH_SUCCESS", payload: result.data });
  //     } catch (error) {
  //       dispatch({ type: "FETCH_FAILURE" });
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  const showFlyout = () => setIsFlyoutVisible(true);

  if (isFlyoutVisible) {
    return (
      <EuiFlyout
        onClose={closeFlyout}
        size="s"
        ownFocus={true}
        aria-labelledby="flyoutSmallTitle"
      >
        {state.isLoading ? null : (
          <>
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="s">
                <h2 id="flyoutSmallTitle">New Technician</h2>
              </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <EuiForm>
                <NewTechnicianForm data={state.data} dispatch={dispatch} />
                <EuiSpacer />
                <EuiFlexItem grow={false}>
                  <EuiButton
                    type={"submit"}
                    onClick={(e) => {
                      handleFormSubmit(e, state.data);
                    }}
                  >
                    Save
                  </EuiButton>
                </EuiFlexItem>
                <Debug data={state.data} />
              </EuiForm>
            </EuiFlyoutBody>
          </>
        )}
      </EuiFlyout>
    );
  } else {
    return null;
  }
};
