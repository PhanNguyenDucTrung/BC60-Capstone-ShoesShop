import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiProductAsync } from "../redux/reducers/productReducer";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { arrProduct } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  // console.log(arrProduct);

  const getProductApi = async () => {
    const action = getApiProductAsync;
    dispatch(action);
  };

  useEffect(() => {
    getProductApi();
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        {arrProduct.length > 0 && (
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-center">
              <div className="col-6">
                <img
                  src={arrProduct[1].image}
                  className="w-100"
                  alt="Product"
                />
              </div>
              <div className="col-6 des">
                <h2 className="h_h2 ">{arrProduct[1].name}</h2>
                <p>{arrProduct[1].description}</p>
                <div className="">
                  <NavLink
                    to={`/detail/${arrProduct[1].id}`}
                    className="btn btn-dark mr-5"
                  >
                    BUY NOW
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />

      <div className="row mt-5">
        <h2>Product Feature</h2>
        {arrProduct.map((prod) => {
          return (
            <div className="col-3 mt-5" key={prod.id}>
              <div className="card">
                <img src={prod.image} alt="" />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.description}</p>
                  <p>${prod.price}</p>
                  <NavLink
                    to={`/detail/${prod.id}`}
                    className="btn btn-dark mr-5"
                  >
                    BUY NOW
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
