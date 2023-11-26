import React from 'react'
import PopularMovies from "./Movies/PopularMovies/PopularMovies";
import  PopularTVSeries  from "./Movies/PopularTVSeries/PopularTVSeries";
import UpcomingMovies from "./Movies/UpcomingMovies/UpcomingMovies";
import { NowPlaying } from './Movies/NowPlaying/NowPlaying';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function HomeIndex() {
  const [visible, setVisible] = useState(8);

  const handleLoadMore = () => {
    setVisible(state => state + 4)
  }
    return (
        <>
          <section id="content" class="content">
            <div class="container">
              <div className='now-playing-movies'>
                <div className='now-playing-title'>
                  <h3>Now Playing</h3>
                </div>
                <div className='row'>
                <NowPlaying setLoadMore={visible}/>
                </div>
                <div className='d-flex justify-content-center mt-2'>
                  <Button onClick={handleLoadMore}>Load More</Button>
                </div>
              </div>
              <div className="posters mt-5">
                <h3>Popular Movies</h3>
                <div className="popular-movies mb-2 ">
                  <PopularMovies/>
                </div>
                <h3>Top Rated TV series</h3>
                <div className="popular-tv-series mb-2 ">
                  <PopularTVSeries/>
                </div>
                <h3>Upcoming Movies</h3>
                <div className="upcoming-movies  ">
                  <UpcomingMovies/>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }

export default HomeIndex