import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { AppContext } from "../store/AppContext";
import { financingSchema, OPEC_COUNTRIES } from "../utils/Contants";

export type FinancingFormValues = {
  name: string;
  country: string;
  projectCode: string;
  description: string;
  amount: number;
  currency: string;
  startDate: Date;
  endDate: Date;
};

const FinancingForm = () => {
  const { countries, currencies } = useContext(AppContext);
  const [isOpec, setIsOpec] = useState(false);

  const { register, handleSubmit, watch, control, reset, formState } =
    useForm<FinancingFormValues>({
      resolver: yupResolver(financingSchema),
    });

  const { errors } = formState;

  const selectedCountry = watch("country");

  useEffect(() => {
    setIsOpec(OPEC_COUNTRIES.includes(selectedCountry));
  }, [selectedCountry]);

  const onSubmit = async (data: FinancingFormValues) => {
    // if (isOpec) data.currency = "USD";

    // try {
    //   await axios.post(
    //     "http://test-noema-api.azurewebsites.net/api/requests",
    //     data
    //   );
    //   alert("Request submitted!");
    //   reset();
    // } catch (error) {
    //   console.error(error);
    //   alert("Something went wrong!");
    // }

    console.log("data", data);
  };

  return (
    <form
      className="max-w-md mx-auto p-4 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input placeholder="Name/Surname" {...register("name")} />
      <p>{errors.name?.message}</p>

      <select {...register("country")}>
        <option value="">Select Country</option>
        {countries.map((c: { label: string; value: string }) => (
          <option key={c.value} value={c?.value}>
            {c?.label}
          </option>
        ))}
      </select>
      <p>{errors.country?.message}</p>

      <input
        placeholder="Project Code (e.g., ABCD-1234)"
        {...register("projectCode")}
      />
      <p>{errors.projectCode?.message}</p>

      <textarea placeholder="Description" {...register("description")} />
      <p>{errors.description?.message}</p>

      <input type="number" placeholder="Amount" {...register("amount")} />
      <p>{errors.amount?.message}</p>

      {isOpec ? (
        <input value="USD" disabled />
      ) : (
        <select {...register("currency")}>
          <option value="">Select Currency</option>
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      )}
      <p>{errors.currency?.message}</p>

      <label>Start Date</label>
      <input type="date" {...register("startDate")} />
      <p>{errors.startDate?.message}</p>

      <label>End Date</label>
      <input type="date" {...register("endDate")} />
      <p>{errors.endDate?.message}</p>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default FinancingForm;

// const t = {
//   id: "31e86e1d-7edd-44eb-978c-4e0cbcc1f2f1",
//   date: "2024-08-10",
//   validityPeriod: 1,
//   projectCode: "XHIH866",
//   fullName: "Sarah Wilson",
//   countryCode: "JO",
//   amount: 3189.21,
//   currency: "JOD",
//   status: "Rejected",
// };
