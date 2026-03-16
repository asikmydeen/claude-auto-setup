/*!

=========================================================
* Argon Dashboard Chakra PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com/)

* Designed and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Portal, Box, useColorMode, Stack, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import 'assets/css/plugin-styles.css';
import Configurator from 'components/Configurator/Configurator';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin';
import Footer from 'components/Footer/Footer.js';
// Custom components
import MainPanel from 'components/Layout/MainPanel';
import PanelContainer from 'components/Layout/PanelContainer';
import PanelContent from 'components/Layout/PanelContent';
// Layout components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // ES6

import { Route, Routes, Navigate } from "react-router-dom";
import routes from 'routes.js';

import {
	ArgonLogoDark,
	ArgonLogoLight,
	ChakraLogoDark,
	ChakraLogoLight,
	ArgonLogoMinifiedDark,
	ArgonLogoMinifiedLight
} from 'components/Icons/Icons';
// Custom Chakra theme
export default function Dashboard(props) {
	const { ...rest } = props;
	// states and functions
	const [ fixed, setFixed ] = useState(false);
	const [ toggleSidebar, setToggleSidebar ] = useState(false);
	const [ sidebarWidth, setSidebarWidth ] = useState(275); 
	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].items);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].items);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar = getActiveNavbar(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].items);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].secondaryNavbar;
				}
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes) => {
		return routes.map((route, key) => {
			if (route.layout === '/admin') {
				return <Route  path={route.path} element={route.component} key={key} />
			}
			if (route.collapse) {
				return getRoutes(route.items);
			}
			if (route.category) {
				return getRoutes(route.items);
			} else {
				return null;
			}
		});
	};
	let bgBoxHeight = '40vh';
	let bgBoxColor = useColorModeValue('blue.500', 'navy.900');

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();
	document.documentElement.dir = 'ltr';
	document.documentElement.layout = 'admin';
	// Chakra Color Mode
	return (
		<Box>
			<SidebarContext.Provider
				value={{
					sidebarWidth,
					setSidebarWidth,
					toggleSidebar,
					setToggleSidebar
				}}>
				<Box minH={bgBoxHeight} h='100% !important' w='100%' position='absolute' bg={bgBoxColor} top='0' />
				<Sidebar
					routes={routes}
					logo={
						sidebarWidth === 275 ? (
							<Stack direction='row' spacing='12px' align='center' justify='center'>
								{colorMode === 'dark' ? (
									<ArgonLogoLight w='74px' h='27px' />
								) : (
									<ArgonLogoDark w='74px' h='27px' />
								)}
								<Box w='1px' h='20px' bg={colorMode === 'dark' ? 'white' : 'gray.700'} />
								{colorMode === 'dark' ? (
									<ChakraLogoLight w='82px' h='21px' />
								) : (
									<ChakraLogoDark w='82px' h='21px' />
								)}
							</Stack>
						) : colorMode === 'light' ? (
							<ArgonLogoMinifiedDark w='36px' h='36px' />
						) : (
							<ArgonLogoMinifiedLight w='36px' h='36px' />
						)
					}
					display='none'
					{...rest}
				/>
				<MainPanel
					w={{
						base: '100%',
						xl: `calc(100% - ${sidebarWidth}px)`
					}}>
					<Portal>
						<Box>
							<AdminNavbar
								onOpen={onOpen}
								logoText={'Argon Dashboard Chakra PRO'}
								brandText={getActiveRoute(routes)}
								secondary={getActiveNavbar(routes)}
								fixed={fixed}
								{...rest}
							/>
						</Box>
					</Portal>

					{getRoute() ? (
						<PanelContent>
							<PanelContainer>
								<Routes>
									{getRoutes(routes)}
									<Route
									path="/"
									element={<Navigate to="/admin/dashboard/default" replace />}
									/>  
								</Routes>
							</PanelContainer>
						</PanelContent>
					) : null}
					<Box>
						<Footer />
					</Box>
					<Portal>
						<Box>
							<FixedPlugin fixed={fixed} onOpen={onOpen} />
						</Box>
					</Portal>
					<Configurator
						secondary={getActiveNavbar(routes)}
						isOpen={isOpen}
						onClose={onClose}
						isChecked={fixed}
						onSwitch={(value) => {
							setFixed(value);
						}}
					/>
				</MainPanel>
			</SidebarContext.Provider>
		</Box>
	);
}
