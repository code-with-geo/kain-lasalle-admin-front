import React, { useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import TopNav from "../components/navigator/TopNav";
import SideNav from "../components/navigator/SideNav";
import SideNavHidden from "../components/navigator/SideNavHidden";

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Flex = styled.div`
	flex: 1;
	display: flex;
`;

function Dashboard() {
	const [open, setOpen] = useState(true);
	const onHandleClick = () => {
		setOpen(!open);
	};

	const onHandleClose = () => {
		setOpen(true);
	};

	return (
		<>
			<SideNavHidden open={open} onHandleClose={onHandleClose} />
			<Container>
				<TopNav onHandleClick={onHandleClick} />
				<Flex>
					<SideNav />
					<Outlet />
				</Flex>
			</Container>
		</>
	);
}

export default Dashboard;
