import { EuiIcon, EuiPanel, EuiStat } from "@elastic/eui";
import React, { useEffect, useReducer } from "react";
import { dataFetchReducer } from "../../api/reducers";
import axios from "../../api/api";
import { ErrorCallout } from "../../components/callout/Callout";

export const MyStat = ({ data, color, icon, description }, ...props) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: "FETCH_INIT" });
  //     // TODO: ONCE BACKEND IS SET UP, SEND TO COMPONENT
  //     try {
  //       const result = await axios.get(endpoint);
  //       dispatch({ type: "FETCH_SUCCESS", payload: result.data });
  //     } catch (error) {
  //       dispatch({ type: "FETCH_FAILURE" });
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  return (
    <>
      {state.isLoading === true ? null : (
        // <ErrorCallout errMsg={""} />
        <EuiPanel>
          <EuiStat
            title={data}
            description={description}
            textAlign="center"
            titleColor={color}
            isLoading={state.isLoading}
          >
            <EuiIcon type={icon} color={color} />
          </EuiStat>
        </EuiPanel>
      )}
    </>
  );
};
