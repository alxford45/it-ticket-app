import { workLogFields } from "../components/form/ManageTicketForm/fields";

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        allTickets: {},
        workLogData: { ...workLogFields },
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_ALL_TICKETS_SUCCESS":
      return {
        ...state,
        isTicketsLoading: false,
        isError: false,
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
      };
    default:
      throw new Error();
  }
};
