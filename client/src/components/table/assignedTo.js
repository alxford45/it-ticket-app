import React from "react";

import { EuiBasicTable, EuiLink, EuiHealth, EuiButton } from "@elastic/eui";
import { AdminTicketFlyout } from "../flyout/flyout";

const userTest = [
  {
    id: "1",
    firstName: "john",
    lastName: "doe",
  },
];
/*
Example user object:



Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

export const TicketAssignmentTable = ({ handleTicketSelection }, ...props) => {
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
      field: "firstName",
      name: "First Name",
      sortable: true,
      "data-test-subj": "firstNameCell",
    },
    {
      field: "lastName",
      name: "Last Name",
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      name: "Actions",
      actions,
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
    <EuiBasicTable
      items={items}
      rowHeader="firstName"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />
  );
};
