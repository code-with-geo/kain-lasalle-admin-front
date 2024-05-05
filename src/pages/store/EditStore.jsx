import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useStore } from "../../context/Store";
import { useForm } from "react-hook-form";
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

function EditStore() {
	const { storeDataByID } = useStore();
	const { storeID } = useParams();
	const store = storeDataByID(storeID);

	const navigate = useNavigate();

	const { handleSubmit } = useForm();

	const [files, setFiles] = useState(null);
	const [preview, setPreview] = useState();
	const [image, setImage] = useState();

	const [name, setName] = useState();
	const [description, setDescription] = useState();

	useEffect(() => {
		if (store != null) {
			setName(store.name);
			setDescription(store.description);
			setImage(store.image);
		}

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
	}, [files, store]);

	const _editStore = (data, event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("storeID", storeID);
		formData.append("name", name);
		formData.append("description", description);
		if (files !== null) {
			formData.append("file", files[0]);
		}

		try {
			Axios.post(
				`https://kain-lasalle-admin-backend.onrender.com/stores/edit`,
				formData,
				{
					storeID,
					name,
					description,
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
						<h2>Edit Store</h2>
					</Header>
					<Body>
						<form onSubmit={handleSubmit(_editStore)}>
							<List>
								<ListItem
									display='flex'
									alignItems='center'
									flexDirection='column'>
									{files ? <Image src={preview} /> : <Image src={image} />}
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
										accept='image/jpg, image/png, image/jpeg'
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
										placeholder='Please enter product name'
										require='true'
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextArea
										placeholder='Please enter product description'
										require='true'
										value={description}
										onChange={(e) => {
											setDescription(e.target.value);
										}}
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

export default EditStore;
