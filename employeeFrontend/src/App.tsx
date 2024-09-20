import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage/HomePage";
import EmployeePage from "./pages/EmployeePage/EmployeePage";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import NavBar from "./components/NavBar/NavBar";
import EmployeeInfoPage from "./pages/EmployeeInfoPage/EmployeeInfoPage";

function App() {
  // const [employees, setEmployees] = useState<EmployeeResponse[]>([]);

  // useEffect(() => {
  //   getAllEmployees().then((data) => setEmployees(data)).catch((e) => console.log(e));
  // },[]);

  // console.log(employees);

  const queryClient = new QueryClient();

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NavBar/>
          {/* <div className="buffer"></div> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/employees/create" element={<CreateEmployeePage />} />
            <Route path="/employees/:id" element={<EmployeeInfoPage/>}/>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
