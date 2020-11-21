import React, { useEffect, useState, useReducer } from "react";
import axios from "../../api/api";
import { EuiBasicTable, EuiLink, EuiHealth, EuiButton } from "@elastic/eui";
import { AdminTicketFlyout } from "../flyout/flyout";
import { dataFetchReducer } from "../../api/reducers";
import { ErrorCallout } from "../callout/Callout";

const userTest = [
  {
    id: "1",
    firstName: "john",
    lastName: "doe",
    github: "johndoe",
    dateOfBirth: Date.now(),
    nationality: "NL",
    online: true,
  },
];

export const TicketsTable = ({ handleTicketSelection }, ...props) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      // TODO: ONCE BACKEND IS SET UP, FORMAT AND IMPLEMENT DATA FOR TABLE
      try {
        const result = await axios.get("ticket");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      field: "firstName",
      name: "First Name",
      sortable: true,
      "data-test-subj": "firstNameCell",
      mobileOptions: {
        render: (item) => (
          <span>
            {item.firstName}{" "}
            <EuiLink href="#" target="_blank">
              {item.lastName}
            </EuiLink>
          </span>
        ),
        header: false,
        truncateText: false,
        enlarge: true,
        fullWidth: true,
      },
    },
    {
      field: "lastName",
      name: "Last Name",
      truncateText: true,
      render: (name) => (
        <EuiLink href="#" target="_blank">
          {name}
        </EuiLink>
      ),
      mobileOptions: {
        show: false,
      },
    },
    {
      field: "github",
      name: "Github",
    },
    {
      field: "online",
      name: "Online",
      dataType: "boolean",
      render: (online) => {
        const color = online ? "success" : "danger";
        const label = online ? "Online" : "Offline";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
  ];

  const items = userTest.filter((user, index) => index < 10);

  const getRowProps = (item) => {
    const { id } = item;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
      onClick: (e) => {
        handleTicketSelection(e, id);
      },
    };
  };

  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: "customCellClass",
      "data-test-subj": `cell-${id}-${field}`,
      textOnly: true,
    };
  };

  return (
    <div>
      {state.isError === true ? (
        <ErrorCallout errMsg={""} />
      ) : (
        <EuiBasicTable
          items={items}
          rowHeader="firstName"
          columns={columns}
          rowProps={getRowProps}
          cellProps={getCellProps}
        />
      )}
    </div>
  );
};
