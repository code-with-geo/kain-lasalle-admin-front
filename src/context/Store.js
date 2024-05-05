import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const StoreContext = createContext();

const GetStoreData = () => {
	const [store, setStore] = useState(null);
	useEffect(() => {
		const getAllStore = () => {
			try {
				Axios.get(`http://localhost:3001/stores/`)
					.then((res) => {
						setStore(res.data.store);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getAllStore, 1000);
		return () => clearInterval(interval);
	}, []);
	return store;
};

const GetStoreByID = (storeID) => {
	const [store, setStore] = useState(null);
	useEffect(() => {
		const getStoreByID = () => {
			try {
				Axios.post(`http://localhost:3001/stores/`, {
					storeID,
				})
					.then((res) => {
						setStore(res.data.store);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		getStoreByID();
	}, [storeID]);
	return store;
};

export const StoreProvider = (props) => {
	const storeData = () => GetStoreData();
	const storeDataByID = (storeID) => GetStoreByID(storeID);

	const storeMethod = {
		storeData,
		storeDataByID,
	};
	return (
		<StoreContext.Provider value={storeMethod}>
			{props.children}
		</StoreContext.Provider>
	);
};

export const useStore = () => {
	return useContext(StoreContext);
};
