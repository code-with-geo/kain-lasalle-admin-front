import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
	Button,
	Label,
	TextBox,
} from "../../components/styles/Components.styled";
import { useForm } from "react-hook-form";
import Axios from "axios";

const Container = styled.div`
	background-color: #f8f9fa;
	flex: 1;
`;

const Wrapper = styled.div`
	max-width: 50%;
	margin: auto;
	padding: 10px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	& h2 {
		margin-left: 10px;
		font-size: 15px;
		font-weight: 400;
	}
`;

const BackArrow = styled(KeyboardBackspace)`
	cursor: pointer;
`;

const Body = styled.div``;

const List = styled.ul`
	display: flex;
	align-items: center;
	flex-direction: column;
	list-style: none;
	gap: 10px;
`;

const ListItem = styled.li`
	display: ${(props) => props.display};
	align-items: ${(props) => props.alignItems};
	flex-direction: ${(props) => props.flexDirection};
`;

const Image = styled.img`
	width: 150px;
	height: 150px;
	margin-bottom: 10px;
`;

const TextArea = styled.textarea`
	resize: none;
	line-height: 28px;
	padding: 0 0.5rem;
	border: 2px solid transparent;
	border-radius: 5px;
	outline: none;
	background-color: #fff;
	color: rgba(0, 0, 0, 0.7);
	transition: 0.3s ease;
	border-color: #e2e8ec;
	width: 515px;
	height: 150px;
	&:focus {
		outline: none;
		border-color: #b0c5a4;
		background-color: #fff;
	}

	&:hover {
		border-color: #b0c5a4;
	}
`;

function AddProducts() {
	const navigate = useNavigate();
	const { storeID } = useParams();
	const { register, handleSubmit } = useForm();
	const [files, setFiles] = useState();
	const [preview, setPreview] = useState();

	useEffect(() => {
		if (!files) return;

		let tmp = [];
		for (let i = 0; i < files.length; i++) {
			tmp.push(URL.createObjectURL(files[i]));
		}

		const objectUrls = tmp;
		setPreview(objectUrls);

		for (let i = 0; i < objectUrls.length; i++) {
			return () => {
				URL.revokeObjectURL(objectUrls[i]);
			};
		}
	}, [files]);

	const _addProduct = (data, event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("storeID", storeID);
		formData.append("sku", data.SKU);
		formData.append("name", data.Name);
		formData.append("description", data.Description);
		formData.append("price", data.Price);
		formData.append("units", data.Units);
		formData.append("file", data.Image[0]);

		try {
			Axios.post(
				`https://kain-lasalle-admin-backend.onrender.com/products/add`,
				formData,
				{
					storeID: storeID,
					sku: data.SKU,
					name: data.Name,
					description: data.Description,
					price: data.Price,
					units: data.Units,
				}
			)
				.then((res) => {
					if (res.data.responsecode === "402") {
						console.log(res.data.message);
					} else if (res.data.responsecode === "200") {
						alert(res.data.message);
						navigate(`/store/products/${storeID}`);
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
				<Wrapper>
					<Header>
						<BackArrow
							fontSize='small'
							onClick={() => navigate(`/store/products/${storeID}`)}
						/>
						<h2>Add Product</h2>
					</Header>
					<Body>
						<form onSubmit={handleSubmit(_addProduct)}>
							<List>
								<ListItem
									display='flex'
									alignItems='center'
									flexDirection='column'>
									<Image src={preview} alt='' />
									<Label
										name='Image'
										marginBottom='10px'
										fontSize='15px'
										fontWeight='400'
										color='#a8a8a9'>
										Product Image
									</Label>
									<TextBox
										type='file'
										height='30px'
										width='515px'
										required
										{...register("Image")}
										onChange={(e) => {
											if (e.target.files && e.target.files.length > 0) {
												setFiles(e.target.files);
											}
										}}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter product SKU'
										required
										{...register("SKU")}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter product name'
										required
										{...register("Name")}
									/>
								</ListItem>
								<ListItem>
									<TextArea
										placeholder='Please enter product description'
										required
										{...register("Description")}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter product price'
										required
										{...register("Price")}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter product units'
										required
										{...register("Units")}
									/>
								</ListItem>
								<ListItem>
									<Button
										width='535px'
										height='40px'
										color='#fff'
										borderRadius='5px'
										bgColor='#343a40'
										type='submit'>
										Save
									</Button>
								</ListItem>
							</List>
						</form>
					</Body>
				</Wrapper>
			</Container>
		</>
	);
}

export default AddProducts;
