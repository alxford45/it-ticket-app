import {
  fields,
  workLogFields,
} from "../components/form/ManageTicketForm/fields";

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_FORM":
      const newData = state.data;
      newData.map((o) => (o.value = ""));
      return {
        ...state,
        data: newData,
      };
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_TICKET_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_TECHNICIANS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        selectTechnicianOptions: action.payload,
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
        workLogLoading: false,
      };
    case "FETCH_ASSIGN_LOG_SUCCESS":
      return {
        ...state,
        assignLog: action.payload,
        assignLogLoading: false,
      };
    default:
      throw new Error();
  }
};
