import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
// import { DELETE_SEARCH } from '../../store/search'

const SearchResult = ({ search }) => {
    const dispatch = useDispatch()
    const searched_users = useSelector(state => state.search.search) || {};
    const searches = searched_users.users || {}
    // const [isSearch, setIsSearch] = useState(true)
    const [showMenu, setShowMenu] = useState(true);

    // const [showMenu, setShowMenu] = useState(true);  // setting the menu showing to false "closed"


    // function to open the menu
    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // }

    // // close the menu
    // // const closeMenu

    // useEffect( () => {
    //     if (!showMenu) return;
    //         const closeMenu = () => {
    //         setShowMenu(false);
    //     };

    //     document.addEventListener('click', closeMenu);
    //     return (() => document.removeEventListener('click', closeMenu))
    // }, [showMenu]);

    let onClick = (e) => {
        if (showMenu) setShowMenu(false);
        else if (showMenu) setShowMenu(true)
        // dispatch(DELETE_SEARCH)
        // searches = {}
    }

    useEffect( () => {
        if (!showMenu && Object.values(searches).length) { 
            setShowMenu(true)
            // return
        } else if (showMenu && Object.values(searches).length) setShowMenu(false);
          
    }, [searches])


    let searchResult = null;
    if (showMenu && Object.values(searches).length) {
        searchResult = <ul className="search-result">
            {Object.values(searches).map(search => (
                <li key={search.id} className="one-list">
                    <NavLink to={`/user/${search.id}`} exact={true} onClick={onClick}>
                        <div className="one-user">
                            <img className="avatar" src={search.avatar_url} />
                            <div className="username">{search.username}</div>
                        </div>
                    </NavLink>
                </li>
            ))}
        </ul>
    }
    // } if (!showMenu && Object.values(searches).length) { 
    //     setShowMenu(true)
    //     // return
    // }
    // } else if (search  && !showMenu) setShowMenu(true)

    // if (search  && !showMenu) {
    //     setShowMenu(true)
    // } else {}



    return (
        <div>
            {searchResult}
        </div>
    )
}

export default SearchResult;