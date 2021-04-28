import React, { useState } from 'react';
import SearchResult from './SearchResult';
import { getSearchResult } from '../../store/search';
import { useDispatch, useSelector } from 'react-redux';

const SearchForm = () => {
    const search_icon = <i className="search icon" />
    const dispatch = useDispatch();
    const searchResult = useSelector(state => state.search.search)
    const [search, setSearch] = useState("")

    const onChange = (e) => {
        setSearch(e.target.value)
        e.preventDefault()
        dispatch(getSearchResult());
        // setSearch(searchResult)
    }


    return (
        <div>
            <form onSubmit={
                e => {
                    e.preventDefault();
                }
            }>
                <input type="text"
                    placeholder="Search"
                    value={search}
                    onChange={onChange}
                />
                {console.log(search)}
                {search_icon}
            </form>
            <SearchResult searches={[search]}/>
        </div>

    )
}

export default SearchForm;