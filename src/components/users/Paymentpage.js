import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import TopBar from "./TopBar";
import { CartContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

function Example() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  let context = useContext(CartContext);
  let navigate = useNavigate();

  let handleSubmit = async ()=>{
    navigate('/order-success')
  }

  return (
    <>
      <TopBar value={{ cart: context.cart }} />
      <h1 className="text-center fw-bold fs-1 mt-3">Payment</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ width: "30rem" }} className="mt-3 p-2">
          <section className="cardsection-1">
            <div
              onClick={() => setOpen1(!open1)}
              aria-controls="section-1"
              aria-expanded={open1}
              className="d-flex justify-content-center btn btn-outline-primary"
            >
              <div className="col d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioNoLabel"
                    id="radioNoLabel1"
                    value="1"
                    aria-label="..."
                  />
                  <div className="ms-5">Debit/Credit Card</div>
                </div>
                <div>
                  <img
                    className="img-fluid"
                    src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                    alt=""
                  />
                  <img
                    className="img-fluid"
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="col d-flex justify-content-center">
                <Collapse in={open1}>
                  <div id="section-1" className="m-2">
                    <form> 
                      <label className="mt-2">
                        <span className="cdnum">
                          Card Number:
                        </span>
                        <input
                          name="cardnumber"
                          type="text"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          className="ms-3"
                        />
                      </label>
                      <div className="d-flex">
                      <label className="exp mt-2">
                        <span className="expdt">Exp.Date:</span>
                        <input
                          name="experationdate"
                          type="text"
                          placeholder="MM/YYYY"
                          style={{"width":"100px"}}
                          className="ms-3"
                        />
                      </label>
                      <label className="cvc mt-2 ms-3">
                        <span className="cvcnum">CVC:</span>
                        <input name="cvcnumber" type="text" placeholder="XXX" style={{"width":"100px"}} className="ms-3"/>
                      </label>
                      </div>
                      <label className="mt-2">
                        <span className="nmoncd">Name on Card:</span>
                        <input
                          name="nameoncard"
                          type="text"
                          placeholder="Name on Card"
                          className="ms-3"
                        />
                      </label>
                    </form>
                  </div>
                </Collapse>
              </div>
            </div>
          </section>
          <section className="cardsection-2 mt-2">
            <div
              onClick={() => setOpen2(!open2)}
              aria-controls="section-2"
              aria-expanded={open2}
              className="d-flex justify-content-center btn btn-outline-primary"
            >
              <div className="col d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioNoLabel"
                    id="radioNoLabel2"
                    value="2"
                    aria-label="..."
                  />
                  <div className="ms-5">UPI</div>
                </div>
                <div>
                  <img
                    className="img-fluid"
                    src="https://img.icons8.com/ios/48/null/bhim-upi.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="col d-flex justify-content-center">
                <Collapse in={open2}>
                  <div className="section-2">
                  <label className="mt-2">
                        <span className="cdnum">
                          Enter UPI address:
                        </span>
                        <input
                          name="UPI"
                          type="text"
                          placeholder="example@upi"
                          className="ms-3"
                        />
                      </label>
                  </div>
                </Collapse>
              </div>
            </div>
          </section>
          <div className="text-center my-3">
            <Button
              className="rounded-pill"
              variant="success"
              style={{ width: "150px" }}
              onClick={()=>handleSubmit()}
            >
              Finish and Pay
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Example;
