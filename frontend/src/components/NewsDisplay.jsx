// import React from "react";
// import "../style/NewsDisplay.css";
// import newsData from "../Data/data.js";

// export default function NewsDisplay({ selectedCategory, newsData }) {
//   const filteredNews =
//     selectedCategory === "All" || !selectedCategory
//       ? newsData
//       : newsData.filter((item) => item.category === selectedCategory);

//   return (
//     <div className="newsContainer">
//       <div className="heading">News</div>
//       <div>
//         <div className="newsList">
//           {filteredNews.map((item, index) => (
//             <div key={index} className="newsBox">
//               <div>
//                 <p>{item.news}</p>
//               </div>

//               <div className="newsButtons">
//                 <button>Summerize</button>
//                 {/* <FontAwesomeIcon icon="fa-solid fa-microphone-lines" /> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "../style/NewsDisplay.css";
import DOMPurify from "dompurify";

export default function NewsDisplay({
  selectedCategory,
  date,
  language,
  setFetchDataTrigger,
  setSelectedCategory,
  onLanguageChange
}) {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showMore, setShowMore] = useState({});
  const [summarizedText, setSummarizedText] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const toggleShowMore = (index) => {
    setShowMore((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle between showing more or less
    }));
  };

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    console.log(language);
    setSelectedLanguage(language);
    onLanguageChange(language);
  };
  const getPreviewText = (text, index, length = 400) => {
    if (text.length <= length) return text;

    return (
      <>
        {text.slice(0, length)}
        {!showMore[index] && (
          <span
            className="showMore"
            onClick={() => toggleShowMore(index)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            ...more
          </span>
        )}
      </>
    );
  };

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     setIsLoading(true);
  //     try {
  //       let response;
  //       if (selectedCategory === "All" || !selectedCategory) {
  //         // Fetch all news using the general news A
  //         console.log("api date: " + date);
  //         console.log("api language: " +language)
  //         response = await fetch(
  //           `http://127.0.0.1:5000/api/get-news?api_key=41817dbc42cb43eba4fc5899666f1061&date=${date}&language=${language}`
  //         );
  //       } else {
  //         // Fetch category-specific news using the category API
  //         console.log(selectedCategory);
  //         response = await fetch(
  //           `http://127.0.0.1:5000/api/filter_news?category=${selectedCategory}`
  //         );
  //       }

  //       const data = await response.json();
  //       // Log the data for debugging

  //       // Assuming both APIs return an array of news articles
  //       if (Array.isArray(data.news)) {
  //         console.log(" Category Fetched data:", data.news);
  //         setNewsData(data.news); // Set newsData to data.news if it's an array
  //       } else if (Array.isArray(data)) {
  //         console.log("Fetched data:", data);
  //         setNewsData(data); // Set newsData to data directly if it's an array
  //       } else {
  //         setNewsData([]); // Set an empty array if neither is an array
  //       }
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //       setNewsData([]); // Handle error by setting an empty array
  //     } finally {
  //       setIsLoading(false);
  //       setFetchDataTrigger(true);
  //     }
  //   };

  //   fetchNews();
  // }, [selectedCategory, date, language, setFetchDataTrigger]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchNews = async () => {
      setIsLoading(true);
      try {
        let response;

        // Reset the selectedCategory to "All" if date or language changes
        setSelectedCategory("All");

        // Fetch all news using the general news API
        console.log("api date: " + date);
        console.log("api language: " + language);
        response = await fetch(
          `http://127.0.0.1:5000/api/get-news?api_key=95bb6bf55ec742bca7cfeb768f50245f&date=${date}&language=en`
        );

        const data = await response.json();
        // Log the data for debugging

        // Assuming the API returns an array of news articles
        if (Array.isArray(data.news)) {
          console.log(date, "Fetched data:", data.news);
          setNewsData(data.news); // Set newsData to data.news if it's an array
        } else if (Array.isArray(data)) {
          console.log(date, "Fetched data:", data);
          setNewsData(data); // Set newsData to data directly if it's an array
        } else {
          setNewsData([]); // Set an empty array if neither is an array
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsData([]); // Handle error by setting an empty array
      } finally {
        setShowMore({});
        setIsLoading(false);
        setFetchDataTrigger(true);
      }
    };

    // Trigger news fetching when date or language changes
    fetchNews();

    return () => {
      controller.abort();
    };
  }, [date, language, setFetchDataTrigger]); // Dependencies include date and language

  // Effect to handle fetching news when selectedCategory changes
  // useEffect(() => {
  //   if (selectedCategory === "All" || !selectedCategory) {
  //     return; // Skip fetching news if the category is "All"
  //   }

  //   const fetchCategoryNews = async () => {
  //     setIsLoading(true);
  //     try {
  //       let response;
  //       console.log(selectedCategory);
  //       response = await fetch(
  //         `http://127.0.0.1:5000/api/filter_news?category=${selectedCategory}`
  //       );

  //       const data = await response.json();
  //       // Log the data for debugging

  //       // Assuming the API returns an array of news articles
  //       if (Array.isArray(data.news)) {
  //         console.log(date,"Category Fetched data:", data.news);
  //         setNewsData(data.news); // Set newsData to data.news if it's an array
  //       } else if (Array.isArray(data)) {
  //         console.log(date,"Fetched data:", data);
  //         setNewsData(data); // Set newsData to data directly if it's an array
  //       } else {
  //         setNewsData([]); // Set an empty array if neither is an array
  //       }
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //       setNewsData([]); // Handle error by setting an empty array
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // Trigger category-specific news fetching when selectedCategory changes
  //   fetchCategoryNews();
  // }, [selectedCategory]); // Dependencies include selectedCategory

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        let response;
        if (selectedCategory === "All" || !selectedCategory) {
          // Fetch all news using the general news A
          console.log("api date: " + date);
          console.log("api language: " + language);
          response = await fetch(
            `http://127.0.0.1:5000/api/get-news?api_key=41817dbc42cb43eba4fc5899666f1061&date=2024-09-19&language=en`
          );
        } else {
          // Fetch category-specific news using the category API
          // console.log(selectedCategory);
          // response = await fetch(
          //   `http://127.0.0.1:5000/api/filter_news?category=${selectedCategory}`
          // );

          let formattedCategory = selectedCategory;

          if (selectedCategory.includes("&")) {
            // Replace '&' with '%26' if it exists
            formattedCategory = selectedCategory.replace(/&/g, "%26");
          }

          console.log(formattedCategory);

          response = await fetch(
            `http://127.0.0.1:5000/api/filter_news?category=${formattedCategory}`
          );
        }

        const data = await response.json();
        // Log the data for debugging

        // Assuming both APIs return an array of news articles
        if (Array.isArray(data.news)) {
          console.log(" Category Fetched data:", data.news);
          setNewsData(data.news); // Set newsData to data.news if it's an array
        } else if (Array.isArray(data)) {
          console.log("Fetched data:", data);
          setNewsData(data); // Set newsData to data directly if it's an array
        } else {
          setNewsData([]); // Set an empty array if neither is an array
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsData([]); // Handle error by setting an empty array
      } finally {
        setShowMore({});
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  if (isLoading) {
    return <p>Loading news...</p>;
  }

  if (!Array.isArray(newsData) || newsData.length === 0) {
    return <p>No news available for the selected category.</p>; // Display message if no news data
  }

  const textSummarize = async (title, index) => {
    try {
      console.log(title);
      const response = await fetch(
        `http://127.0.0.1:5000/api/summarize-news?title=${title}`
      );
      const data = await response.json();
      if (data.summary) {
        const updatedSummaries = [...summarizedText];
        updatedSummaries[index] = data.summary; // Save the summarized text
        setSummarizedText(updatedSummaries);
      } else {
        console.error("No summary found");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  return (
    <div className="newsContainer">
      <div className="heading">News</div>
      <div className="newsList">
        {newsData.map((item, index) => (
          <div key={index} className="newsBox">
            <div>
              <h3
                style={{
                  textAlign: "center",
                  color: "#333",
                }}
              >
                {item.title}
              </h3>
              <div
                style={{ fontSize: "14px", marginTop: "5px", color: "#555" }}
              >
                <h4
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    marginRight: "5px",
                  }}
                >
                  Link:
                </h4>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007BFF", textDecoration: "none" }}
                >
                  {item.link}
                </a>
              </div>

              <p>
                {showMore[index]
                  ? summarizedText[index] || item.content || item
                  : getPreviewText(
                      summarizedText[index] || item.content || item,
                      index
                    )}
                {showMore[index] && (
                  <span
                    className="showLess"
                    onClick={() => toggleShowMore(index)}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    {" "}
                    Show less
                  </span>
                )}
              </p>
            </div>
            <div className="newsButtons">
              <button
                onClick={() => textSummarize(item.title, index)}
                className="summerizeButton"
              >
                Summarize
              </button>
              <select
                id="languages"
                className="selectLanguage"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="">--Select a language--</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
                <option value="ru">Russian</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
