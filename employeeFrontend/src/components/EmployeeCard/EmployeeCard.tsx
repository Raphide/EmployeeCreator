import React from "react";
import { EmployeeResponse } from "../../services/EmployeeServices";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: EmployeeResponse;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <div className={styles.card}>
      <h1>
        {employee.firstName}
        {employee.middleName && ` ${employee.middleName}`} {employee.lastName}
      </h1>
      <span>
        <h4>Gender: </h4>
        <p>{employee.gender}</p>
      </span>
      <span>
        <h4>Birth Date: </h4>
        <p>{employee.birthDate}</p>
      </span>
      <span>
        <h4>Email: </h4>
        <p>{employee.email}</p>
      </span>
      <span>
        <h4>Mobile: </h4>
        <p>{employee.mobile}</p>
      </span>
      <span>
        <h4>Street Address: </h4>
        <p>{employee.street}</p>
      </span>
      <span>
        <h4>Suburb: </h4>
        <p>{employee.suburb}</p>
      </span>
      <span>
        <h4>State: </h4>
        <p>{employee.state} </p> <h3>Postcode: </h3>
        <p>{employee.postCode}</p>
      </span>
      <span>
        <h4>Contract: </h4>
        {employee.isPermanent ? <p>Permanent </p> : <p>Contract </p>}
        {employee.isFullTime ? <p>Full Time</p> : <p>Part Time</p>}
      </span>
      <span>
        <h4>Start Date: </h4>
        <p>{employee.startDate}</p>
      </span>
      <span>
        <h4>End Date: </h4>
        <p>{employee.finishDate}</p>
      </span>
    </div>
  );
};

export default EmployeeCard;
