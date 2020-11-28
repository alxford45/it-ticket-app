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
  EuiFlexGroup,
  EuiPanel,
  EuiFlexItem,
  EuiStat,
  EuiIcon,
  EuiSpacer,
  EuiForm,
  EuiButton,
  EuiCode,
} from "@elastic/eui";
import { NavBar } from "../../components/navbar/navbar";
import { SelectTechnician } from "./SelectTechnician";
import { ManageTicket } from "./ManageTicket";

export const AdminRoute = (props) => {
  const [technician, setTechnician] = useState(false);
  return (
    <>
      <NavBar
        location={props.location}
        technician={technician}
        setTechnician={setTechnician}
      />
      <EuiPage>
        <EuiPageBody component="div">
          <div>
            {technician === false ? (
              <SelectTechnician
                technician={technician}
                setTechnician={setTechnician}
              />
            ) : (
              <ManageTicket />
            )}
          </div>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
