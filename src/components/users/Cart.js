import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import env from "../../enviroinment";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TopBar from "./TopBar";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../App";

function Cart() {

  
  let context = useContext(CartContext);
  let img = "https://via.placeholder.com/150";
  let [total, setTotal] = useState(0);
  let [quantity, setQuantity] = useState(1);
  let [deliveryAddress, setDeliveryAddress] = useState("");
  let [contact, setContact] = useState("");
  let userId = sessionStorage.getItem("userId");

  let navigate = useNavigate();

  let removeFromCart = async (i) => {
    let newArray = [...context.cart];
    newArray.splice(i, 1);
    context.setCart(newArray);
  };

  let handleOrder = async () => {
    let token = sessionStorage.getItem("token");
    let res = await axios.post(
      `${env.apiurl}/order`,
      {
        orderItems: context.cart,
        userId,
        deliveryAddress,
        quantity,
        orderAmount: total,
        contact,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.statusCode === 200) {
      context.setCart([]);
      navigate("/Payment");
    }
  };

  useEffect(() => {
    let sum = 0;
    for (var i in context.cart) {
      sum += context.cart[i].price;
    }
    setTotal(sum);
  }, [context.cart]);

  return (
    <>
      <TopBar value={{ cart: context.cart }} />
      <p className="text-center fs-2 fw-bold mt-2">
        Please enter below details to confirm order
      </p>
      <div className="add-food-wrapper col-4 mt-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Delivery Address"
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Contact Number"
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={() => handleOrder()}>
            Submit
          </Button>
        </Form>
      </div>
      <div className="container">
        <p className="text-center fs-2 fw-bold mt-2">
          Total Order Value: &#8377;{total * quantity}
        </p>
        <p className="text-center fs-2 fw-bold mt-2">Items Selected</p>
        <div className="d-flex justify-content-center">
          <div className="row">
            {context.cart.map((e, i) => {
              return (
                <div
                  className="card text-center m-3 shadow p-3 mb-5 bg-body rounded d-flex align-items-stretch"
                  style={{ width: "18rem" }}
                  key={i}
                >
                  <div className="card-img-top img-fluid">
                    <img
                      src={e.imageUrl ? e.imageUrl : img}
                      alt=""
                      width={"150px"}
                      height={"150px"}
                    ></img>
                  </div>
                  <div className="card-body">
                    <p className="fs-3 fw-bold">{e.name}</p>
                    <div className="col">
                      <p>Quantity</p>
                      <select
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      >
                        {[...Array(10).keys()].map((x, i) => {
                          return <option value={i + 1}>{i + 1}</option>;
                        })}
                      </select>
                    </div>
                    <h4>&#8377; {e.price}</h4>
                    <div>{e.description}</div>
                    <div>
                      <Button
                        onClick={() => removeFromCart(i)}
                        variant="primary"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
