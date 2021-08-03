import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const App = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("1990-01-01");
  const [endDate, setEndDate] = useState("2020-01-01");
  const [monthlySaving, setMonthlySaving] = useState(10000);
  const [startValue, setStartValue] = useState(0);

  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: "",
        data: data.investmentByMonths,
        fill: false,
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgba(0, 0, 0, 1)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      `http://localhost:3000/getInvestmentValue/?start=${startDate}&end=${endDate}&monthlySaving=${monthlySaving}&startValue=${startValue}`
    );
    const data = await response.json();
    setData(data);
  };

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
    getData();
  };

  const handleEndDate = (event) => {
    setEndDate(event.target.value);
    getData();
  };

  const handleMonthlySaving = (event) => {
    setMonthlySaving(event.target.value);
  };

  const handleStartValue = (event) => {
    setStartValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData();
  };

  return (
    <div>
      <p>Pick dates and values</p>
      <form onSubmit={handleSubmit}>
        <input type="date" onChange={handleStartDate} value={startDate} />
        <input type="date" onChange={handleEndDate} value={endDate} />
        <input
          type="number"
          onChange={handleMonthlySaving}
          value={monthlySaving}
        ></input>
        <input
          type="number"
          onChange={handleStartValue}
          value={startValue}
        ></input>
        <button>Send</button>
      </form>
      <p>Investment value: {data.investmentValue}</p>
      <p>Saved: {data.saved}</p>
      <p>Earnings: {data.earnings}</p>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default App;
