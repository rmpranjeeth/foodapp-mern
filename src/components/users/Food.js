import React, { useEffect,useState,useContext } from 'react'
import TopBar from './TopBar'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import env from '../../enviroinment'
import {useNavigate} from 'react-router-dom'
import {CartContext} from '../../App';
import ImageSlider from './ImageSlider';

function Food() {
  
  let navigate = useNavigate()
  let context = useContext(CartContext);
  let [data,setData] = useState([])
  let img = "https://via.placeholder.com/150"
  let loadData = async()=>{
    let token = sessionStorage.getItem('token')
    let res = await axios.get(`${env.apiurl}/all-food`,
    {
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode===200)
    {
      setData(res.data.food)
    }
    else
    {
      navigate('/login')
    }
  }

  let handelAddProduct = async(e)=>{
    let newArray = [...context.cart]
    newArray.push(e)
    context.setCart(newArray)
  }
  useEffect(()=>{
    loadData()
  },[])

  return <>
  <TopBar value={{cart:context.cart}}/>
  <div>
  <div className='container'>
        <div className='mt-2'>
        <ImageSlider/>
        </div>
        <p className='text-center fs-2 fw-bold mt-3'>Food Menu</p>
        <div className='d-flex justify-content-center'>
        <div className='row d-flex justify-content-center flex-wrap'>
        {
          data.map((e,i)=>{
            return <div className='card text-center m-3 shadow p-3 mb-5 bg-body rounded d-flex align-items-stretch' style={{ width: "18rem"}} key={i}>
              <div className='card-img-top img-fluid'>
                <img src={e.imageUrl?e.imageUrl:img} alt="" width={"150px"} height={"150px"}></img>
              </div>
              <div className='card-body'>
                <h3>{e.name}</h3>
                <h4>&#8377; {e.price}</h4>
                <div>{e.description}</div>
                <div className='mt-2'>
                  <Button onClick={()=>handelAddProduct(e)} variant='primary'>Add to Cart</Button>
                </div>
              </div>
            </div>
          })
        }
        </div>
        </div>
    </div>
  </div>
  </>
}

export default Food