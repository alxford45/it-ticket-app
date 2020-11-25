import { workLogFields } from "../components/form/ManageTicketForm/fields";

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        workLogData: { ...workLogFields },
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "UPDATE_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "FETCH_WORK_LOG_SUCCESS":
      return {
        ...state,
        workLogData: action.payload,
      };
    default:
      throw new Error();
  }
};
