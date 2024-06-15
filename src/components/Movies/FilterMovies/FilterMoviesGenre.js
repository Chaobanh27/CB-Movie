import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./css/FilterMovie.css";

export const FilterMoviesGenre = (props) => {
  const [data, setData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = props.itemsPerPage;
  const { genreId } = useParams();
  const api_key = "";

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: api_key,
          with_genres: genreId,
        },
      })
      .then((res) => {
        //console.log(res.data.results)
        setData(res.data.results);
      })
      .catch((error) => console.log(error));
  }, [genreId]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);
 //console.log(pageCount)

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    //console.log(newOffset)
    //console.log(`User requested page number ${e.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const renderData = () => {
    if (currentItems.length > 0) {
      return currentItems.map((value, key) => {
        //console.log(value)
        if (value.poster_path !== null) {
          return (
            <div key={value.id} className="col-lg-3 col-sm-4 mt-3">
              <Link to={"/movie/detail/" + value.id} class="card  border-0 ">
                <img
                  src={
                    "https://image.tmdb.org/t/p/original" + value.poster_path
                  }
                  class="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <div className="card-title">{value.title}</div>
                </div>
              </Link>
            </div>
          );
        }
      });
    }
  };

  return (
    <>
      <section className="filter-movies">
        <div style={{padding:"25px"}} className="container">
          <div className="row">{renderData()}</div>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </section>
    </>
  );
};
