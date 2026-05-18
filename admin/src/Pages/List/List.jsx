import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
const List = ({url}) => {
 
  const [list,setList]=useState([])
  const fetchList=async ()=>{
       const response=await axios.get(`${url}/api/food/list`);
       if(response.data.success){
          setList(response.data.data);
       }else{
         toast.error(response.data.error);
         
       }
  }
  const removeFood=async (foodId)=>{
  const response=await axios.post(`${url}/api/food/remove`,{id:foodId});
  if(response.data){
    toast.success("Are Bhai hta kyu diya")
  }else{
         toast.error(response.data.error);
  }
   await fetchList();
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
      <div className='list add flex-col'>
        <h2>Food List</h2>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,idx)=>{
            return(
              <div key={idx} className="list-table-format">
                   <img src={`${url}/images/`+item.image} alt="" />
                   <p>{item.name}</p>
                   <p>{item.category}</p>
                   <p>{item.price}</p>
                   <p onClick={()=>{removeFood(item._id)}} id='remove'><b>X</b></p>
              </div>
            )
          })}
        </div>
      </div>
  )
}

export default List