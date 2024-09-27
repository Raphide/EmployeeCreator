import { archiveEmployeeById, deleteEmployeeById, getEmployeeById } from "../../services/EmployeeServices";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs"
import styles from "./EmployeeInfoPage.module.scss"

const EmployeeInfoPage = () => {
 const navigate = useNavigate();
  const { id } = useParams() as unknown as { id: number };

  const handleClick = () => {
    archiveEmployeeById(id).then(() => navigate('/employees')).catch((e) => console.log(e));
  }

  const deleteByClick = () => {
    const confirmed = confirm("Are you sure you want to remove this employee from the database? Doing this will remove them completely from the database forever");
    if(!confirmed){
      return;
    }
    deleteEmployeeById(id).then(() => navigate('/employees')).catch((e) => console.log(e))
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployeeById(id),
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className={styles.card}>
      <h1>
        {data.firstName}
        {data.middleName && ` ${data.middleName}`} {data.lastName}
      </h1>
      <div className={styles.contents}>
      <div className={styles.section}>
      <fieldset>
        <legend>User Info</legend>
      <span><h4>User: </h4><p>{data.employeeUser}</p></span>
      <span><h4>Employee Email: </h4><p>{data.employeeEmail}</p></span></fieldset>
      <fieldset>
        <legend>Employment Info</legend>
      <span>
        <h4>Contract: </h4>
        {data.isPermanent ? <p>Permanent </p> : <p>Contract </p>}
        {data.isFullTime ? <p>Full Time</p> : <p>Part Time</p>}
      </span>
      <span>
        <h4>Weekly Hours: </h4>
        <p>{data.weeklyHours}</p>
      </span>
      <span>
        <h4>Start Date: </h4>
        <p>{dayjs(data.startDate).locale("au").format("DD-MM-YYYY")}</p>
      </span>
      <span>
        <h4>End Date: </h4>
        <p>{dayjs(data.finishDate).locale("au").format("DD-MM-YYYY")}</p>
      </span>
      </fieldset>
      </div>
      <div className={styles.section}>
      <fieldset>
        <legend>Personal Info</legend>
      <span>
        <h4>Gender: </h4>
        <p>{data.gender}</p>
      </span>
      <span>
        <h4>Birth Date: </h4>
        <p>{dayjs(data.birthDate).locale("au").format("DD-MM-YYYY")}</p>
      </span>
      <span>
        <h4>Email: </h4>
        <p>{data.email}</p>
      </span>
      <span>
        <h4>Mobile: </h4>
        <p>{data.mobile}</p>
      </span>
      <span>
        <h4>Street Address: </h4>
        <p>{data.street}</p>
      </span>
      <span>
        <h4>Suburb: </h4>
        <p>{data.suburb}</p>
      </span>
      <span>
        <h4>State: </h4>
        <p>{data.state} </p> <h4>Postcode: </h4>
        <p>{data.postCode}</p>
      </span>
      <div className={styles.buffer}></div>
      </fieldset>
      </div>
      </div>
      <span className={styles.buttons}>
      <button onClick={handleClick}>{data.isArchived ? "Reactivate " : "Remove "}Employee</button>
      {data.isArchived && <button className={styles.delete} onClick={deleteByClick}>Delete Employee from Database</button>}
      <Link to={`/employees/edit/${data.id}`}><button>Edit</button></Link></span>
    </div>
  );
};

export default EmployeeInfoPage;
