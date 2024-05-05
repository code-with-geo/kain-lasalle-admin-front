import { Logout, Menu } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/Auth";

const Container = styled.header`
	height: 80px;
	background-color: #fff;
	border-bottom: 1px solid #dcdee1;
	width: 100%;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: 100%;
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: left;
`;

const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: right;
`;

const PageLinks = styled(Link)`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #343a40;
	margin-right: 20px;
	&:hover {
		color: #b0c5a4;
	}
`;

const MenuButton = styled(Link)`
	display: none;
	@media (max-width: 800px) {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: #343a40;
		margin-left: 20px;
		&:hover {
			color: #b0c5a4;
		}
	}
`;

function TopNav({ onHandleClick }) {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const { logout } = useAuth();
	const _logout = () => {
		logout();
		setCookies("access_token", "");
		window.localStorage.clear();
	};
	return (
		<>
			<Container>
				<Wrapper>
					<Left>
						<MenuButton onClick={() => onHandleClick()}>
							<Menu fontSize='medium' />
						</MenuButton>
					</Left>
					<Right>
						<Tooltip title='Logout'>
							<PageLinks>
								<Logout
									fontSize='medium'
									onClick={() => {
										_logout();
									}}
								/>
							</PageLinks>
						</Tooltip>
					</Right>
				</Wrapper>
			</Container>
		</>
	);
}

export default TopNav;
