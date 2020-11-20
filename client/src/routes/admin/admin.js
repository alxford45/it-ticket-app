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
import { TicketsTable } from "../../components/table/openTickets";
import { AdminTicketFlyout } from "../../components/flyout/flyout";
import { UserView } from "../../components/form/ManageTicketForm/userView";
import { fields } from "../../components/form/ManageTicketForm/fields";
import { handleFormSubmit } from "../../components/form/ManageTicketForm/handlers";
import { AdminView } from "../../components/form/ManageTicketForm/adminView";
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
              <SelectTechnician setTechnician={setTechnician} />
            ) : (
              <ManageTicket />
            )}
          </div>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
