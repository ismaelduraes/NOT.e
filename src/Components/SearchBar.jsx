import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'


function SearchBar(props){
    return (
        <div className="searchbar_container">
            <div className="searchbar">
                <SearchRoundedIcon/>
                <input placeholder="Pesquisar" className="search_input"
                onChange={(e) => {props.setSearchFilter(e.target.value)}}
                />
            </div>
        </div>
    )
}

export default SearchBar
