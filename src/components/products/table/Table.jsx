import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import ActionButton from "./ActionButton";
import { useProduct } from "../../../context/Product";
import { useParams } from "react-router-dom";

const Container = styled.div`
	margin-top: 20px;
	height: 550px;
`;

const Image = styled.img`
	width: 50px;
	height: 50px;
`;
const TableColumns = [
	{
		field: "_id",
		headerName: "Product ID",
		flex: 1,
		resizable: false,
		headerClassName: "theme-header",
	},
	{
		field: "image",
		headerName: "Image",
		flex: 1,
		headerClassName: "theme-header",
		renderCell: (params) => <Image src={params.row.image} alt='' />,
	},
	{
		field: "sku",
		headerName: "SKU",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "name",
		headerName: "Name",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "description",
		headerName: "Description",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "price",
		headerName: "Price",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "units",
		headerName: "Units",
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
	const { productData } = useProduct();
	const data = productData(storeID);
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
