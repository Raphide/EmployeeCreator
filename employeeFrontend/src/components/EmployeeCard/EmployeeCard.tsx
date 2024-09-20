import React from "react";
import { EmployeeResponse } from "../../services/EmployeeServices";
import styles from "./EmployeeCard.module.scss";
import { Link } from "react-router-dom";

interface EmployeeCardProps {
  employee: EmployeeResponse;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <div className={styles.base}>
    <div className={styles.card}>
      <h2>
        {employee.firstName}
        {employee.middleName && ` ${employee.middleName}`} {employee.lastName}
      </h2>
      <span>
        <h4>User: </h4><p>{employee.employeeUser}</p>
      </span>
     <span>
      <h4>Email: </h4><p>{employee.employeeEmail}</p>
     </span>
      <Link to={`/employees/${employee.id}`}>See more</Link>
    </div></div>
  );
};

export default EmployeeCard;
