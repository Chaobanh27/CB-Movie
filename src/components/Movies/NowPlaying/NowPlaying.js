import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/NowPlaying.css";
import { Link } from "react-router-dom";

export const NowPlaying = (props) => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState();
  const api_key = "";

  const setLoadMore = props.setLoadMore;
  useEffect(() => {
    setVisible(setLoadMore);
  }, [setLoadMore]);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/now_playing?api_key=" + api_key)
      .then((res) => {
        //console.log(res.data.results)
        setData(res.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  function renderData() {
    if (data.length > 0) {
      return data.slice(0, visible).map((value, key) => {
        return (
          <div className="col-lg-3 col-md-4 col-sm-6 mt-3">
            <Link
              to={"/movie/detail/" + value.id}
              key={value.id}
              class="card  border-0 "
            >
              <img
                src={"https://image.tmdb.org/t/p/original" + value.poster_path}
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
      });
    }
  }
  return <>{renderData()}</>;
};
