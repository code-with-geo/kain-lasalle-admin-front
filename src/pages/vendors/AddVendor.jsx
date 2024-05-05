import React from "react";
import styled from "styled-components";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextBox } from "../../components/styles/Components.styled";
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

function AddVendor() {
	const navigate = useNavigate();
	const { storeID } = useParams();
	const { register, handleSubmit } = useForm();

	const _addVendor = (data, event) => {
		event.preventDefault();
		try {
			Axios.post(
				`https://kain-lasalle-admin-backend.onrender.com/vendors/add`,
				{
					storeID: storeID,
					name: data.Name,
					email: data.Email,
					password: data.Password,
					phonenumber: data.Number,
				}
			)
				.then((res) => {
					if (res.data.responsecode === "402") {
						alert(res.data.message);
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
						<h2>Add Vendor</h2>
					</Header>
					<Body>
						<form onSubmit={handleSubmit(_addVendor)}>
							<List>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter vendor name'
										required
										{...register("Name")}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter vendor number'
										required
										{...register("Number")}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='email'
										height='30px'
										width='515px'
										placeholder='Please enter vendor email'
										required
										{...register("Email")}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter vendor password'
										required
										{...register("Password")}
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

export default AddVendor;
