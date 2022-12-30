import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

import Pizza from "../../public/img/pizza.png";

import styles from "../../styles/Admin.module.css";

const AdminPage = ({ orders, meals }) => {
  const [mealList, setMealList] = useState(meals);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setMealList(mealList.filter((meal) => meal._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: item.status + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {mealList.map((meal) => (
              <tr className={styles.trTitle} key={meal._id}>
                <td>
                  <Image
                    src={meal.img}
                    width={50}
                    height={50}
                    styles={{ objectFit: "cover" }}
                    alt=""
                  />
                </td>
                <td>{`${meal._id.slice(0, 5)}...`}</td>
                <td>{meal.title}</td>
                <td>${meal.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(meal._id)}
                  >
                    Delete
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {orderList.map((order) => (
              <tr className={styles.trTitle} key={order._id}>
                <td>{`${order._id.slice(0, 5)}...`}</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                {/* 0: , 1: , 2:  */}
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                {/* 0: , 1: , 2:  */}
                <td>{status[order.status]}</td>

                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const mealList = await axios.get("http://localhost:3000/api/products");
  const orderList = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderList.data,
      meals: mealList.data,
    },
  };
};

export default AdminPage;
