import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage/HomePage";
import EmployeePage from "./pages/EmployeePage/EmployeePage";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import NavBar from "./components/NavBar/NavBar";
import EmployeeInfoPage from "./pages/EmployeeInfoPage/EmployeeInfoPage";
import EditEmployeePage from "./pages/EditEmployeePage/EditEmployeePage";
import TestPage from "./pages/TestPage/TestPage";

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
          <NavBar />
          {/* <div className="buffer"></div> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/employees/create" element={<CreateEmployeePage />} />
            <Route path="/employees/:id" element={<EmployeeInfoPage />} />
            <Route path="/employees/edit/:id" element={<EditEmployeePage />} />
            <Route path="/test" element={<TestPage/>}/>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
