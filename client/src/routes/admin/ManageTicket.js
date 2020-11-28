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
    isLoading: false,
    isError: false,
    data: fields,
  });

  const [selectedTicket, setSelectedTicket] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      // TODO: ONCE BACKEND IS SET UP, FORMAT AND IMPLEMENT DATA FOR TABLE
      try {
        const result = await axios.get("ticket");
        // TODO: CHANGE BACK! change payload back to result.data once backend is setup
        dispatch({ type: "FETCH_SUCCESS", payload: fields });
        const workLog = await axios.get("work");
        dispatch({ type: "FETCH_WORK_LOG_SUCCESS", payload: workLog });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
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
        <EuiFlexGroup>
          <EuiFlexItem>
            {/*TODO : UPDATE ENDPOINT*/}
            <MyStat endpoint={"ticket"} color={"danger"} icon={"node"} />
          </EuiFlexItem>
          <EuiFlexItem>
            {/*TODO: UPDATE ENDPOINT*/}
            <MyStat endpoint={"ticket"} color={"secondary"} icon={"check"} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
      <EuiSpacer size={"l"} />
      <EuiTitle size={"s"}>
        <h1>All Tickets</h1>
      </EuiTitle>
      <EuiPanel>
        <TicketsTable handleTicketSelection={handleTicketSelection} />
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
        {state.isLoading ? (
          "LOADING..."
        ) : (
          <TicketForm
            data={state.data}
            dispatch={dispatch}
            workLogData={state.workLogData}
          />
        )}
      </EuiPanel>
    </>
  );
};
