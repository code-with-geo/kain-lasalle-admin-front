import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const VendorContext = createContext();

const GetAllVendor = (storeID) => {
	const [vendor, setVendor] = useState(null);
	useEffect(() => {
		const getAllVendor = () => {
			try {
				Axios.get(
					`https://kain-lasalle-admin-backend.onrender.com/vendors/${storeID}`
				)
					.then((res) => {
						setVendor(res.data.vendors);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getAllVendor, 1000);
		return () => clearInterval(interval);
	}, [storeID]);
	return vendor;
};

const GetVendorByID = (vendorID) => {
	const [vendor, setVendor] = useState(null);
	useEffect(() => {
		const getVendorByID = () => {
			try {
				Axios.get(
					`https://kain-lasalle-admin-backend.onrender.com/vendors/get-by-id/${vendorID}`
				)
					.then((res) => {
						setVendor(res.data.vendor);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		getVendorByID();
	}, [vendorID]);
	return vendor;
};

export const VendorProvider = (props) => {
	const vendorData = (storeID) => GetAllVendor(storeID);
	const vendorByIDData = (vendorID) => GetVendorByID(vendorID);
	const vendorMethod = {
		vendorData,
		vendorByIDData,
	};
	return (
		<VendorContext.Provider value={vendorMethod}>
			{props.children}
		</VendorContext.Provider>
	);
};

export const useVendor = () => {
	return useContext(VendorContext);
};
