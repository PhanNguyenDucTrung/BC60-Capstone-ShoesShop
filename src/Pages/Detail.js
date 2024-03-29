import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getApiProductDetailAsync } from "../redux/reducers/productReducer";

const Detail = () => {
  const params = useParams();
  const { prodDetail } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [sizes, setSizes] = useState([]);

  const getApiProductDetail = async () => {
    const action = getApiProductDetailAsync(params.id);
    dispatch(action);
  };

  useEffect(() => {
    getApiProductDetail();
    if (prodDetail?.size) {
      setSelectedSize(prodDetail.size[0] || "");
      setSizes(prodDetail.size || []);
    }
  }, [params.id, prodDetail]);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-center">
            <div className="col-6">
              <img src={prodDetail.image} alt="" className="w-100" />
            </div>
            <div className="col-6 des">
              <h3>{prodDetail.name}</h3>
              <p>{prodDetail.description}</p>
              <h4>Available size</h4>
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`btnSize ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
              <p className="d_price">{prodDetail.price}$</p>
              <button className="btnChange">+</button>
              <span class="number">1</span>
              <button className="btnChange ">-</button>
              <br />
              <button className="btnAddToCart mt-2">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h1 className="text-center my-4">-Realate Product-</h1>
      <div className="row mt-5">
        <div className="col-3 mt-5">
          <div className="card">
            <img src="https://i.pravatar.cc?u" alt="" />

            <div className="card-body">
              <h2>Name product</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam, eligendi.
              </p>
              <p>$98</p>
              <button className="btn btn-dark">BUY NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
