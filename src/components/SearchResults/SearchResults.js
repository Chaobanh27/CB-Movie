import React from "react";
import { useContext } from "react";
import { MovieContext } from "../MyContext";
import "./css/SearchResults.css";
import { Link } from "react-router-dom";

function SearchResults() {
  const movieContext = useContext(MovieContext);
  let dataSearch = movieContext.data;

  function renderData() {
    if (dataSearch.length > 0) {
      return dataSearch.map((value, key) => {
        if (value.poster_path !== null) {
          return (
            <div key={value.id} className="col-lg-3 col-sm-4 mt-3">
              <Link to={"/movie/detail/" + value.id} class="card  border-0 ">
                <img
                  src={
                    "https://image.tmdb.org/t/p/original" + value.poster_path
                  }
                  class="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <div className="card-title">{value.title}</div>
                </div>
                {/* <div class="overlay">
                  <div className="overplay-details">
                    <div class="poster-title">{value.title}</div>
                    <div class="poster-vote">
                      <span className="imdb">imdb</span>
                      {value.vote_average}
                    </div>
                  </div>
                </div> */}
              </Link>
            </div>
          );
        }
      });
    } else {
      return (
        <h3 className="text-light">
          There are no movies or TV series that matched your query.
        </h3>
      );
    }
  }

  return (
    <>
      <section className="search-results">
        <div className="container">
          <div className="row">{renderData()}</div>
        </div>
      </section>
    </>
  );
}

export default SearchResults;
