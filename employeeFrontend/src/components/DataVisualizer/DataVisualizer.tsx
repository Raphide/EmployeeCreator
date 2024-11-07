import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import {
  getAllEmployees,
  EmployeeResponse,
} from "../../services/EmployeeServices";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./DataVisualizer.module.scss";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const DataVisualizer = () => {
  const {
    data: employees,
    isLoading,
    error,
  } = useQuery<EmployeeResponse[]>({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const employeeCountByState =
    employees?.reduce((acc, employee) => {
      acc[employee.state] = (acc[employee.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

  const fullTimeCount =
    employees?.filter((employee) => employee.isFullTime).length || 0;
  const partTimeCount = (employees?.length || 0) - fullTimeCount;

  const maleCount =
    employees?.filter((employee) => employee.gender === "male").length || 0;
  const femaleCount =
    employees?.filter((employee) => employee.gender === "female").length || 0;
  const nonbinaryCount =
    employees?.filter((employee) => employee.gender === "nonbinary").length ||
    0;

  console.log(`${maleCount}, ${femaleCount}, ${nonbinaryCount}`);
  const barChartData = {
    labels: Object.keys(employeeCountByState),
    datasets: [
      {
        label: "Employee Count by State",
        data: Object.values(employeeCountByState),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const timePieChartData = {
    labels: ["Full-Time", "Part-Time"],
    datasets: [
      {
        label: "Count",
        data: [fullTimeCount, partTimeCount],
        backgroundColor: ["#4bc0c0", "#95cccc"],
      },
    ],
  };

  const genderPieChartData = {
    labels: ["Male", "Female", "NonBinary"],
    datasets: [
      {
        label: "Count",
        data: [maleCount, femaleCount, nonbinaryCount],
        backgroundColor: ["#36A2EB", "#FF6384", "#32a852"],
      },
    ],
  };

  // console.log(employeeCountByState)

  return (
    <div className={styles.base}>
      <div>
        <h3>Employee Count by State</h3>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
      <div>
        <h3>Employment Type Distribution</h3>
        <Pie
          data={timePieChartData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
      <div>
        <h3>Gender Distribution</h3>
        <Pie
          data={genderPieChartData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
    </div>
  );
};

export default DataVisualizer;
