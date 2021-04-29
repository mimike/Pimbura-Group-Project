import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';


function ProfileButton() {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);  // setting the menu showing to false "closed"

    // function to open the menu
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    // close the menu
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
        return (() => document.removeEventListener('click', closeMenu))
    }, [showMenu]);



    return (
        <div>
            <button className="profile-button" onClick={openMenu}>{<i className="image icon" />}</button>
            {showMenu && (

                <div className="profile-menu">
                    <ul className="dropdown-ul">
                        <div className="profile-dropdown">
                            <li className="drop-list">
                                <NavLink to={`/user/${sessionUser.id}`} exact={true}>
                                    <div className="profile-page">
                                        <i className="user circle outline icon" />
                                        <span>Profile</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="drop-list">
                                <NavLink to="/posts" exact={true}>
                                    <div className="add-post">
                                        <i className="upload icon" />
                                        <span>New Post</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="drop-list">
                                <NavLink to='/profile' exact={true}>
                                    <div className="saved-posts">
                                        <i className="bookmark outline icon" />
                                        <span>Saved</span>
                                    </div>
                                </NavLink>
                            </li>
                            <div className="bottom">
                                <li className="logout drop-list">
                                    <LogoutButton className="logout-button" />
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>

            )}
        </div>
    )
}

export default ProfileButton;