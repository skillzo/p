import * as yup from "yup";
import dayjs from "dayjs";

export const OPEC_COUNTRIES = [
  "Algeria",
  "Angola",
  "Congo",
  "Equatorial Guinea",
  "Gabon",
  "Iran",
  "Iraq",
  "Kuwait",
  "Libya",
  "Nigeria",
  "Saudi Arabia",
  "United Arab Emirates",
  "Venezuela",
];

export const financingSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  country: yup.string().required("Country is required"),
  projectCode: yup
    .string()
    .matches(
      /^[A-Z]{4}-[1-9]{4}$/,
      "Invalid project code format (e.g., ABCD-1234)"
    )
    .required(),
  description: yup
    .string()
    .max(150, "Max 150 characters")
    .required("Description is required"),
  amount: yup.number().positive("Amount must be positive").required(),
  // currency: yup.string().required(),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .required("End date is required")
    .test("is-valid-range", "Invalid validity range", function (value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return false;

      const now = dayjs(); // hardcode this to the day you submit
      const start = dayjs(startDate);
      const end = dayjs(value);

      const daysFromNow = start.diff(now, "day");
      const yearsDiff = end.diff(start, "year", true); // `true` gives float precision

      return daysFromNow >= 15 && yearsDiff >= 1 && yearsDiff <= 3;
    }),
});
