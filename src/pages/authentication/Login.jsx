import React from "react";
import styled from "styled-components";
import { TextBox } from "../../components/styles/Components.styled";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const Container = styled.div`
	width: 100%;
	height: 100vh;
`;

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Logo = styled.img`
	width: 200px;
	height: 150px;
`;

const LoginButton = styled.button`
	margin-top: 10px;
	width: 270px;
	height: 40px;
	padding: 10px;
	border: none;
	font-size: 13px;
	font-weight: 500;
	color: #fff;
	border-radius: 5px;
	background-color: #b0c5a4;
	cursor: pointer;
	&:hover {
		background-color: #92a386;
	}
`;

function Login() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const [_, setCookies] = useCookies(["access_token"]);

	const { login } = useAuth();
	const _login = (data, event) => {
		event.preventDefault();
		try {
			Axios.post(`http://localhost:3001/admins/login`, {
				username: data.Username,
				password: data.Password,
			})
				.then((res) => {
					if (res.data.responsecode === "402") {
						alert(res.data.message);
					} else if (res.data.responsecode === "200") {
						login();
						setCookies("access_token", res.data.token);
						window.localStorage.setItem("adminID", res.data.adminID);
						window.localStorage.setItem("isAuthenticated", "true");
						navigate("/");
					}
				})
				.catch((err) => {
					if (err.response) Error();
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Container>
				<Wrapper>
					<Form onSubmit={handleSubmit(_login)}>
						<Logo
							src='https://firebasestorage.googleapis.com/v0/b/studies-14951.appspot.com/o/assets%2Flogo-1.png?alt=media&token=6cefb280-8676-4b1a-8857-20b5da4757e6'
							alt=''
						/>
						<TextBox
							type='text'
							height='40px'
							width='250px'
							fontSize='13px'
							placeholder='Username'
							required='true'
							{...register("Username")}
						/>
						<TextBox
							type='password'
							height='40px'
							width='250px'
							marginTop='10px'
							fontSize='13px'
							placeholder='Password'
							required='true'
							minLength={8}
							{...register("Password")}
						/>
						<LoginButton>Continue</LoginButton>
					</Form>
				</Wrapper>
			</Container>
		</>
	);
}

export default Login;
