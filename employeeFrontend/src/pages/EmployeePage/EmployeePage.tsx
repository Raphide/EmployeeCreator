import React, { useState } from "react";
import Queries from "../../features/queries/Queries";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  EmployeeResponse,
  getAllEmployees,
  getPagedEmployees,
} from "../../services/EmployeeServices";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { Link } from "react-router-dom";
import styles from "./EmployeePage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar";

const EmployeePage = () => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<FormDataEntryValue | null>("");
const searchString = searchTerm?.toString().toLowerCase();

  const handleSearch = (term: FormDataEntryValue | null) => {
    console.log("Searched for term " + term);
    setSearchTerm(term);
  };

  const { isFetching, isPending, isError, data, error } = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  // const { isFetching, isPending, isError, data, error } = useQuery({
  //   queryKey: ["employees", {firstName: searchTerm}],
  //   queryFn: getAllEmployees,
  // });

  // const { isPending, isError, error, data } = useQuery({
  //   queryKey: ['employees', page],
  //   queryFn:  () => getPagedEmployees(page),
  // });
  if (isFetching) {
    return <span>Loading...</span>;
  }
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }


  return (
    <div className={styles.base}>
      <div className={styles.top}>
      <h1>Employees</h1>
      <p>Search for Employees here and click "See more" to view their profiles</p></div>
      <span>
        <div><h5>filter</h5></div>
        <SearchBar onSearch={handleSearch} />
      </span>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>User</th>
            <th>Email</th>
            <th>Contract</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {searchTerm !== "" ?  data.map((employee) => (
            `${employee.firstName} ${employee.middleName} ${employee.lastName}`.toLowerCase().includes(`${searchString}`) &&
            <tr key={employee.id}>
              <td>
                {employee.firstName}
                {employee.middleName && ` ${employee.middleName}`}{" "}
                {employee.lastName}
              </td>
              <td>{employee.employeeUser}</td>
              <td>{employee.employeeEmail}</td>
              <td>{employee.isPermanent ? "Permanent" : "Temporary"} {employee.isFullTime ? "Full Time" : "Part Time"}</td>
              <td>
                <Link to={`/employees/${employee.id}`}>See more</Link>
              </td>
            </tr>
          )) : data.map((employee) => (
            <tr key={employee.id}>
              <td>
                {employee.firstName}
                {employee.middleName && ` ${employee.middleName}`}{" "}
                {employee.lastName}
              </td>
              <td>{employee.employeeUser}</td>
              <td>{employee.employeeEmail}</td>
              <td>{employee.isPermanent ? "Permanent" : "Temporary"} {employee.isFullTime ? "Full Time" : "Part Time"}</td>
              <td>
                <Link to={`/employees/${employee.id}`}>See more</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {data.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))} */}
    </div>
  );
};

export default EmployeePage;
