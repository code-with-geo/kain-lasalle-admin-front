import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Label } from "../../components/styles/Components.styled";
const Container = styled.div`
	background-color: #f8f9fa;
	flex: 1;
`;

const Wrapper = styled.div`
	max-width: 50%;
	margin: auto;
	padding: 10px;
	@media (max-width: 800px) {
		max-width: 100%;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	& h2 {
		margin-left: 10px;
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
	padding: 0 1rem;
	border: 2px solid transparent;
	border-radius: 5px;
	outline: none;
	background-color: #fff;
	color: rgba(0, 0, 0, 0.7);
	transition: 0.3s ease;
	border-color: #e2e8ec;
	width: 500px;
	height: 150px;
	&:focus {
		outline: none;
		border-color: #b0c5a4;
		background-color: #fff;
	}

	&:hover {
		border-color: #b0c5a4;
	}

	@media (max-width: 600px) {
		width: 385px;
	}
	@media (max-width: 450px) {
		width: 285px;
	}
	@media (max-width: 400px) {
		width: 235px;
	}
`;

const TextBox = styled.input`
	width: 515px;
	height: 30px;
	line-height: 2;
	padding: 0 0.5rem;
	border: 2px solid transparent;
	border-radius: 5px;
	outline: none;
	background-color: #fff;
	color: rgba(0, 0, 0, 0.7);
	transition: 0.3s ease;
	border-color: #e2e8ec;
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};

	font-size: ${(props) => props.fontSize};
	&::placeholder {
		color: #9e9ea7;
	}

	&:focus {
		outline: none;
		border-color: #b0c5a4;
		background-color: #fff;
	}

	&:hover {
		border-color: #b0c5a4;
	}

	@media (max-width: 600px) {
		width: 400px;
	}
	@media (max-width: 450px) {
		width: 300px;
	}
	@media (max-width: 400px) {
		width: 250px;
	}
`;

const Button = styled.button`
	width: 535px;
	height: 40px;
	font-weight: ${(props) => props.fontWeight};
	font-size: ${(props) => props.fontSize};
	color: ${(props) => props.color};
	background-color: ${(props) => props.bgColor};
	text-align: ${(props) => props.textAlign};
	padding: ${(props) => props.padding};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	display: ${(props) => props.display};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignItems};
	border-radius: ${(props) => props.borderRadius};
	line-height: ${(props) => props.lineHeight};
	text-decoration: none;
	border: none;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.hoverbgColor};
		color: ${(props) => props.hoverColor};

		transition: 0.3s ease;
	}

	@media (max-width: 600px) {
		width: 420px;
	}
	@media (max-width: 450px) {
		width: 320px;
	}
	@media (max-width: 400px) {
		width: 270px;
	}
`;

function AddStore() {
	const navigate = useNavigate();
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

	const _addStore = (data, event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("name", data.Name);
		formData.append("address", data.Address);
		formData.append("description", data.Description);
		formData.append("contactperson", data.ContactPerson);
		formData.append("contactno", data.ContactNo);
		formData.append("storehour", data.StoreHour);
		formData.append("file", data.Image[0]);

		try {
			Axios.post(
				`https://kain-lasalle-admin-backend.onrender.com/stores/add`,
				formData,
				{
					name: data.Name,
					address: data.Address,
					description: data.Description,
					contactperson: data.ContactPerson,
					contactno: data.ContactNo,
					storehour: data.StoreHour,
				}
			)
				.then((res) => {
					if (res.data.responsecode === "402") {
						console.log(res.data.message);
					} else if (res.data.responsecode === "200") {
						navigate("/store");
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
						<BackArrow fontSize='small' onClick={() => navigate("/store")} />
						<h2>Add Store</h2>
					</Header>
					<Body>
						<form onSubmit={handleSubmit(_addStore)}>
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
										color='#a8a8a9'
										require='true'>
										Product Image
									</Label>
									<TextBox
										type='file'
										height='30px'
										width='515px'
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
										placeholder='Please enter product name'
										require='true'
										{...register("Name")}
									/>
								</ListItem>
								<ListItem>
									<TextArea
										placeholder='Please enter store address'
										require='true'
										{...register("Address")}
									/>
								</ListItem>
								<ListItem>
									<TextArea
										placeholder='Please enter product description'
										require='true'
										{...register("Description")}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter contact person'
										require='true'
										{...register("ContactPerson")}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter contact number'
										require='true'
										{...register("ContactNo")}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter store hour'
										require='true'
										{...register("StoreHour")}
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

export default AddStore;
