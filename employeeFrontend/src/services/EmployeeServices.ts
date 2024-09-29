import axios from "axios";
import { EmployeeFormData } from "../components/EmployeeForm/schema";
import { OK } from "zod";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface EmployeeResponse {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  email: string;
  mobile: string;
  street: string;
  suburb: string;
  state: string;
  postCode: string;
  employeeUser: string;
  employeeEmail: string;
  isPermanent: boolean;
  isFullTime: boolean;
  startDate: string;
  finishDate: string;
  weeklyHours: number;
  isArchived: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Sort2 {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface PagedResponse {
  content: EmployeeResponse[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort2;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const getAllEmployees = async () => {
  const response = await axios.get<EmployeeResponse[]>(baseURL + "/employees");
  if (response.status !== 200) {
    throw new Error("failed to fetch Employees");
  }
  return response.data;
};

export const getPagedEmployees = async (page: number = 0) => {
  const response = await axios.get<PagedResponse>(
    baseURL + `/employees/page=${page}`
  );
  if (response.status !== 200) {
    throw new Error("failed to fetch Employees");
  }
  return response.data;
};

export const getSearchedEmployees = async (
  page: number = 0,
  term: String = ""
) => {
  const response = await axios.get<PagedResponse>(
    baseURL + `/employees/page=${page}/term=${term}`
  );
  if(response.status === 404){
    throw new Error(`No results found under searched term ${term}`)
  }
  if (response.status !== 200) {
    throw new Error("failed to fetch Employees");
  }
  return response.data;
};

export const getSearchedEmployeesByArchiveStatus = async ( page: number = 0, term: String = "", archived: boolean = false) => {
  const response = await axios.get<PagedResponse>(
    baseURL + `/employees/page=${page}/term=${term}/archived=${archived}`
  );
  if(response.status === 404){
    throw new Error(`No results found under searched term ${term}`)
  }
  if (response.status !== 200) {
    throw new Error("failed to fetch Employees");
  }
  return response.data;
}

export const getEmployeeById = async (id: number) => {
  const response = await axios.get<EmployeeResponse>(
    baseURL + `/employees/${id}`
  );
  if (response.status !== 200) {
    throw new Error(`failed to find employee with id ${id}`);
  }
  return response.data;
};

export const createEmployee = async (data: EmployeeFormData) => {
  const response = await axios.post<EmployeeFormData>(
    baseURL + "/employees",
    data
  );
  if (response.status !== 201) {
    throw new Error("failed to register employee");
  }
  return response.data;
};

export const editEmployeeById = async (id: number, data: EmployeeFormData) => {
  const response = await axios.patch<EmployeeFormData>(
    baseURL + `/employees/${id}`,
    data
  );
  if (response.status !== 200) {
    throw new Error("failed to register employee");
  }
  return response.data;
};

export const archiveEmployeeById = async (id: number) => {
  const response = await axios.patch(baseURL + `/employees/archive/${id}`);
  if (response.status !== 200) {
    throw new Error("failed to archive employee");
  }
  return response.data;
};

export const deleteEmployeeById = async (id: number) => {
  await axios.delete(baseURL + `/employees/${id}`);
  return true;
};

// export const getAllEmployees = async () => {
//     const response = await fetch(baseURL + "/employees");
//     if(!response.ok){
//         throw new Error("failed to fetch Employees");
//     }
//     return (await response.json()) as EmployeeResponse[];
// }
