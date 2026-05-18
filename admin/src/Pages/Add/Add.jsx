import React, { useEffect, useState } from 'react'
import './Add.css'
import {assets} from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image,setImage]=useState(false);
  const [data,setData]=useState({
    name:"",
    description:" ",
    price:" ",
    category:"Select"
  })
  const onChangehandler=(event)=>{
     const name=event.target.name;
     const value=event.target.value;
     setData((data)=>({...data,[name]:value}));
  }
  const onSubmitChange=async (event)=>{
      event.preventDefault()
      const formData=new FormData();
      formData.append("name",data.name)
      formData.append("description",data.description)
      formData.append("price",data.price)
      formData.append("category",data.category)
      formData.append("image",image)
      const response=await axios.post(`${url}/api/food/add`,formData);
      console.log(response.data)
      if(response.data.name && response.data.price){
        setData({
          name:"",
          description:" ",
          price:" ",
          category:"Select"
        })
        setImage(false);
        toast.success(" Add Ho Gya Bhai Moj Ker")
      }else{
        toast.error(" Are Bhai Nahi Add hua")
      }
}
  
  return (
    <div className='add'>
          <form className="flex-col" onSubmit={onSubmitChange}>
            <div className="add-image-upload flex-col">
              <p>Upload Image</p>
              <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
              </label>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
            </div>
            <div className="add-product-name flex-col">
              <p>Product Name</p>
              <input onChange={onChangehandler} value={data.name} type="text" name='name' placeholder='Type Here' />
            </div>
            <div className="add-product-description flex-col">
              <p>Product description</p>
              <textarea onChange={onChangehandler} value={data.description} name="description" rows='4' placeholder='Write Content here'></textarea>
            </div>
            <div className="add-category-price">
              <div className="add-category flex-col">
                <p>Product Category</p>
                <select onChange={onChangehandler} value={data.category} name="category">
                  <option value='select'>Select Category</option>
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
              <div className="add-price flex-col">
              <p>Product price</p>
              <input onChange={onChangehandler} value={data.price} type="number" name='price' placeholder='$20' />
              </div>
            </div>
               <button type='submit' className='add-btn'>Add</button>

            </form>
    </div>
  )
}

export default Add