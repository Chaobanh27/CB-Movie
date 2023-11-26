import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import HomeIndex from './components/HomeIndex';
import SearchResults from './components/SearchResults/SearchResults';
import { MovieDetails } from './components/Movies/MovieDetails/MovieDetails';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CastDetail } from './components/Cast/CastDetail';
import { FilterMoviesGenre } from './components/Movies/FilterMovies/FilterMoviesGenre';
import { FilterMoviesCountry } from './components/Movies/FilterMovies/FilterMoviesCountry';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<HomeIndex/>}  />
          <Route index path='/search-results' element = {<SearchResults/>}  />
          <Route index path='/movie/detail/:id' element = {<MovieDetails/>}  />
          <Route index path='/cast/detail/:id' element = {<CastDetail/>}  />
          <Route index path='/movie/filter/Genre/:genreId' element = {<FilterMoviesGenre itemsPerPage={8}/>}  />
          <Route index path='/movie/filter/Country/:countryId' element = {<FilterMoviesCountry itemsPerPage={8}/>}  />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
