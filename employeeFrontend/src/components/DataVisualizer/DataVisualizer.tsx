import {
  Chart as ChartJs,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useState } from "react";
import { ExchangeResponse, getAllRates } from "../../services/CurrencyServices";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DataVisualizer = () => {


  const { data: rates, isLoading, isError, error } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: getAllRates,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  const chartData = {
    labels: Object.keys(rates || {}),
    datasets: [
      {
        label: "Exchange Rates (USD)",
        data: Object.values(rates || {}),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Currency Exchange Rates",
      },
    },
  };

  return (
    <div>
      <h2>Currency Exchange Rates</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DataVisualizer;
