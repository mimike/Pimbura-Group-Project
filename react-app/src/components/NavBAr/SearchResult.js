import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

const SearchResult = ({ search }) => {
    const searched_users = useSelector(state => state.search.search) || {};
    const searches = searched_users.users || {}
    const [showMenu, setShowMenu] = useState(true);

    let onClick = (e) => {
        console.log('onClick')
        setShowMenu(false);
    }

    useEffect( () => {
        if (search.length){
            setShowMenu(true)
        } else {setShowMenu(false)}

        // console.log('useEffect')

    }, [search])

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
