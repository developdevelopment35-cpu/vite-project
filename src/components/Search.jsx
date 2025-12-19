import React from 'react'
import './Search.css'

 const Search = ({Searchiteam, setSearchiteam}) => {
  return (
    <div className='search-container'>
        <input type="Search" placeholder='Search Any Movies' value={Searchiteam} onChange={(e) => setSearchiteam(e.target.value)}   />
    </div>
  )
}

export default Search