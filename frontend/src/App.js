import React, { useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NewsDisplay from "./components/NewsDisplay";
import "./App.css";
import newsData from "./Data/data";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);

  const handleDateChange = (date) => {
    setFetchDataTrigger(true);
    setSelectedDate(date); // Date is already formatted as "YYYY-MM-DD"
  };

  const handleLanguageChange = (language) => {
    setFetchDataTrigger(true);
    setSelectedLanguage(language);
  };

  return (
    <div>
      <Header
        onDateChange={handleDateChange}
        onLanguageChange={handleLanguageChange}
      />

      <div className="app-container">
        <div className="sideBar">
          <SideBar
            date={selectedDate}
            language={selectedLanguage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            fetchDataTrigger={fetchDataTrigger}
            setFetchDataTrigger={setFetchDataTrigger}
          />
        </div>
        <div className="newsDisplay">
          {selectedDate && (
            <NewsDisplay
              date={selectedDate}
              language={selectedLanguage}
              selectedCategory={selectedCategory}
              // newsData={newsData}
              setFetchDataTrigger={setFetchDataTrigger}
              setSelectedCategory={setSelectedCategory}
              onLanguageChange={onlanguagechange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
