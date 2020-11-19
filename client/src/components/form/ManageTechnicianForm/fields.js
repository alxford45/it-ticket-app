export const selectOptions = [
  {
    name: "technician",
    options: [
      { value: "tech_a", text: "Tech A" },
      { value: "tech_b", text: "Tech B" },
    ],
  },
];
export const fields = [
  {
    name: "technician",
    label: "Technician",
    value: selectOptions.find((o) => o.name === "technician").options[0].value,
    error: false,
    error_type: "required",
  },
];
