import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	AccountBoxRounded,
	AssessmentRounded,
	DashboardRounded,
	StorefrontRounded,
	Close,
} from "@mui/icons-material";

const Container = styled.div`
	width: ${(props) => props.width};
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	position: fixed;
	z-index: 999;
	display: ${(props) => props.display};
`;

const Overlay = styled.div`
	width: ${(props) => props.width};
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	position: fixed;
	background: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
	width: ${(props) => props.width}; // ${(props) => props.contentWidth};;
	height: 100%; // ${(props) => props.contentHeight};;
	display: flex;
	align-items: center;
	flex-direction: column;
	position: absolute;
	background: #fff;
	top: 0;
	left: 0;
`;

const CloseButton = styled(Close)`
	position: absolute;
	top: 13px;
	left: 200px;
	padding: 5px 7px;
	cursor: pointer;
	color: #343a40;
	z-index: 999;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 10px;
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	list-style: none;
	margin-top: 50px;
`;

const ListItem = styled.li`
	width: 220px;
	display: flex;
	align-items: center;
	border-radius: 5px;
`;

const PageLinks = styled(Link)`
	width: 100%;
	padding: 10px;
	text-decoration: none;
	font-size: 13px;
	transition: 0.3s ease;
	display: flex;
	align-items: center;
	color: #343a40;
	border: 0.5px solid transparent;
	&:hover {
		border: 0.5px solid #b0c5a4;
		border-radius: 5px;
		background-color: #f9fdf6;
	}
`;

const Label = styled.p`
	margin-left: 5px;
`;

const Line = styled.div`
	border: 1px solid #f8f9fa;
	width: 100%;
	max-width: 100%;
	margin: auto;
`;

function SideNavHidden(props) {
	return (
		<>
			<Container
				width={!props.open ? "100vw" : "0"}
				display={!props.open ? "" : "none"}>
				<Overlay
					onClick={() => props.onHandleClose()}
					width={!props.open ? "100vw" : "0"}></Overlay>
				<CloseButton onClick={() => props.onHandleClose()} />

				<Content width={!props.open ? "250px" : "0px"}>
					<Wrapper>
						<List>
							<Line></Line>
							<ListItem>
								<PageLinks>
									<DashboardRounded />
									<Label>Dashboard</Label>
								</PageLinks>
							</ListItem>
							<ListItem>
								<PageLinks>
									<AccountBoxRounded />
									<Label>Users</Label>
								</PageLinks>
							</ListItem>
							<ListItem>
								<PageLinks to='/store'>
									<StorefrontRounded />
									<Label>Stores</Label>
								</PageLinks>
							</ListItem>
							<ListItem>
								<PageLinks>
									<AssessmentRounded />
									<Label>Analytics</Label>
								</PageLinks>
							</ListItem>
						</List>
					</Wrapper>
				</Content>
			</Container>
		</>
	);
}

export default SideNavHidden;
