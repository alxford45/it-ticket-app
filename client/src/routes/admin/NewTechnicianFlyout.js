import React, { useState } from "react";

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

export const NewTechnicianFlyout = (
  { isFlyoutVisible, setIsFlyoutVisible },
  ...props
) => {
  const closeFlyout = () => setIsFlyoutVisible(false);
  const [data, setData] = useState(personFields);

  const showFlyout = () => setIsFlyoutVisible(true);

  if (isFlyoutVisible) {
    return (
      <EuiFlyout
        onClose={closeFlyout}
        size="s"
        ownFocus={true}
        aria-labelledby="flyoutSmallTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="flyoutSmallTitle">New Technician</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiForm>
            <NewTechnicianForm data={data} setData={setData} />
            <EuiSpacer />
            <EuiFlexItem grow={false}>
              <EuiButton
                type={"submit"}
                onClick={(e) => handleFormSubmit(e, data)}
              >
                Save
              </EuiButton>
            </EuiFlexItem>
            <Debug data={data} />
          </EuiForm>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  } else {
    return null;
  }
};
