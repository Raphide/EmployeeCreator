import axios from "axios";
import { EmployeeFormData } from "../components/EmployeeForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface EmployeeResponse {
    id: number
    firstName: string
    middleName: string
    lastName: string
    gender: string
    birthDate: string
    email: string
    mobile: string
    street: string
    suburb: string
    state: string
    postCode: string
    employeeUser: string
    employeeEmail: string
    isPermanent: boolean
    isFullTime: boolean
    startDate: string
    finishDate: string
    weeklyHours: number
    isArchived: boolean
  }

  export const getAllEmployees = async () => {
    const response = await axios.get<EmployeeResponse[]>(baseURL + "/employees");
    if(response.status !== 200){
        throw new Error("failed to fetch Employees");
    }
    return response.data;
  }

  export const getPagedEmployees = async (page: number = 0) => {
    const response = await axios.get<EmployeeResponse[]>(baseURL + `/employees/page=${page}`);
    if(response.status !== 200){
        throw new Error("failed to fetch Employees");
    }
    return response.data;
  }

  export const getEmployeeById = async (id: number) => {
    const response = await axios.get<EmployeeResponse>(baseURL + `/employees/${id}`);
    if(response.status !== 200){
      throw new Error(`failed to find employee with id ${id}`);
    }
    return response.data;
  }

  export const createEmployee = async (data: EmployeeFormData) => {
    const response = await axios.post<EmployeeFormData>(baseURL + "/employees", data);
    if(response.status !== 201){
      throw new Error("failed to register employee");
    }
    return response.data;
  }

// export const getAllEmployees = async () => {
//     const response = await fetch(baseURL + "/employees");
//     if(!response.ok){
//         throw new Error("failed to fetch Employees");
//     }
//     return (await response.json()) as EmployeeResponse[];
// }