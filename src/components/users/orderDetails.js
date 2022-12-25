import React,{useEffect, useState,useContext} from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import env from '../../enviroinment'
import axios from 'axios'
import TopBar from './TopBar'
import { CartContext } from "../../App";



function OrderDetails() {

  let context = useContext(CartContext);
  let [data,setData] = useState([])
  let [orderAmount,setOrderAmount] = useState(0)
  let [contact,setContact] = useState("")
  let [deliveryAddress,setDeliveryAddress] = useState("")
  let [quantity, setQuantity] = useState("");
  let [status,setStatus]=useState("")
  let navigate = useNavigate()
  let params = useParams()
  let img = "https://via.placeholder.com/150"

  let loadData = async()=>{
    let token = sessionStorage.getItem('token')
    let res = await axios.get(`${env.apiurl}/orders/${params.id}`,
    {
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode===200)
    {
      setData(res.data.order.orderItems)
      setOrderAmount(res.data.order.orderAmount)
      setContact(res.data.order.contact)
      setDeliveryAddress(res.data.order.deliveryAddress)
      setStatus(res.data.order.status)
      setQuantity(res.data.order.quantity)
    }
  }

  useEffect(()=>{
    if(params.id)
    {
      loadData()
    }
    else
    {
      navigate('/order-success')
    }
  },[])

  return <>
  <TopBar value={{cart:context.cart}}/>
  <div className='my-3'> 
    <div className='container'>
        <p className='text-center fs-2 fw-bold mt-2'>Status of Order</p>
        <h3><span className='fw-bold'>Order Amount Total: </span>&#8377; {orderAmount * quantity}</h3>
        <h4><span className='fw-bold'>Delivered Address: </span> {deliveryAddress}</h4>
        <h4><span className='fw-bold'>Contact No: </span> {contact}</h4>
        <h4><span className='fw-bold'>Status: </span> {status}</h4>
        <p className='text-center fs-2 fw-bold mt-2'>Items Ordered</p>
        <div className='d-flex justify-content-center'> 
        <div className='row'>
        {
          data.map((e,i)=>{
            return <div className='card text-center m-3 shadow p-3 mb-5 bg-body rounded d-flex align-items-stretch' style={{ width: "18rem"}} key={i}>
              <div className='card-img-top img-fluid'>
                <img src={e.imageUrl?e.imageUrl:img} alt="" width={"150px"} height={"150px"}></img>
              </div>
              <div className='card-body'>
                <p className='fs-3 fw-bold'>{e.name}</p>
                <h4>Qty : {quantity}</h4>
                <h4>&#8377; {e.price}</h4>
                <div>{e.description}</div>
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

export default OrderDetails