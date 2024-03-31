import React, { useEffect, useMemo, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/reducers/cartSlice";

const Cart = () => {
  const columns = [
    {
      title: "id",
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
      title: "Img",
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
  const [quantity, setQuantity] = useState(1);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const cartItems = useSelector((state) => {
    const uniqueItems = {};
    state.cart.forEach((item) => {
      if (uniqueItems[item.id]) {
        uniqueItems[item.id].quantity += item.quantity;
      } else {
        uniqueItems[item.id] = { ...item };
      }
    });
    return Object.values(uniqueItems);
  });

  const memoizedCartItems = useMemo(() => cartItems, [cartItems]);

  const handleDecrease = (record) => {
    if (record.quantity > 1) {
      dispatch(decreaseQuantity(record.id));
      setQuantity((prevQuantity) => prevQuantity - 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - record.price);
    }
  };

  const handleIncrease = (record) => {
    dispatch(increaseQuantity(record.id));
    setQuantity((prevQuantity) => prevQuantity + 1);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + record.price);
  };
 // Lấy danh sách sản phẩm từ local storage
 const cartItem = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );
    setTotalPrice(totalPrice);
  }, [cartItems.length]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    console.log("cart",cartItems)

    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    const newTotalPrice = updatedCartItems.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );
    setTotalPrice(newTotalPrice);
  };

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
