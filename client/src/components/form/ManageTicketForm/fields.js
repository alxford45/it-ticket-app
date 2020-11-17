import { personFields, selectOptions } from "../person/fields";

export const fields = [
  ...personFields,
  {
    name: "priority",
    label: "Priority",
    value: selectOptions.find((o) => o.name === "priority").options[1].value,
    error: false,
    error_type: "none",
  },

  {
    name: "manufacturer",
    label: "Manufacturer",
    value: "",
    error: false,
    error_type: "none",
  },
  {
    name: "model",
    label: "Model",
    value: "",
    error: false,
    error_type: "none",
  },
  {
    name: "operating_system",
    label: "Operating System",
    value: "",
    error: false,
    error_type: "none",
  },
  {
    name: "operating_system_version",
    label: "Operating System Version",
    value: "",
    error: false,
    error_type: "none",
  },

  {
    name: "problem_category",
    label: "Problem Category",
    value: selectOptions.find((o) => o.name === "problem_category").options[0]
      .value,
    error: false,
    error_type: "none",
  },
  {
    name: "description",
    label: "Description",
    value: "",
    error: false,
    error_type: "none",
  },
  {
    name: "notes",
    label: "Notes",
    value: "",
    error: false,
    error_type: "none",
  },
];

export const errorMessages = [
  { error_type: "required", error_message: "This field is required." },
  { error_type: "none", error_message: "" },
];