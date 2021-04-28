import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';


function ProfileButton() {

    const [showMenu, setShowMenu] = useState(false);  // setting the menu showing to false "closed"

    // function to open the menu
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    // close the menu
    useEffect( () => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        
        document.addEventListener('click', closeMenu);
        return (() => document.removeEventListener('click', closeMenu))
    }, [showMenu]);


    return (
        <div>
            <button className="profile-button" onClick={openMenu}>{<i className="image icon"/>}</button>
            {showMenu && (
                <div className="profile-menu">
                    <ul>
                        <div className="profile-dropdown">
                            <li>
                                <h3>My Profile Page</h3>
                            </li>
                            <li className="logout">
                                <LogoutButton />
                            </li>
                        </div>
                    </ul>
                </div>
                
                )}
        </div>
    )
}

export default ProfileButton;