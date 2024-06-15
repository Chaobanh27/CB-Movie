import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CastMovie } from "./CastMovies";
import "./css/CastDetail.css"

export const CastDetail = () => {
  const [data, setData] = useState({});
  let params = useParams();
  const api_key = "";

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/person/" + params.id, {
        params: {
          api_key: api_key,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  const renderData = () => {
    if (Object.keys(data).length > 0) {
      return (
        <section key={data.id} className="cast-detail mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12 ">
                <div className="card">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" + data.profile_path
                    }
                    className="card-img-top"
                    alt="Back_drop"
                  />
                  <div className="card-body">
                    <h3 className="card-title">Personal info</h3>
                    <div className="card-text">
                        <b>Known For</b>
                        <p>{data.known_for_department}</p>
                    </div>
                    <div className="card-text">
                        <b>Birthday</b>
                        <p>{data.birthday}</p>
                    </div>
                    <div className="card-text">
                        <b>Place of Birth</b>
                        <p>{data.place_of_birth}</p>
                    </div>
                    {/* <div className="card-text">
                        <b>Also Known As</b>
                        {data.also_known_as.length > 0 && data.also_known_as.map((value,key) => {
                            return <p key={key}>{value}</p>
                        })}
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title">{data.name}</h1>
                    <p className="card-text">{data.biography}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  return (
    <>
      {renderData()}
      <CastMovie/>
    </>
  );
};
