import React from "react";
import styled from "styled-components";
import {
	Delete,
	Edit,
	Fastfood,
	PersonAddAlt,
	Visibility,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Container = styled.div``;

const DeleteButton = styled(Delete)`
	cursor: pointer;
	margin-left: 10px;
	color: #d44a4a;
`;

const EditButton = styled(Edit)`
	cursor: pointer;
	color: #868e96;
	margin-left: 10px;
`;

const ViewButton = styled(Visibility)`
	cursor: pointer;
	color: #868e96;
	margin-left: 10px;
`;

const ProductButton = styled(Fastfood)`
	cursor: pointer;
	color: #868e96;
	margin-left: 10px;
`;

const VendorButton = styled(PersonAddAlt)`
	cursor: pointer;
	color: #868e96;
	margin-left: 10px;
`;

function ActionButton({ params }) {
	const navigate = useNavigate();

	const _delete = (id) => {
		try {
			Axios.post(`http://localhost:3001/stores/delete`, {
				storeID: id,
			})
				.then((res) => {
					if (res.data.responsecode === "402") {
						console.log(res.data.message);
					} else if (res.data.responsecode === "200") {
						alert(res.data.message);
					}
				})
				.catch((err) => {
					if (err.response) Error();
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Container>
				<Tooltip title='Products'>
					<ProductButton
						onClick={() => navigate(`/store/products/${params.row._id}`)}
					/>
				</Tooltip>
				<Tooltip title='Vendors'>
					<VendorButton
						onClick={() => navigate(`/store/vendor/${params.row._id}`)}
					/>
				</Tooltip>
				<Tooltip title='Edit'>
					<EditButton
						onClick={() => navigate(`/store/edit/${params.row._id}`)}
					/>
				</Tooltip>
				<Tooltip title='Delete'>
					<DeleteButton onClick={() => _delete(params.row._id)} />
				</Tooltip>
			</Container>
		</>
	);
}

export default ActionButton;
