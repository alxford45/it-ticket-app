import React, { useState, useEffect, useReducer } from "react";

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
import { TicketsTable } from "../../components/table/TicketsTable";
import { AdminTicketFlyout } from "../../components/flyout/flyout";
import { UserView } from "../../components/form/ManageTicketForm/userView";
import { handleFormSubmit } from "../../components/form/ManageTicketForm/handlers";
import { AdminView } from "../../components/form/ManageTicketForm/adminView";
import { Debug } from "../../components/debug/debug";
import axios from "../../api/api";
import { fields } from "../../components/form/ManageTicketForm/fields";
import { dataFetchReducer } from "../../api/reducers";
import { MyStat } from "./Stats";

var _ = require("lodash");

const TicketForm = ({ selected }, ...props) => {
  const [workLogData, setWorkLogData] = useState(null);
  const [workLogLoading, setWorkLogLoading] = useState(true);
  const [data, setData] = useState(fields);

  useEffect(() => {
    const fetchWorkLog = async () => {
      try {
        const result = await axios.get("/ticket/work/" + selected.id);
        setWorkLogData(result.data);
        setWorkLogLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = () => {
      try {
        const ticketFields = axios.get("/ticket/" + selected.id);
        const userFields = axios.get("/user/" + selected.lsu_id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchWorkLog();
  }, [selected]);

  return (
    <>
      <EuiForm>
        <EuiTitle size={"s"}>
          <h3>Customer Information</h3>
        </EuiTitle>
        <UserView data={data} setData={setData} />
        <AdminView data={data} setData={setData} workLogData={workLogData} />
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
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [isTicketsLoading, setIsTicketsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("ticket");
        setTickets(result.data);
        setIsTicketsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleTicketSelection = (e, id) => {
    setSelectedTicket(id);
  };

  return (
    <>
      <div>
        {isTicketsLoading === true ? null : (
          <EuiFlexGroup>
            <EuiFlexItem>
              <MyStat
                data={tickets}
                color={"danger"}
                icon={"node"}
                description={"Open Tickets"}
                filter={"OPEN"}
                isLoading={isTicketsLoading}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <MyStat
                data={tickets}
                color={"primary"}
                icon={"boxesHorizontal"}
                description={"In Progress"}
                filter={"IN PROGRESS"}
                isLoading={isTicketsLoading}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <MyStat
                data={tickets}
                color={"secondary"}
                icon={"check"}
                description={"Closed Tickets"}
                filter={"CLOSE"}
                isLoading={isTicketsLoading}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        )}
      </div>
      <EuiSpacer size={"l"} />
      <EuiTitle size={"s"}>
        <h1>All Tickets</h1>
      </EuiTitle>
      <EuiPanel>
        <TicketsTable
          handleTicketSelection={handleTicketSelection}
          tickets={tickets}
          isLoading={isTicketsLoading}
        />
      </EuiPanel>
      <EuiSpacer size={"l"} />
      <EuiTitle size={"s"}>
        <h1>
          {selectedTicket === null
            ? "Create New Ticket"
            : "Edit " + selectedTicket.lsu_id + "'s Ticket"}
        </h1>
      </EuiTitle>
      <EuiPanel>
        {selectedTicket == null ? (
          "Please select ticket."
        ) : (
          <TicketForm selected={selectedTicket} setData={setSelectedTicket} />
        )}
      </EuiPanel>
    </>
  );
};
