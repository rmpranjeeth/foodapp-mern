import React,{useEffect, useState,useContext} from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import env from '../../enviroinment'
import axios from 'axios'
import TopBar from './TopBar'
import { CartContext } from "../../App";
import Table from 'react-bootstrap/Table';
import HighlightAltOutlinedIcon from '@mui/icons-material/HighlightAltOutlined';


function Dashboard() {

  let context = useContext(CartContext);
  let [data,setData] = useState([])
  let navigate = useNavigate()

  let loadData = async()=>{
    let token = sessionStorage.getItem('token')
    let res = await axios.get(`${env.apiurl}/orders`,
    {
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode===200)
    {
      setData(res.data.orders)
    }
    else{
      navigate('/payment')
    }
  }

  useEffect(()=>{
    loadData()
  },[])
  
  return  <>
  <TopBar value={{cart:context.cart}}/>
  <div>
  <p className='text-center fs-2 fw-bold mt-3'>Order List</p>
  <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Order Amount</th>
          <th>Contact</th>
          <th>Delivery Address</th>
          <th>Status</th>
          <th>Ordered At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e,i)=>{
            return <tr key={i} onClick={()=>navigate(`/order-success/${e._id}`)}>
                <td>{i+1}</td>
                <td>&#8377; {(e.orderAmount) * (e.quantity)}</td>
                <td>{e.contact}</td>
                <td>{e.deliveryAddress}</td>
                <td>{e.status}</td>
                <td>{e.orderedAt}</td>
                <td><HighlightAltOutlinedIcon/></td>
            </tr>
          })
        }
      </tbody>
    </Table>
  </div>
  </>
}

export default Dashboard




