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

export const TicketsTable = (
  { handleTicketSelection, tickets, isLoading },
  ...props
) => {
  const columns = [
    {
      field: "first_name",
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
    },
    {
      field: "lsu_id",
      name: "LSU ID",
    },
    {
      field: "problem_category",
      name: "Problem Category",
    },
    {
      field: "status",
      name: "Status",
    },
  ];

  const getRowProps = (item) => {
    const { lsu_id } = item;
    return {
      "data-test-subj": `row-${lsu_id}`,
      className: "customRowClass",
      onClick: (e) => {
        handleTicketSelection(e, item);
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
      {isLoading === true ? null : (
        <EuiBasicTable
          items={tickets}
          rowHeader="first_name"
          columns={columns}
          rowProps={getRowProps}
          cellProps={getCellProps}
        />
      )}
    </div>
  );
};
