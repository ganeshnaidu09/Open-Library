import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card"; // Ensure this component is properly implemented.

const Main = () => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);

  // Function to fetch books
  const fetchBooks = (query = "programming") => {
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyBdvpgVutFweAgZShMnulPmWcyd3Wm5fzo&maxResults=30`;

    return axios
      .get(apiURL)
      .then((res) => res.data.items || [])
      .catch((err) => {
        console.error(err);
        return [];
      });
  };

  // Fetch programming and motivational books when the component loads
  useEffect(() => {
    const fetchDefaultBooks = async () => {
      const programmingBooks = await fetchBooks("programming");
      const motivationalBooks = await fetchBooks("motivation");
      setData([...programmingBooks, ...motivationalBooks]);
    };

    fetchDefaultBooks();
  }, []);

  // Function to search for books
  const searchBook = () => {
    if (search.trim() !== "") {
      fetchBooks(search).then((results) => setData(results));
    }
  };

  // Handle Enter key press in the search input
  const handleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      searchBook();
    }
  };

  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>
            A Room without books is like <br /> A body without a soul.
          </h1>
        </div>
        <div className="row2">
          <h2>Find Your Book</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Enter your Book Name?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={searchBook}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <img src="./images/bg2.png" alt="Books" />
        </div>
      </div>
      <div className="container">
        {bookData && bookData.length > 0 ? (
          <Card book={bookData} />
        ) : (
          <p>Fetching......!</p>
        )}
      </div>
    </>
  );
};

export default Main;