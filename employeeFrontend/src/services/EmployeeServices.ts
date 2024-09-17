import axios from "axios";

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

// export const getAllEmployees = async () => {
//     const response = await fetch(baseURL + "/employees");
//     if(!response.ok){
//         throw new Error("failed to fetch Employees");
//     }
//     return (await response.json()) as EmployeeResponse[];
// }