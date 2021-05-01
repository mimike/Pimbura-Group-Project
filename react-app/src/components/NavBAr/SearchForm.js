import React, { useState } from 'react';
import SearchResult from './SearchResult';
import { getSearchResult } from '../../store/search';
import { useDispatch, useSelector } from 'react-redux';

const SearchForm = () => {
    const search_icon = <i class="fas fa-search"></i>
    const dispatch = useDispatch();
    const searchResult = useSelector(state => state.search.search)
    const [search, setSearch] = useState("")
    // const [isSearch, setIsSearch] = useState(false)

    const onChange = (e) => {
        setSearch(e.target.value)
        e.preventDefault()
        dispatch(getSearchResult(e.target.value));
        // console.log(search)
        // setSearch(searchResult)
        // setIsSearch(true)
    }


    return (
        <div>
            <form onSubmit={
                e => {
                    e.preventDefault();
                }
            }>
                <div className="search-bar">
                    {search_icon}
                    <input style={{outline:"none"}} type="text"
                        placeholder="Search"
                        value={search}
                        onChange={onChange}
                    />
                    {console.log(search)}

                </div>
            </form>
            <SearchResult search={search}/>
            {/* { isSearch ? <SearchResult/> : null } */}
        </div>

    )
}

export default SearchForm;
