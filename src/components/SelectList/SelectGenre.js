import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const SelectGenre = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [selectedValue, setSelectedValue] = useState(0);
    const api_key = "";

    useEffect(() => {
        axios
          .get("https://api.themoviedb.org/3/genre/movie/list",{
            params:{
                api_key:api_key
            }
          })
          .then((res) => {
            //console.log(res.data.genres)
            setData(res.data.genres);
          })
          .catch((error) => console.log(error));
      }, []);

    const renderData = () => {
        if(data.length > 0){
            return data.map((value,key) => {
                return(
                    <option key={value.id} value={value.id}>{value.name}</option>
                )
            })
        }
    }

    const handleSelectChange = (e) => {
        let selectVal = parseInt(e.target.value)
        navigate("/movie/filter/Genre/" + selectVal)
      };

  return (
    <>
      <Form.Select value={selectedValue} onChange={handleSelectChange} aria-label="Default select example">
        <option>Select movies by genre</option>
        {renderData()}
      </Form.Select>
    </>
  );
};
