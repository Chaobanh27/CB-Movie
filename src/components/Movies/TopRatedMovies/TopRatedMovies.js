import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/TopRatedMovies.css"
import { Link } from "react-router-dom";

function TopRatedMovies() {
    const [data, setData] = useState([]);
    const api_key = "";
  
    useEffect(() => {
      axios
        .get("https://api.themoviedb.org/3/movie/top_rated?api_key=" + api_key)
        .then((res) => {
          //console.log(res.data.results)
          setData(res.data.results);
        })
        .catch((error) => console.log(error));
    }, []);
  
    function renderData() {
      if (data.length > 0) {
        return data.map((value, key) => {
          console.log()
          return (
            <Link to={"/movie/detail/" + value.id} class="card col-2 border-0 ">
              <img
                src={"https://image.tmdb.org/t/p/original" + value.poster_path}
                class="card-img-top"
                alt=""
              />
              <div class="overlay">
                  <div className="overplay-details">
                      <div class="poster-title">{value.title}</div>
                      <div class="poster-vote">
                          <span className="imdb">
                              imdb
                          </span>
                           {value.vote_average}
                      </div>
                  </div>
              </div>
            </Link>
          );
        });
      }
    }
  
    return <>{renderData()}</>;
  }

export default TopRatedMovies