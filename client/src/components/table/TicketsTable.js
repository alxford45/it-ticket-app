import React, { useEffect, useState, useReducer } from "react";
import axios from "../../api/api";
import { EuiBasicTable, EuiLink, EuiHealth, EuiButton } from "@elastic/eui";
import { AdminTicketFlyout } from "../flyout/flyout";
import { dataFetchReducer } from "../../api/reducers";
import { ErrorCallout } from "../callout/Callout";

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
      field: "last_name",
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
      render: (problem_category) => {
        String.prototype.toProperCase = function () {
          return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        };

        return problem_category.replace("_", " ").toProperCase();
      },
    },
    {
      field: "status",
      name: "Status",
      render: (status) => {
        const color =
          status === "OPEN"
            ? "danger"
            : status === "IN PROGRESS"
            ? "primary"
            : "success";
        const label =
          status === "OPEN"
            ? "Open"
            : status === "IN PROGRESS"
            ? "In Progress"
            : "Closed";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
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
          tableLayout={"auto"}
        />
      )}
    </div>
  );
};
