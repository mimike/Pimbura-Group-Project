import React from 'react';
import { NavLink } from 'react-router-dom';

const SearchResult = ({ searches }) => {
    return (
        <div>
            <ul className="search-result">
                {searches.map((search) => (
                    <NavLink to="/">
                        <li key={search}>{search}</li>
                    </NavLink>
                ))}
            </ul>
        </div>
    )
}

export default SearchResult;