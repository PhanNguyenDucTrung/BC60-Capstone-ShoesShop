<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { http } from "../util/config";
import { getApiProductAsync } from '../redux/reducer/productReducer';

const Home = () => {
    const { arrProduct } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();
    console.log(arrProduct);

    const getProductApi = async () => {
        const action = getApiProductAsync;
        dispatch(action);
    };

    useEffect(() => {
        getProductApi();
    }, []);

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-6'>
                    <img src='https://i.pravatar.cc?u' className='w-100 h-60' alt='...' />
                </div>
                <div className='col-6'>
                    <h2 className='h_h2'>Product Name</h2>
                    <p style={{ fontSize: 25 }}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, accusamus!
                    </p>
                    <button className='btn btn-danger'> BUY NOW</button>
                </div>

                <br />
                <div className='container'>
                    <div className='row mt-5'>
                        <h2>Product Feature</h2>
                        {arrProduct.map(prod => {
                            return (
                                <div className='col-3 mt-5' key={prod.id}>
                                    <div className='card'>
                                        <img src={prod.image} alt='' />
                                        <div className='card-body'>
                                            <h3>{prod.name}</h3>
                                            <p>{prod.description}</p>
                                            <p>$500</p>
                                            <button className='btn btn-dark mr-5'>BUY NOW</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

=======
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { http } from "../util/config";
import {getApiProductAsync} from '../redux/reducer/productReducer';



const Home = () => {
const { arrProduct } = useSelector((state) => state.productReducer);
const dispatch = useDispatch();
console.log(arrProduct);

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
        <div className="col-6">
          <img src="https://i.pravatar.cc?u" className="w-100 h-60" alt="..." />
        </div>
        <div className="col-6">
          <h2 className="h_h2">Product Name</h2>
          <p style={{fontSize:25}}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Praesentium, accusamus!
          </p>
          <button className="btn btn-danger"> BUY NOW</button>
        </div>


        <br />
        <div className="container">
          <div className="row mt-5">
            <h2>Product Feature</h2>
            {arrProduct.map((prod)=>{
              return <div className="col-3 mt-5" key={prod.id}>
              <div className="card">
                <img src={prod.image} alt="" />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.description}</p>
                  <p>$500</p>
                  <button className="btn btn-dark mr-5">BUY NOW</button>
                </div>
              </div>
            </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

>>>>>>> refs/remotes/origin/main
export default Home;
