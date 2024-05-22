import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const OrdersContext = createContext();

const GetAllOrders = () => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		const getAllOrders = () => {
			try {
				Axios.get(`https://kain-lasalle-admin-backend.onrender.com/orders/`)
					.then((res) => {
						setOrders(res.data.orders);
						console.log(res.data.orders);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getAllOrders, 1000);
		return () => clearInterval(interval);
	}, []);
	return orders;
};

export const OrdersProvider = (props) => {
	const ordersData = () => GetAllOrders();

	const ordersMethod = {
		ordersData,
	};
	return (
		<OrdersContext.Provider value={ordersMethod}>
			{props.children}
		</OrdersContext.Provider>
	);
};

export const useOrders = () => {
	return useContext(OrdersContext);
};
