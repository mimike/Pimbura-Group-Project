import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

const SearchResult = ({ search, setSearch }) => {
    const searched_users = useSelector(state => state.search.search) || {};
    const searches = searched_users.users || {}
    // To show the search reasult in drop-down menu, first set the drop-dwon to be opened 
    const [showMenu, setShowMenu] = useState(true);

    // Then check if there is any characters in the search bar the the menu will be opened,
    // otherwise it will not be shown
    useEffect( () => {
        if (search.length){
            setShowMenu(true)
        } else {setShowMenu(false)}
    }, [search])
    
    // After that when the user selects from the result dropdown,
    // the menu will be closed and the search bar will be empty
    let onClick = (e) => {
        setShowMenu(false);
        setSearch("")
    }

    let searchResult = null;
    if (showMenu && Object.values(searches).length) {
        searchResult =
        <div onClick={onClick} className="parent-list">
            <ul className="search-result">
                {Object.values(searches).map(search => (
                    <li key={search.id} className="one-list">
                        <NavLink to={`/user/${search.id}`} exact={true}>
                            <div className="one-user">
                                <img className="avatar" src={search.avatar_url} />
                                <div className="username">
                                    <div className="username1">{search.username}</div>
                                    <div className="username2">{search.username}</div>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    }
    return (
        <div>
            {searchResult}
        </div>
    )
}

export default SearchResult;













// const [searchLength, setSearchLength] = useState(0)

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



        // } if (!showMenu && Object.values(searches).length) {
    //     setShowMenu(true)
    //     // return
    // }
    // } else if (search  && !showMenu) setShowMenu(true)

    // if (search  && !showMenu) {
    //     setShowMenu(true)
    // } else {}

