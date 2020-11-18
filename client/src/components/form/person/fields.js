import { selectOptions } from "../selectOptions";

export const personFields = [
  {
    name: "first_name",
    label: "First Name",
    value: "",
    error: false,
    error_type: "required",
  },
  {
    name: "last_name",
    label: "Last Name",
    value: "",
    error: false,
    error_type: "required",
  },
  {
    name: "lsu_id",
    label: "LSU ID",
    value: "",
    error: false,
    error_type: "required",
  },
  {
    name: "department",
    label: "Department/College",
    value: selectOptions.find((o) => o.name === "department").options[0].value,
    error: false,
    error_type: "required",
  },

  {
    name: "email",
    label: "Email Address",
    value: "",
    error: false,
    error_type: "required",
  },
  {
    name: "phone_number",
    label: "Phone Number",
    value: "",
    error: false,
    error_type: "required",
  },
];
