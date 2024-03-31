import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {  getApiProductDetailAsync } from "../redux/reducers/productReducer";
import { addToCart } from "../redux/reducers/cartSlice";
import AlertModal from "../Components/AlertModal";

const Detail = () => {
  const params = useParams();

  const { prodDetail } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  

  const getApiProductDetail = async () => {
    const action = getApiProductDetailAsync(params.id);
    dispatch(action);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: prodDetail.id,
        name: prodDetail.name,
        price: prodDetail.price,
        quantity: quantity,
        image: prodDetail.image,
      })
    );
    setShowAlert(true);
    setAlertMessage("Added to cart successfully!");
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage("");
    }, 3000);
  };
  const [quantity, setQuantity] = useState(1); 
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    getApiProductDetail();
    window.scrollTo(0, 0);
  }, [params.id]);

  useEffect(() => {
    if (prodDetail?.size) {
      setSelectedSize(prodDetail.size[0] || "");
      setSizes(prodDetail.size || []);
    }
  }, [prodDetail]);
  useEffect(() => {
    if (!params.id) {
      navigate("/", { state: { fromDetailPage: true } });
      alert("Bạn đã bị chuyển về trang chủ vì không chọn sản phẩm!");
    }
  }, [params.id, navigate]);


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
              <button className="btnChange" onClick={increaseQuantity}>+</button>
              <span className="number">{quantity}</span>
              <button className="btnChange " onClick={decreaseQuantity}>-</button>
              <br />
              <button className="btnAddToCart mt-2" onClick={handleAddToCart}>ADD TO CART</button>
               <AlertModal visible={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />
            </div>
          </div>
        </div>
      </div>
      <br />
      <h1 className="text-center my-4">-Realate Product-</h1>
      <div className="row mt-5">
      {prodDetail.relatedProducts?.map((prod) => { //optional chaining
                    return <div className="col-4" key={prod.id}>
                        <div className="card">
                            <img src={prod.image} alt="..." />
                            <div className="card-body">
                                <h3>{prod.name}</h3>
                                <p>{prod.description}</p>
                                <p>{prod.price} $</p>
                                <NavLink to={`/detail/${prod.id}`} className="btn btn-primary">Detail</NavLink>
                            </div>
                        </div>
                    </div>
                })}
      </div>
    </div>
  );
};

export default Detail;
