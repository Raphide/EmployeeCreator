import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getSearchedEmployees,
  getSearchedEmployeesByArchiveStatus,
} from "../../services/EmployeeServices";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./EmployeePage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar";

const EmployeePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    0 | (searchParams.get("pageNo") as unknown as number)
  );
  const [archived, setArchived] = useState<boolean>(
    false || (searchParams.get("archivedStat") as unknown as boolean)
  );
  const [searchTerm, setSearchTerm] = useState<FormDataEntryValue | null>(
    "" || (searchParams.get("term") as string)
  );
  const searchString = searchTerm?.toString().toLowerCase();

  const handleSearch = (term: FormDataEntryValue | null) => {
    console.log("Searched for term " + term);
    setSearchTerm(term);
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
    setSearchTerm("");
    setArchived(false);
  }, []);

  useEffect(() => {
    setSearchParams((prevParams) => {
      prevParams.set("term", searchTerm as string);
      prevParams.set("pageNo", page as unknown as string);
      prevParams.set("archivedStat", archived as unknown as string);
      return prevParams;
    });
  }, [page, searchTerm, archived]);

  const { isFetching, isPending, isError, data, error, isPlaceholderData } =
    useQuery({
      queryKey: ["employees", page, searchString, archived],
      queryFn: () =>
        getSearchedEmployeesByArchiveStatus(page, searchString, archived),
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
      <span className={styles.filter}>
        <div>
          <button
            onClick={() => {
              setArchived(!archived);
            }}
          >
            {archived ? "Archived Employees" : "Active Employees"}
          </button>
        </div>
        <span>
          <button
            className={styles.pagButton}
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Prev
          </button>
          <h3>
            {page + 1}/{data?.totalPages || page + 1}
          </h3>
          <button
            className={styles.pagButton}
            onClick={() => {
              if (!isPlaceholderData && data?.totalPages) {
                setPage((old) => old + 1);
              }
            }}
            disabled={page + 1 === data?.totalPages}
          >
            Next
          </button>
        </span>
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
          {isError && (
            <tr>
              <td>No results for {"searched term" || searchTerm}</td>
            </tr>
          )}
          {isPending ||
            (isFetching && (
              <tr>
                <td>Loading...</td>
              </tr>
            ))}
          {!isFetching &&
            !isPending &&
            data &&
            data.content.map((employee) => (
              <tr key={employee.id}>
                <td>
                  {employee.firstName}
                  {employee.middleName && ` ${employee.middleName}`}{" "}
                  {employee.lastName}
                </td>
                <td>{employee.employeeUser}</td>
                <td>{employee.employeeEmail}</td>
                {employee.isArchived ? (
                  <td>Contract ended</td>
                ) : (
                  <td>
                    {" "}
                    {employee.isPermanent ? "Permanent" : "Temporary"}{" "}
                    {employee.isFullTime ? "Full Time" : "Part Time"}
                  </td>
                )}
                <td>
                  <Link to={`/employees/${employee.id}`}>See more</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePage;
