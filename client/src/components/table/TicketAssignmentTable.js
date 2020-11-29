import React from "react";

import { EuiBasicTable, EuiLink, EuiHealth, EuiButton } from "@elastic/eui";
import { AdminTicketFlyout } from "../flyout/flyout";

export const TicketAssignmentTable = ({ items, isLoading }, ...props) => {
  const deleteUser = (user) => {};

  const actions = [
    {
      render: (item) => {
        return (
          <EuiLink onClick={() => deleteUser(item)} color="danger">
            Delete
          </EuiLink>
        );
      },
    },
  ];

  const columns = [
    {
      field: "first_name",
      name: "First Name",
    },
    {
      field: "last_name",
      name: "Last Name",
    },
    {
      name: "Actions",
      actions,
    },
  ];

  const getRowProps = (item) => {
    const { id } = item;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
      // onClick: (e) => {
      //   handleTicketSelection(e, id);
      // },
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
          items={items}
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
