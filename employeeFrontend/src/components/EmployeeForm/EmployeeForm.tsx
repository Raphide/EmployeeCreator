import { EmployeeFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./EmployeeForm.module.scss";

type FormType = "CREATE" | "EDIT";

interface EmployeeFormProps {
  formType?: FormType;
  onSubmit: (data: EmployeeFormData) => unknown;
  defaultValues?: EmployeeFormData;
}

const defaultDate = new Date();

const EmployeeForm = ({
  formType = "CREATE",
  defaultValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    mobile: "",
    street: "",
    suburb: "",
    state: "",
    postCode: "",
    isPermanent: false,
    isFullTime: false,
    startDate: "",
    finishDate: "",
    weeklyHours: 0,
  },
  onSubmit,
}: EmployeeFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  //   const normalizeBoolean = (value: string) => {
  //     if (value === "true") {
  //       return true;
  //     }

  //     if (value === "false") {
  //       return false;
  //     }

  //     return value;
  //   };

  isSubmitSuccessful && reset();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" type="text" {...register("firstName")} />
          {errors?.firstName && <small>{errors.firstName.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="middleName">Middle Name</label>
          <input id="middleName" type="text" {...register("middleName")} />
          {errors?.middleName && <small>{errors.middleName.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" type="text" {...register("lastName")} />
          {errors?.lastName && <small>{errors.lastName.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register("gender")}>
            <option disabled value="">
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Nonbinary</option>
          </select>
          {errors?.gender && <small>{errors.gender.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="birthDate">Date Of Birth</label>
          <input id="birthDate" type="date" {...register("birthDate")} />
          {errors?.birthDate && <small>{errors.birthDate.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors?.email && <small>{errors.email.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            type="tel"
            pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
            {...register("mobile")}
          />
          {errors?.mobile && <small>{errors.mobile.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="street">Street Address</label>
          <input id="street" type="text" {...register("street")} />
          {errors?.street && <small>{errors.street.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="suburb">Suburb</label>
          <input id="suburb" type="text" {...register("suburb")} />
          {errors?.suburb && <small>{errors.suburb.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="state">State</label>
          <select id="state" {...register("state")}>
            <option disabled value="">
              State
            </option>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="QLD">QLD</option>
            <option value="SA">SA</option>
            <option value="WA">WA</option>
            <option value="TAS">TAS</option>
            <option value="NT">NT</option>
            <option value="ACT">ACT</option>
          </select>
          {errors?.state && <small>{errors.state.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="postCode">Postcode</label>
          <input id="postCode" type="text" {...register("postCode")} />
          {errors?.postCode && <small>{errors.postCode.message}</small>}
        </div>
        <div className={styles.input}>
          <label>Contract</label>
          <span>
            <input
              id="isPermanent"
              type="checkbox"
              {...register("isPermanent")}
            />
            <label htmlFor="isPermanent">Permanent</label>
          </span>
          {errors?.isPermanent && <small>{errors.isPermanent.message}</small>}
          <span>
            <input
              id="isFullTime"
              type="checkbox"
              {...register("isFullTime")}
            />
            <label htmlFor="isFullTime">Full Time</label>
          </span>
          {errors?.isFullTime && <small>{errors.isFullTime.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="startDate">Starting Date</label>
          <input id="startDate" type="date" {...register("startDate")} />
          {errors?.startDate && <small>{errors.startDate.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="finishDate">Finishing Date</label>
          <input id="finishDate" type="date" {...register("finishDate")} />
          {errors?.finishDate && <small>{errors.finishDate.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="weeklyHours">Weekly Hours</label>
          <input
            id="weeklyHours"
            type="number"
            {...register("weeklyHours", { valueAsNumber: true })}
          />
          {errors?.weeklyHours && <small>{errors.weeklyHours.message}</small>}
        </div>
        <button>{formType === "CREATE" ? "Create" : "Edit"} Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
