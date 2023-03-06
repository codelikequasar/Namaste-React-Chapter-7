/**Planning App
 * App Name- Food Mela
 * Header
 *  - Logo
 *  - Nav Items (Menu - Home , About Us, Contact, Cart)
 * Body
 *  - Search Bar
 *  - RestaurantList
 *      - RestaurantCard Component
    *      -- Image
    *      -- Name
    *      -- Rating 
    *      -- cusinies
 * 
 * Footer
 *  - CopyRight
 *  - Links
 * 
 */

import { useState } from "react";
import LogoFood from "../assets/images/logo.jpg";
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/">
            <img src={LogoFood} alt="logo"/>
        </Link>
    )
}

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="header">
            <Logo />
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About Us</Link>
                </li>
                <li>
                    <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                    <Link to="/">Cart</Link>
                </li>
                <li>
                {isLoggedIn ? (
                    <a onClick={()=>{setIsLoggedIn(false)}}>Logout</a>
                    ) :(
                    <a onClick={()=>{setIsLoggedIn(true)}}>Login</a>
                    )                    
                }
                </li>
            </ul>
        </div>
    );
};

export default Header;