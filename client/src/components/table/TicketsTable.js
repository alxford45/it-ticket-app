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
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("ticket");
        setItems(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
      {isLoading === true ? null : (
        <EuiBasicTable
          items={items}
          rowHeader="first_name"
          columns={columns}
          rowProps={getRowProps}
          cellProps={getCellProps}
        />
      )}
    </div>
  );
};
