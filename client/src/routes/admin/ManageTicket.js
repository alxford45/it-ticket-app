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

const TicketForm = ({ data, dispatch, workLogData }, ...props) => {
  return (
    <>
      <EuiForm>
        <EuiTitle size={"s"}>
          <h3>Customer Information</h3>
        </EuiTitle>
        <UserView data={data} dispatch={dispatch} />
        <AdminView data={data} dispatch={dispatch} workLogData={workLogData} />
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
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isTicketsLoading: false,
    isError: false,
    data: fields,
    allTickets: {},
  });

  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const workLog = await axios.get("work");
        dispatch({ type: "FETCH_WORK_LOG_SUCCESS", payload: workLog });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, []);

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
        {state.isTicketsLoading === true ? null : (
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
            : "Edit " + selectedTicket + "'s Ticket"}
        </h1>
      </EuiTitle>
      {/*<EuiPanel>*/}
      {/*  {state.isLoading ? (*/}
      {/*    "LOADING..."*/}
      {/*  ) : (*/}
      {/*    <TicketForm*/}
      {/*      data={state.data}*/}
      {/*      dispatch={dispatch}*/}
      {/*      workLogData={state.workLogData}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</EuiPanel>*/}
    </>
  );
};
