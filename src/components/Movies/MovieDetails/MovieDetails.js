import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/MovieDetail.css";
import { Badge, Card } from "react-bootstrap";
import { SimilarMovie } from "../SimilarMovies/SimilarMovie";
import Slider from "react-slick";
import { useRef } from "react";
import {FaPlay} from "react-icons/fa"

export const MovieDetails = () => {
  const [data, setData] = useState({});
  const [cast, setCast] = useState([]);

  let params = useParams();
  const api_key = "";

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/" + params.id, {
        params: {
          api_key: api_key,
          append_to_response: "credits",
        },
      })
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
        setCast(res.data.credits.cast);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  const renderData = () => {
    if (Object.keys(data).length > 0) {
      return (
        <section
          style={{
            background: `rgba(0, 0, 0, 0.5)url(${
              "https://image.tmdb.org/t/p/original" + data.backdrop_path
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="movie-detail container-fluid"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12 ">
                <div className="card">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" + data.poster_path
                    }
                    className="card-img-top"
                    alt="Back_drop"
                  />
                  <Link
                    to={data.homepage}
                    className="btn btn-primary mt-3 rounded-0"
                    style={{display:"flex",justifyContent:"center",alignItems:"center"}}
                  >
                     <FaPlay size={15}/> 
                     <span> Watch Movie</span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title">{data.title}</h1>
                    <p className="card-text">{data.overview}</p>
                    <p className="card-text">
                      Genre :
                      {data.genres.length > 0 &&
                        data.genres.map((value, key) => {
                          return (
                            <Badge
                              className="mx-1"
                              key={value.id}
                              bg="secondary"
                            >
                              {value.name}
                            </Badge>
                          );
                        })}
                    </p>
                    <p className="card-text">
                      Director :
                      {data.credits.crew.length > 0 &&
                        data.credits.crew.map((value, key) => {
                          if (value.job === "Director") {
                            return value.name;
                          }
                        })}
                    </p>
                    <p className="card-text">Country : 
                    {
                      data.production_countries.length > 0 && data.production_countries.map((value,key) => {
                        return value.name
                      }).join(" & ")
                    }
                    </p>
                    <p className="card-text">
                      Release date : {data.release_date}
                    </p>
                    <p className="card-text">Status : {data.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: false,
    infinite: cast.length > 7,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide:0,
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

  const renderCast = () => {
    if (cast.length >= 0) {
      return cast.map((value, key) => {
        if (value.profile_path !== null) {
          return (
            <Link key={value.id} to={"/cast/detail/" + value.id} >
              <Card key={value.id}>
                <Card.Img
                  variant="top"
                  src={
                    "https://image.tmdb.org/t/p/original" + value.profile_path
                  }
                />
                <Card.Body>
                  <Card.Title >{value.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          );
        }
      });
    }
  };

  return (
    <>
      {renderData()}
      <section className="cast">
        <div className="container">
          <h3>Cast</h3>
          <Slider ref={sliderRef} {...sliderSettings}>
            {renderCast()}
          </Slider>
        </div>
      </section>

      <SimilarMovie />
    </>
  );
};
