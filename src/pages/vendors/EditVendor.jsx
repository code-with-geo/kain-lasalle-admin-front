import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextBox } from "../../components/styles/Components.styled";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useVendor } from "../../context/Vendor";

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

function EditVendor() {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();

	const { id, storeID } = useParams();
	const { vendorByIDData } = useVendor();
	const data = vendorByIDData(id);

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [phonenumber, setPhoneNumber] = useState();

	useEffect(() => {
		if (data != null) {
			setName(data.name);
			setEmail(data.email);
			setPassword(data.password);
			setPhoneNumber(data.phonenumber);
		}
	}, [data]);

	const _editVendor = (data, event) => {
		event.preventDefault();
		try {
			Axios.post(`http://localhost:3001/vendors/edit/${id}`, {
				name: name,
				email: email,
				password: password,
				phonenumber: phonenumber,
			})
				.then((res) => {
					if (res.data.responsecode === "402") {
						console.log(res.data.message);
					} else if (res.data.responsecode === "200") {
						alert(res.data.message);
						navigate(`/store/vendor/${storeID}`);
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
							onClick={() => navigate(`/store/vendor/${storeID}`)}
						/>
						<h2>Edit Vendor</h2>
					</Header>
					<Body>
						<form onSubmit={handleSubmit(_editVendor)}>
							<List>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter vendor name'
										required
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter vendor number'
										required
										value={phonenumber}
										onChange={(e) => {
											setPhoneNumber(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='email'
										height='30px'
										width='515px'
										placeholder='Please enter vendor email'
										required
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter vendor password'
										required
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
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

export default EditVendor;
