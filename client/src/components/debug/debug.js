import { DEBUG_ON } from "../app/app";
import { EuiCode, EuiPageContentBody, EuiSpacer } from "@elastic/eui";
import React from "react";

export const Debug = ({ data }, props) => {
  if (DEBUG_ON) {
    return (
      <>
        <EuiSpacer />
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
      </>
    );
  } else return null;
};
