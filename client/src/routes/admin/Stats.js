import { EuiIcon, EuiPanel, EuiStat } from "@elastic/eui";
import React, { useEffect, useState, useReducer } from "react";
import { dataFetchReducer } from "../../api/reducers";
import axios from "../../api/api";
import { ErrorCallout } from "../../components/callout/Callout";

export const MyStat = (
  { data, color, icon, description, filter, isLoading },
  ...props
) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (data != null) {
      const i = data.filter((o) => o.status === filter).length;
      setItems(i);
    }
  }, [data]);

  return (
    <>
      <EuiPanel>
        <EuiStat
          title={items}
          description={description}
          textAlign="center"
          titleColor={color}
          isLoading={isLoading}
        >
          <EuiIcon type={icon} color={color} />
        </EuiStat>
      </EuiPanel>
    </>
  );
};
