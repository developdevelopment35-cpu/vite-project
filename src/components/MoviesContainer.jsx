import React from 'react'

import './moviecontainer.css'
 const MoviesContainer = ({poster , title, rate}) => {
  return (
    <div className='movies-container'>
       <div className="movies-content">
        <div className='movies-poster'>
            <img src={poster} alt="movie-poster"  onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = "https://placehold.co/600x400/png?text=Image+Not+Found";
            }} />
        </div>
       <div className='movies-info'>
        <h2>{title}</h2>
        <p>
          {rate}⭐
        </p>
       </div>
       </div>
    </div>
  )
}

export default MoviesContainer
