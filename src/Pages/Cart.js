import React, { useEffect, useMemo, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeFromCart } from "../redux/reducers/cartSlice";


const Cart = () => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return <NavLink to={`/detail/${record.id}`}> {text} </NavLink>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div>
          <Button onClick={() => handleIncrease(record.id)}>+</Button>
          <span style={{ margin: "0 10px" }}>{text}</span>
          <Button onClick={() => handleDecrease(record.id)}>-</Button>
        </div>
      ),
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "image",
      render: (text, record) => {
        return <img src={record.image} alt={record.alias} width={100} />;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      // key:'total',
      render: (_, record) => record.quantity * record.price,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (
        _,
        record // Render nút Xóa
      ) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleRemoveFromCart(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button className="btnDlt">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItemsFromRedux = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cartItemsFromRedux);

 
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItemsFromLocalStorage.length > 0) {
      const updatedCartItems = cartItemsFromLocalStorage.map((itemFromLocalStorage) => {
        const existingItem = cartItemsFromRedux.find((item) => item.id === itemFromLocalStorage.id);
        if (existingItem) {
          return {
            ...existingItem,
            quantity: itemFromLocalStorage.quantity  // Sử dụng quantity từ localStorage
          };
        } else {
          return itemFromLocalStorage;
        }
      });
      setCartItems(updatedCartItems);
    }
  }, [cartItemsFromRedux]);

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );
    setTotalPrice(totalPrice);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartItemsFromLocalStorage);

  }, [cartItemsFromRedux]);
  useEffect(() => {
    setCartItems(cartItemsFromRedux);
}, [cartItemsFromRedux]);
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);
  const mergeCartItems = (reduxItems, localStorageItems) => {
    const mergedItems = {};
    [...reduxItems, ...localStorageItems].forEach((item) => {
      if (mergedItems[item.id]) {
        mergedItems[item.id].quantity += item.quantity;
      } else {
        mergedItems[item.id] = { ...item };
      }
    });
    return Object.values(mergedItems);
  };

  const handleDecrease = (recordId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === recordId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
};

const handleIncrease = (recordId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === recordId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
};

  const handleRemoveFromCart = (recordId) => {
    // const updatedCartItems = cartItems.filter((item) => item.id !== recordId);
    // setCartItems(updatedCartItems);
    // localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    dispatch(removeFromCart(recordId));
  };
  
 
  const memoizedCartItems = useMemo(() => cartItems, [cartItems]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="container">
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Button className="btnSubmit">SUBMIT ORDER</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={memoizedCartItems.map((item) => ({
          ...item,
          key: item.id,
        }))}
      />

      <span style={{ marginRight: 10 }}>Total Price: ${totalPrice}</span>
    </div>
  );
};

export default Cart;
