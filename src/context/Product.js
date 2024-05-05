import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const ProductContext = createContext();

const GetAllProduct = (storeID) => {
	const [product, setProduct] = useState(null);
	useEffect(() => {
		const getAllProducts = () => {
			try {
				Axios.get(`http://localhost:3001/products/${storeID}`)
					.then((res) => {
						setProduct(res.data.products);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getAllProducts, 1000);
		return () => clearInterval(interval);
	}, [storeID]);
	return product;
};

const GetProductByID = (productID) => {
	const [product, setProduct] = useState(null);
	useEffect(() => {
		const getProductByID = () => {
			try {
				Axios.post(`http://localhost:3001/products/get-by-id`, {
					productID: productID,
				})
					.then((res) => {
						setProduct(res.data.products);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		getProductByID();
	}, [productID]);
	return product;
};

export const ProductProvider = (props) => {
	const productData = (storeID) => GetAllProduct(storeID);
	const productDataByID = (productID) => GetProductByID(productID);

	const productMethod = {
		productData,
		productDataByID,
	};
	return (
		<ProductContext.Provider value={productMethod}>
			{props.children}
		</ProductContext.Provider>
	);
};

export const useProduct = () => {
	return useContext(ProductContext);
};
