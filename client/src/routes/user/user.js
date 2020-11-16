import React, { useState } from "react";

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
import { UserView } from "../../components/form/userView";
import { fields } from "../../components/form/fields";
import { DEBUG } from "../../components/app/app";
import { handleFormSubmit } from "../../components/form/handlers";

var _ = require("lodash");

export const UserRoute = (props) => {
  const [data, setData] = useState(fields);

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
            {/*<EuiPageContentHeader>*/}
            {/*    <EuiPageContentHeaderSection>*/}
            {/*        <EuiTitle>*/}
            {/*            <h2>Submit Ticket</h2>*/}
            {/*        </EuiTitle>*/}
            {/*    </EuiPageContentHeaderSection>*/}
            {/*</EuiPageContentHeader>*/}
            <EuiPageContentBody>
              <EuiTitle size={"s"}>
                <h3>My Information</h3>
              </EuiTitle>
              <EuiForm>
                <UserView data={data} setData={setData} />
                <EuiSpacer />
                <EuiFlexGroup gutterSize="s" alignItems="center">
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      type={"submit"}
                      onClick={(e) => handleFormSubmit(e, data)}
                    >
                      Submit
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiForm>
              <EuiSpacer />
              {DEBUG ? (
                <div style={{ maxWidth: 1000 }}>
                  Debug:
                  <EuiSpacer />
                  <EuiCode
                    language="json"
                    isCopyable={true}
                    color={"dark"}
                    paddingSize={"m"}
                    whiteSpace={"pre"}
                    style={{ maxWidth: 1000 }}
                  >
                    {JSON.stringify(data, null, 4)}
                  </EuiCode>
                </div>
              ) : null}
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
