import {restaurantList} from "../config";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Shimmer from "./Shimmer";


function filterData(searchInput, restaurants){

    const filterData =  restaurants.filter((restaurant)=>
        restaurant.data.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    return filterData;
}

// Part 5 using Map
const Body = () => {
    const [allrestaurants, setAllRestaurants] = useState([]);

    const [filteredrestaurants, setFilteredRestaurants] = useState([]);
    
    //searchInput is a local state variables (setSearchInput is a function)
    const [searchInput, setSearchInput] = useState(""); // To create state variable

    console.log("render");

    useEffect(() =>{
        // API Calls
        getRestaurants();
        console.log("useEffect");
    }, []);

    async function getRestaurants(){
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.1810161&lng=75.9143867&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json);

        setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
        setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    }

    if(!allrestaurants) return null;

    return allrestaurants.length === 0 ? <Shimmer/> : (
        <>
            <div className="search-input">
                <input type="type" 
                value={searchInput} 
                onChange={(e)=>{
                    // e.target.value => whatever you write in input
                    setSearchInput(e.target.value);
                }}
                placeholder="Search Here.." />

                <button type="button" 
                className="search-btn" 
                onClick= {()=> {
                    const data = filterData(searchInput, allrestaurants);
                    setFilteredRestaurants(data);
                }}
                >Search</button>
                
            </div>
            <div className="cardBlock">
                {                     
                    filteredrestaurants.map((restaurant)=> {
                        return (
                            <Link to={"/restaurant/" + restaurant.data.id} key={restaurant.data.id}>
                                <RestaurantCard {...restaurant.data} />
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
};

export default Body;