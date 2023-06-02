import "./App.css";

import DateRangePicker from "./components/DateRangePicker";
import { useState } from "react";

function App() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleDateChange = (
    startDate: string | null,
    endDate: string | null
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <>
      <p>Start date: {startDate}</p>
      <p>End date: {endDate}</p>
      <DateRangePicker
        label={{
          start: "Start",
          end: "End",
        }}
        value={[startDate, endDate]}
        onChange={handleDateChange}
        format="DD/MM/YYYY"
      />
    </>
  );
}

export default App;
