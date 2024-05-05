import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import ActionButton from "./ActionButton";
import { useStore } from "../../../context/Store";

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
		headerName: "ID",
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
	const { storeData } = useStore();
	const data = storeData();
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
					columns={TableColumns}
					rows={data != null && data}
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
