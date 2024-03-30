import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render:(text,record)=>{
      return <NavLink to={`/detail/${record.id}`}> {text} </NavLink>
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    // render: (_, record) => (
    //   <div>
    //     <Button onClick={() => handleDecrease(record)}> - </Button>
    //     {record.quantity}
    //     <Button onClick={() => handleIncrease(record)}> + </Button>
    //   </div>
    // ),
    key: 'quantity',
  },
  {
    title: 'Img',
    dataIndex: 'img',
    key: 'image',
    render: image => <img src={image} alt="Product" style={{ width: '50px', height: 'auto' }} />,
  },
  {
    title: 'Total',
    dataIndex: 'total',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    // key: 'action',
    // render: (text, record) => (
    //   <Button onClick={() => handleRemoveFromCart(record.id)}>Remove</Button>
    // ),
  },
];



const Cart = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };
    const cartItems = useSelector(state => state.cart);

    const onSelectChange = (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className='container'>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={cartItems} />
      </div>
    );
}

export default Cart
