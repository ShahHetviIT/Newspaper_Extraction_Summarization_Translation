// import React, { useState } from "react";
// import "../style/SideBar.css";
// import newsData from "../Data/data.js";

// export default function SideBar({ selectedCategory, setSelectedCategory }) {
//   // const [selectedCategory, setSelectedCategory] = useState("");

//   const handleChange = (event) => {
//     setSelectedCategory(event.target.value);
//     console.log(`Selected category: ${event.target.value}`);
//   };

//   const uniqueCategories = [
//     "All",
//     ...new Set(newsData.map((newsItem) => newsItem.category)),
//   ];
//   return (
//     <div className="sideBarContainer1">
//       <div className="sideBarContainer2">
//         <div>Topics :</div>
//         <div>
//           {uniqueCategories.map((category, index) => (
//             <div key={index}>
//               <input
//                 type="radio"
//                 id={`category-${category}`}
//                 name="categories"
//                 value={category}
//                 checked={selectedCategory === category}
//                 onChange={handleChange}
//               />
//               <label htmlFor={`category-${category}`}>{category}</label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "../style/SideBar.css";
// import { ca } from "date-fns/locale/ca";

export default function SideBar({
  selectedCategory,
  setSelectedCategory,
  date,
  // language,
  fetchDataTrigger,
  setFetchDataTrigger,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories([]);
    if (fetchDataTrigger) {
      // console.log(date + "----" + language + "----" + fetchDataTrigger);
      // Fetch categories from the AP
      fetch("http://127.0.0.1:5001/api/predict-categories")
        .then((response) => response.json())
        .then((data) => {
          if (data.categories) {
            setCategories(["All", ...data.categories]);
          }
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

      // console.log(categories);
    }
  }, [fetchDataTrigger, date]);

  useEffect(() => {
    // Reset fetchDataTrigger to prevent infinite loop
    if (fetchDataTrigger) {
      setFetchDataTrigger(false);
    }
  }, [fetchDataTrigger, setFetchDataTrigger]);

  useEffect(() => {
    console.log("Categories updated:", categories);
  }, [categories]);

  // useEffect(() => {

  //     setCategories([]);

  // }, [date, language]);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log(`Selected category: ${event.target.value}`);
  };

  return (
    <div className="sideBarContainer1">
      <div className="sideBarContainer2">
        <div>Topics :</div>
        <div>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`category-${category}`}
                  name="categories"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={handleChange}
                />
                <label htmlFor={`category-${category}`}>{category}</label>
              </div>
            ))
          ) : (
            <div>Loading categories...</div>
          )}
        </div>
      </div>
    </div>
  );
}
