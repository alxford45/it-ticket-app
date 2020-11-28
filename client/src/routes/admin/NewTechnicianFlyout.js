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

  const showFlyout = () => setIsFlyoutVisible(true);

  const localFormSubmit = (e, data) => {
    if (handleFormSubmit(e, data, "/user") != null) {
      setIsFlyoutVisible(false);
    }
  };

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
                      localFormSubmit(e, state.data);
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
