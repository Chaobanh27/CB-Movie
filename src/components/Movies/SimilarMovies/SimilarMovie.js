import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "./css/SimilarMovies.css";

export const SimilarMovie = () => {
  const [similar, setSimilar] = useState([]);
  let params = useParams();
  const api_key = "";

  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: false,
    infinite: similar.length > 7,
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
      .get("https://api.themoviedb.org/3/movie/" + params.id + "/similar", {
        params: {
          api_key: api_key,
        },
      })
      .then((res) => {
        //console.log(res.data.results);
        setSimilar(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const renderSimilar = () => {
    if (similar.length > 0) {
      return similar.map((value, key) => {
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
          );
        }
      });
    }
  };
  return (
    <>
      <section className="similar-movies">
        <div className="container">
          <h3>Similar Movies</h3>
          <Slider ref={sliderRef} {...sliderSettings}>
            {renderSimilar()}
          </Slider>
        </div>
      </section>
    </>
  );
};
