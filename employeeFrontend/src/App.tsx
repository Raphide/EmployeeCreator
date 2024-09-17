import { useEffect, useState } from 'react'
import './App.css'
import { EmployeeResponse, getAllEmployees } from './services/EmployeeServices'
import EmployeeCard from './components/EmployeeCard/EmployeeCard';
import Counter from './features/counter/Counter';
import Queries from './features/queries/Queries';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import { EmployeeFormData } from './components/EmployeeForm/schema';

function App() {
// const [employees, setEmployees] = useState<EmployeeResponse[]>([]);

// useEffect(() => {
//   getAllEmployees().then((data) => setEmployees(data)).catch((e) => console.log(e));
// },[]);

// console.log(employees);

const onSubmit = async (data: EmployeeFormData) => {
  console.log(data);
}

const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <h1>Hello</h1>
    <EmployeeForm onSubmit={onSubmit}/>
    {/* {employees.map((employee) => <EmployeeCard key={employee.id} employee={employee} />)} */}
    <Queries/>
    <Counter/>
    </QueryClientProvider>
    </>
  )
}

export default App
