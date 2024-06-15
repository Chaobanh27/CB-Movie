import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const SelectCountry = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [selectedValue, setSelectedValue] = useState(0);
    const api_key = "";

    useEffect(() => {
        axios
          .get("https://api.themoviedb.org/3/configuration/languages",{
            params:{
                api_key:api_key
            }
          })
          .then((res) => {
            //console.log(res.data)
            setData(res.data);
          })
          .catch((error) => console.log(error));
      }, []);

    const renderData = () => {
        if(data.length > 0){
            return data.map((value,key) => {
                return(
                    <option key={key} value={value.iso_639_1}>{value.english_name}</option>
                )
            })
        }
    }

    const handleSelectChange = (e) => {
        let selectVal = e.target.value
        //console.log(selectVal)
        navigate("/movie/filter/Country/" + selectVal)
      };

  return (
    <>
      <Form.Select value={selectedValue} onChange={handleSelectChange} aria-label="Default select example">
        <option>Select movies by country</option>
        {renderData()}
      </Form.Select>
    </>
  );
};

