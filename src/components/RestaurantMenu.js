import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { IMG_CDN_URL } from "../config";
import Shimmer from "./Shimmer";


const RestaurantMenu = ()=>{    
    const { resid } = useParams();

    const [restaurant, setRestaurant] = useState(null);

    useEffect(()=>{
        //API Call
        getRestaurantMenu();
    },[]);


    async function getRestaurantMenu(){
        const data = await fetch("https://www.swiggy.com/dapi/menu/v4/full?lat=12.9351929&lng=77.62448069999999&menuId=" + resid);
        const json = await data.json();
        console.log(json?.data);
        setRestaurant(json?.data);
    }

    return !restaurant ? (<Shimmer />) :(
        <div className="menu">
            <div>
                <h1>Restaurant Menu : {resid}</h1>
                <h2>{restaurant?.name}</h2>
                <img src={IMG_CDN_URL + restaurant?.cloudinaryImageId} />
                <h3>{restaurant?.area}</h3>
                <h3>{restaurant?.city}</h3>
                <h3>{restaurant?.avgRating} stars</h3>
                <h3>{restaurant?.costForTwoMsg}</h3>
            </div>
            <div>
                <h1>Menu</h1>
                <ul>
                  {Object.values(restaurant?.menu?.items).map((item) => (
                    <li key={item.id}>{item.name} and Price: Rs.{item.price}</li>
                  ))}
                </ul>
            </div>
        </div>
    )
}


export default RestaurantMenu;