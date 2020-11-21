import React from "react";

import { EuiBasicTable, EuiLink, EuiHealth, EuiButton } from "@elastic/eui";
import { AdminTicketFlyout } from "../flyout/flyout";

const userTest = [
  {
    id: "1",
    start_datetime: "john",
    end_datetime: "doe",
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

export const TimeLogTable = ({ handleTicketSelection }, ...props) => {
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
      field: "start_datetime",
      name: "Start Datetime",
      sortable: true,
      "data-test-subj": "firstNameCell",
    },
    {
      field: "end_datetime",
      name: "End Datetime",
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
