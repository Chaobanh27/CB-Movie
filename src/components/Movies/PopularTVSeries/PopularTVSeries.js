import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/PopularTVSeries.css";
import Slider from "react-slick";
import { useRef } from "react";

function PopularTVSeries() {
  const [data, setData] = useState([]);
  const api_key = "";

  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: false,
    infinite: data.length > 7,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/popular?api_key=" + api_key)
      .then((res) => {
        //console.log(res.data.results)
        setData(res.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  function renderData() {
    if (data.length > 0) {
      return data.map((value, key) => {
        console.log();
        return (
          <div class="card col-2 border-0 ">
            <img
              src={"https://image.tmdb.org/t/p/original" + value.poster_path}
              class="card-img-top"
              alt=""
            />
            <div className="card-body">
              <div className="card-title">{value.name}</div>
            </div>
            {/* <div class="overlay">
                  <div className="overplay-details">
                      <div class="poster-title">{value.title}</div>
                      <div class="poster-vote">
                          <span className="imdb">
                              imdb
                          </span>
                           {value.vote_average}
                      </div>
                  </div>
              </div> */}
          </div>
        );
      });
    }
  }

  return (
    <>
      <Slider ref={sliderRef} {...sliderSettings}>
        {renderData()}
      </Slider>
    </>
  );
}

export default PopularTVSeries;
