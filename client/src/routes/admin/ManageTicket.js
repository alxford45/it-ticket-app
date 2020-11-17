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
import { Table } from "../../components/table/openTickets";
import { AdminTicketFlyout } from "../../components/flyout/flyout";
import { UserView } from "../../components/form/ManageTicketForm/userView";
import { fields } from "../../components/form/ManageTicketForm/fields";
import { handleFormSubmit } from "../../components/form/ManageTicketForm/handlers";
import { AdminView } from "../../components/form/ManageTicketForm/adminView";
import { Debug } from "../../components/debug/debug";
var _ = require("lodash");

const TicketForm = ({ data, setData }, ...props) => {
  return (
    <>
      <EuiForm>
        <EuiTitle size={"s"}>
          <h3>Customer Information</h3>
        </EuiTitle>
        <UserView data={data} setData={setData} />
        <AdminView data={data} setData={setData} />
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
      <Debug data={data} />
    </>
  );
};

export const ManageTicket = (props) => {
  const [isLoadingStat, setStatLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(false);

  // TODO: useEffect to download data and to auto update changes. save to data variable.
  const [data, setData] = useState(fields);

  const handleTicketSelection = (e, id) => {
    setSelectedTicket(id);
  };

  return (
    <>
      <div>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel>
              <EuiStat
                title="50"
                description="Open Tickets"
                textAlign="center"
                titleColor={"danger"}
                isLoading={isLoadingStat}
              >
                <EuiIcon type="node" color={"danger"} />
              </EuiStat>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel>
              <EuiStat
                title="2,000"
                description="Closed Tickets"
                titleColor="secondary"
                textAlign="center"
                isLoading={isLoadingStat}
              >
                <EuiIcon type="check" color="secondary" />
              </EuiStat>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
      <EuiSpacer size={"l"} />
      <EuiTitle size={"s"}>
        <h1>All Tickets</h1>
      </EuiTitle>
      <EuiPanel>
        Temp Table until DB is setup
        <Table handleTicketSelection={handleTicketSelection} />
      </EuiPanel>
      <EuiSpacer size={"l"} />
      <EuiTitle size={"s"}>
        <h1>
          {selectedTicket === false
            ? "Create New Ticket"
            : "Edit ____'s Ticket"}
        </h1>
      </EuiTitle>
      <EuiPanel>
        <TicketForm data={data} setData={setData} />
      </EuiPanel>
    </>
  );
};
