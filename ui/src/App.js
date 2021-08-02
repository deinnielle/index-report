import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [value, setValue] = useState([]);
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState("2000-03-01");
  const [monthlySaving, setMonthlySaving] = useState(10000);
  const [startValue, setStartValue] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      `http://localhost:3000/getInvestmentValue/?start=${startDate}&end=${endDate}&monthlySaving=${monthlySaving}&startValue=${startValue}`
    );
    const data = await response.json();
    setValue(data);
  };

  // const body = () => {
  //   return {
  //     startDate: startDate,
  //     endDate: endDate,
  //   };
  // };

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const handleMonthlySaving = (event) => {
    setMonthlySaving(event.target.value);
  };

  const handleStartValue = (event) => {
    setStartValue(event.target.value);
  };

  return (
    <div>
      <div className="App">Pick dates</div>
      <div>
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
        <button onClick={getData}>Save</button>
      </div>
    </div>
  );
};

export default App;
