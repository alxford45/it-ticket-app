import React, { useState, Fragment } from "react";

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCodeBlock,
  EuiComboBox,
  EuiExpression,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiPopover,
  EuiSpacer,
  EuiTab,
  EuiTabs,
  EuiText,
  EuiTitle,
  EuiSuperSelect,
} from "@elastic/eui";

export const AdminTicketFlyout = ({ visible }, ...props) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(visible);

  const closeFlyout = () => setIsFlyoutVisible(false);
  const showFlyout = () => setIsFlyoutVisible(true);
  const nothing = () => null;

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        onClose={closeFlyout}
        size="l"
        ownFocus={true}
        maskProps={{ onClick: nothing() }}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="flyoutSmallTitle">A small flyout</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              In small flyouts, it is ok to reduce the header size to{" "}
              <code>s</code>.
            </p>
          </EuiText>
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                iconType="cross"
                onClick={closeFlyout}
                flush="left"
              >
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton onClick={closeFlyout} fill>
                Save
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }
  return (
    <div>
      <EuiButton onClick={showFlyout}>Show small flyout</EuiButton>

      {flyout}
    </div>
  );
};
