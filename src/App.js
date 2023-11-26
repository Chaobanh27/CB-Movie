import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { MovieContext } from "./components/MyContext";
import { SelectGenre } from "./components/SelectList/SelectGenre";
import { useLocation } from "react-router-dom";
import { SelectCountry } from "./components/SelectList/SelectCountry";

function App(props) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);
  let params = useLocation();

  const getData = (value) => {
    setData(value);
  };
  const getSelected = (value) => {
    console.log(value);
    //setSelected(value)
  };

  const renderSelectMenu = () => {
    if (params["pathname"].includes("detail")) {
      return null;
    } else {
      return (
        <section className="selection mt-4">
          <div style={{padding:"25px"}} className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5 col-md-5 col-sm-5 mb-3">
              <SelectGenre />
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 mb-3">
              <SelectCountry/>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };
  return (
    <div className="App">
      <MovieContext.Provider
        value={{
          data: data,
          getData: getData,
          selected: selected,
          getSelected: getSelected,
        }}
      >
        <Header />
        {renderSelectMenu()}
        {props.children}
      </MovieContext.Provider>
    </div>
  );
}

export default App;
