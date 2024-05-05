import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import ActionButton from "./ActionButton";
import { useParams } from "react-router-dom";
import { useVendor } from "../../../context/Vendor";

const Container = styled.div`
	margin-top: 20px;
	height: 550px;
`;

const TableColumns = [
	{
		field: "_id",
		headerName: "Vendor ID",
		flex: 1,
		resizable: false,
		headerClassName: "theme-header",
	},
	{
		field: "name",
		headerName: "Name",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "email",
		headerName: "Email",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "password",
		headerName: "Password",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "phonenumber",
		headerName: "Phone Number",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "actions",
		headerName: "Actions",
		type: "actions",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
		renderCell: (params) => <ActionButton {...{ params }} />,
	},
];
function Table() {
	const { storeID } = useParams();
	const { vendorData } = useVendor();
	const data = vendorData(storeID);
	return (
		<>
			<Container>
				<DataGrid
					sx={{
						fontSize: "12px",
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
					rows={data != null && data}
					columns={TableColumns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
				/>
			</Container>
		</>
	);
}

export default Table;
