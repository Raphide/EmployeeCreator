import React from "react";
import { getEmployeeById } from "../../services/EmployeeServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styles from "./EmployeeInfoPage.module.scss"

const EmployeeInfoPage = () => {
  const { id } = useParams() as unknown as { id: number };
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
      <span>
        <h4>Gender: </h4>
        <p>{data.gender}</p>
      </span>
      <span>
        <h4>Birth Date: </h4>
        <p>{data.birthDate}</p>
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
        <p>{data.state} </p> <h3>Postcode: </h3>
        <p>{data.postCode}</p>
      </span>
      <span>
        <h4>Contract: </h4>
        {data.isPermanent ? <p>Permanent </p> : <p>Contract </p>}
        {data.isFullTime ? <p>Full Time</p> : <p>Part Time</p>}
      </span>
      <span>
        <h4>Start Date: </h4>
        <p>{data.startDate}</p>
      </span>
      <span>
        <h4>End Date: </h4>
        <p>{data.finishDate}</p>
      </span>
    </div>
  );
};

export default EmployeeInfoPage;
