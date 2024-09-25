import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchedEmployees } from "../../services/EmployeeServices";
import { Link } from "react-router-dom";
import styles from "./EmployeePage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar";

const EmployeePage = () => {
  const [page, setPage] = useState<number>(0);
  const [archived, setArchived] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<FormDataEntryValue | null>("");
  const searchString = searchTerm?.toString().toLowerCase();

  const handleSearch = (term: FormDataEntryValue | null) => {
    console.log("Searched for term " + term);
    setSearchTerm(term);
  };

  const { isFetching, isPending, isError, data, error, isPlaceholderData } =
    useQuery({
      queryKey: ["employees", page, searchString],
      queryFn: () => getSearchedEmployees(page, searchString),
      placeholderData: keepPreviousData,
    });

  if (isError) {
    console.log(error.message);
  }

  return (
    <div className={styles.base}>
      <div className={styles.top}>
        <h1>Employees</h1>
        <p>
          Search for Employees here and click "See more" to view their profiles
        </p>
      </div>
      <span>
        <div>
          <h5>filter</h5>
          <button
            onClick={() => {
              setArchived(!archived);
            }}
          >
            {archived ? "Active Employees" : "Archived Employees"}
          </button>
        </div>
        <SearchBar onSearch={handleSearch} />
      </span>
      <span>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <h3>
          {page + 1}/{data?.totalPages || page + 1}
        </h3>
        <button
          onClick={() => {
            if (!isPlaceholderData && data?.totalPages) {
              setPage((old) => old + 1);
            }
          }}
          disabled={page + 1 === data?.totalPages}
        >
          Next Page
        </button>
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
          {isError && <tr>No results for {"searched term" || searchTerm}</tr>}
          {isFetching && <tr>Loading...</tr>}
          {isPending && <tr>Loading...</tr>}
          {data &&
            data.content.map(
              (employee) =>
                employee.isArchived == archived &&
                `${employee.firstName} ${employee?.middleName} ${employee.lastName}`
                  .toLowerCase()
                  .includes(`${searchString}`) && (
                  <tr key={employee.id}>
                    <td>
                      {employee.firstName}
                      {employee.middleName && ` ${employee.middleName}`}{" "}
                      {employee.lastName}
                    </td>
                    <td>{employee.employeeUser}</td>
                    <td>{employee.employeeEmail}</td>
                    <td>
                      {employee.isPermanent ? "Permanent" : "Temporary"}{" "}
                      {employee.isFullTime ? "Full Time" : "Part Time"}
                    </td>
                    <td>
                      <Link to={`/employees/${employee.id}`}>See more</Link>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePage;
