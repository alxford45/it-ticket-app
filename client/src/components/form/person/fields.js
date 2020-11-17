export const selectOptions = [
  {
    name: "priority",
    options: [
      { value: "low", text: "Low" },
      { value: "medium", text: "Medium" },
      { value: "high", text: "High" },
    ],
  },
  {
    name: "problem_category",
    options: [
      { value: "general_help", text: "General Help" },
      { value: "problem_2", text: "Problem 2" },
    ],
  },
  {
    name: "department",
    options: [
      { value: "computer_science", text: "Computer Science" },
      { value: "petroleum_engineering", text: "Petroleum Engineering" },
      { value: "chemical_engineering", text: "Chemical Engineering" },
    ],
  },
];
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
