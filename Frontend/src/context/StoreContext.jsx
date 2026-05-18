import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url="http://localhost:4000";
    const [cartItems, setCartItems] = useState({});
    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([]);

    const addToCart =async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removeCart =async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
             await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }
    const loadCartData=async (token)=>{
        const response=await axios.post(url+"/api/cart/get","",{headers:{token}})
        setCartItems(response.data.cartData);
        
    }
    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const quantity in cartItems) {            
            if (cartItems[quantity] > 0) {
                let iteminfo = food_list.find((product) => product._id === quantity);
                totalAmount += iteminfo.price * cartItems[quantity];
            }
        }
        return totalAmount;
    }
    const fetchFoodList=async ()=>{
        const response=await axios.get(url+"/api/food/list")
        setFoodList(response.data.data);
        
    }
    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                loadCartData(localStorage.getItem("token"));
            } 
        }
      loadData();
    },[])
    const storeValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeCart,
        getTotalAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={storeValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider