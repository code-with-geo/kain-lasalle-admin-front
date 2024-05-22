import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { useOrders } from "../../../context/Orders";

const Container = styled.div`
	margin-top: 20px;
	height: 500px;
`;

const DatePicker = styled.input`
	padding: 10px;
`;

const StatusDropDown = styled.select`
	padding: 11px;
	margin-left: 10px;
`;

const TableColumns = [
	{
		field: "_id",
		headerName: "Order ID",
		flex: 1,
		resizable: false,
		headerClassName: "theme-header",
	},
	{
		field: "orderNumber",
		headerName: "Order Number",
		flex: 1,
		resizable: false,
		headerClassName: "theme-header",
	},
	{
		field: "store",
		headerName: "Store Name",
		flex: 1,
		resizable: false,
		headerClassName: "theme-header",
		renderCell: (params) => params.value[0].name,
	},
	{
		field: "user",
		headerName: "Customer Name",
		flex: 1,
		resizable: false,
		headerClassName: "theme-header",
		renderCell: (params) => params.value[0].name,
	},
	{
		field: "total",
		headerName: "Total",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "paymentType",
		headerName: "Payment Type",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "paymentStatus",
		headerName: "Payment Status",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "orderStatus",
		headerName: "Order Status",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "orderDateTime",
		headerName: "Date",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
];

function Table() {
	const { ordersData } = useOrders();
	const data = ordersData();

	const [selectedDate, setSelectedDate] = useState(null);
	const [formattedDate, setFormattedDate] = useState(null);
	const [filteredRows, setFilteredRows] = useState(data != null && data);

	const handleDateChange = (event) => {
		const date = new Date(event.target.value);
		if (!isNaN(date.getTime())) {
			const day = String(date.getDate()).padStart(2, "0");
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const year = date.getFullYear();
			setFormattedDate(`${month}/${day}/${year}`);
		} else {
			setFormattedDate("");
		}
		setSelectedDate(event.target.value);
	};

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	};

	useEffect(() => {
		if (selectedDate) {
			if (data != null) {
				if (selectedValue === "Complete") {
					setFilteredRows(
						data.filter(
							(data) =>
								data.orderDateTime === formattedDate &&
								data.orderStatus === "Complete"
						)
					);
				} else if (selectedValue === "Pending") {
					setFilteredRows(
						data.filter(
							(data) =>
								data.orderDateTime === formattedDate &&
								data.orderStatus === "Pending"
						)
					);
				} else if (selectedValue === "Cancelled") {
					setFilteredRows(
						data.filter(
							(data) =>
								data.orderDateTime === formattedDate &&
								data.orderStatus === "Cancelled"
						)
					);
				} else {
					setFilteredRows(
						data.filter((data) => data.orderDateTime === formattedDate)
					);
				}
			}
		} else {
			if (data != null) {
				if (selectedValue === "Complete") {
					setFilteredRows(
						data.filter((data) => data.orderStatus === "Complete")
					);
				} else if (selectedValue === "Pending") {
					setFilteredRows(
						data.filter((data) => data.orderStatus === "Pending")
					);
				} else if (selectedValue === "Cancelled") {
					setFilteredRows(
						data.filter((data) => data.orderStatus === "Cancelled")
					);
				} else {
					setFilteredRows(data != null && data);
				}
			}
		}
	}, [selectedDate, data, formattedDate]);

	return (
		<>
			<Container>
				<DatePicker
					type='date'
					value={selectedDate}
					onChange={handleDateChange}
				/>

				<StatusDropDown
					id='dropdown'
					value={selectedValue}
					onChange={handleChange}>
					<option value=''>View All</option>
					<option value='Complete'>Complete</option>
					<option value='Pending'>Pending</option>
					<option value='Cancelled'>Cancelled</option>
				</StatusDropDown>

				<DataGrid
					sx={{
						marginTop: "20px",
						fontSize: "10px",
						overflowX: "auto",
						"& .theme-header": {
							backgroundColor: "#343a40",
							color: "#fff",

							":hover": { color: "#fff" },
						},
						"& .css-ptiqhd-MuiSvgIcon-root": {
							color: "#fff",
						},
					}}
					getRowId={(row) => row._id}
					rows={filteredRows}
					columns={TableColumns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 10 },
						},
					}}
					pageSizeOptions={[5, 10]}
				/>
			</Container>
		</>
	);
}

export default Table;
