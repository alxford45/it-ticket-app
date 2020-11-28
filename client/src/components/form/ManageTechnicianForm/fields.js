export const selectTechnicianOptions_default = [
  {
    name: "technician",
    options: [{ value: "", text: "" }],
  },
];
export const fields = [
  {
    name: "technician",
    label: "Technician",
    value: selectTechnicianOptions_default.find((o) => o.name === "technician")
      .options[0].value,
    error: false,
    error_type: "required",
  },
];
