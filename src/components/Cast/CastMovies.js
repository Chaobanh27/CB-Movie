import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "./css/CastMovie.css"

export const CastMovie = () => {
  const [data, setData] = useState([]);
  let params = useParams();
  const api_key = "474226313b15cb8eb2da7d23a4b6d38d";

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/discover/movie/", {
        params: {
          api_key: api_key,
          with_people: params.id,
        },
      })
      .then((res) => {
        //console.log(res.data.results);
        setData(res.data.results);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: false,
    infinite: data.length > 7,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
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

  const renderData = () => {
    if (data.length > 0) {
      return data.map((value, key) => {
        if (value.poster_path !== null) {
          return (
            <Link
              to={"/movie/detail/" + value.id}
              key={value.id}
              class="card border-0 "
            >
              <img
                src={"https://image.tmdb.org/t/p/original" + value.poster_path}
                class="card-img-top"
                alt=""
              />
              <div className="card-body">
                <div className="card-title">{value.title}</div>
              </div>
            </Link>
          );
        }
      });
    }
  };

  return (
    <>
      <section className="cast-movies">
        <div className="container">
          <h3>Knows For Movies</h3>
          <Slider ref={sliderRef} {...sliderSettings}>
            {renderData()}
          </Slider>
        </div>
      </section>
    </>
  );
};
