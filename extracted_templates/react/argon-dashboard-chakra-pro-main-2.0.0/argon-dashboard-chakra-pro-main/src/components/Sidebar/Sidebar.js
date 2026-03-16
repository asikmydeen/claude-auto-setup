/* eslint-disable */

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

import { HamburgerIcon } from '@chakra-ui/icons';
// chakra imports
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	HStack,
	Icon,
	List,
	ListItem,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
import IconBox from 'components/Icons/IconBox';
import {
	renderThumbDark,
	renderThumbLight,
	renderTrack,
	renderTrackRTL,
	renderView,
	renderViewRTL
} from 'components/Scrollbar/Scrollbar';
import { HSeparator } from 'components/Separator/Separator';
import { SidebarContext } from 'contexts/SidebarContext';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FaCircle } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarDocs from './SidebarDocs';

// FUNCTIONS

function Sidebar(props) {
	// to check for active links and opened collapses
	let location = useLocation();

	const { routes, landing } = props;

	// this is for the rest of the collapses
	const { sidebarWidth, setSidebarWidth, toggleSidebar } = React.useContext(SidebarContext);

	let variantChange = '0.2s linear';
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => {
		return location.pathname.includes(routeName);
	};
	// this function creates the links and collapses that appear in the sidebar (left menu)
	const createLinks = (routes) => {
		// Chakra Color Mode
		let activeBg = 'blue.500';
		let inactiveBg = useColorModeValue('transparent', 'navy.700');
		let activeColor = useColorModeValue('gray.700', 'white');
		let inactiveColor = useColorModeValue('gray.400', 'gray.400');
		let sidebarActiveShadow = '0px 7px 11px rgba(0, 0, 0, 0.04)';
		let activeAccordionBg = useColorModeValue('white', 'navy.700');
		let activeColorIcon = 'white';
		let inactiveColorIcon = 'blue.500';

		if (landing) {
			activeBg = 'white';
			inactiveBg = 'transparent';
			activeColor = 'white';
			inactiveColor = 'white';
			sidebarActiveShadow = '0px 7px 11px rgba(0, 0, 0, 0.04)';
			activeAccordionBg = 'rgba(255, 255, 255, 0.11)';
			activeColorIcon = 'blue.500';
			inactiveColorIcon = 'white';
		}

		return routes.map((prop, key) => {
			if (prop.category) {
				return (
					<Box key={key}>
						<Text
							fontSize={sidebarWidth === 275 ? 'md' : 'xs'}
							color={activeColor}
							fontWeight='bold'
							mx='auto'
							ps={{
								sm: '10px',
								xl: '16px'
							}}
							pt='18px'
							pb='12px'
							key={key}>
							{prop.name}
						</Text>
						{createLinks(prop.items)}
					</Box>
				);
			}
			if (prop.collapse) {
				return (
					<Accordion key={key} allowToggle>
						<AccordionItem border='none'>
							<AccordionButton
								display='flex'
								align='center'
								justify='center'
								boxShadow={activeRoute(prop.path) && prop.icon ? sidebarActiveShadow : null}
								_hover={{
									boxShadow: activeRoute(prop.path) && prop.icon ? sidebarActiveShadow : null
								}}
								_focus={{
									boxShadow: 'none'
								}}
								borderRadius='8px'
								w={{
									sm: sidebarWidth === 275 ? '100%' : '77%',
									xl: sidebarWidth === 275 ? '90%' : '70%',
									'2xl': sidebarWidth === 275 ? '95%' : '77%'
								}}
								px={prop.icon ? null : '0px'}
								py={prop.icon ? '12px' : null}
								bg={activeRoute(prop.path) && prop.icon ? activeAccordionBg : 'transparent'}
								ms={sidebarWidth !== 275 ? !prop.icon ? '12px' : '8px' : null}>
								{activeRoute(prop.path) ? (
									<Flex
										fontWeight='bold'
										boxSize='initial'
										justifyContent='flex-start'
										alignItems='center'
										bg='transparent'
										transition={variantChange}
										mx={{
											xl: 'auto'
										}}
										px='0px'
										borderRadius='8px'
										w='100%'
										_hover={{}}
										_active={{
											bg: 'inherit',
											transform: 'none',
											borderColor: 'transparent',
											border: 'none'
										}}
										_focus={{
											transform: 'none',
											borderColor: 'transparent',
											border: 'none'
										}}>
										{prop.icon ? (
											<Flex justify={sidebarWidth === 275 ? 'flex-start' : 'center'}>
												<IconBox
													bg={activeBg}
													color={activeColorIcon}
													h='30px'
													w='30px'
													me={sidebarWidth === 275 ? '12px' : '0px'}
													transition={variantChange}>
													{prop.icon}
												</IconBox>
												<Text
													color={activeColor}
													my='auto'
													fontSize='sm'
													display={sidebarWidth === 275 ? 'block' : 'none'}>
													{prop.name}
												</Text>
											</Flex>
										) : (
											<HStack
												spacing={sidebarWidth === 275 ? '22px' : '0px'}
												ps={sidebarWidth === 275 ? '10px' : '0px'}
												ms={sidebarWidth === 275 ? '0px' : '8px'}>
												<Icon
													as={FaCircle}
													w='10px'
													color='blue.500'
													display={sidebarWidth === 275 ? 'block' : 'none'}
												/>
												<Text color={activeColor} my='auto' fontSize='sm'>
													{sidebarWidth === 275 ? prop.name : prop.name[0]}
												</Text>
											</HStack>
										)}
									</Flex>
								) : (
									<Flex
										fontWeight='bold'
										boxSize='initial'
										justifyContent='flex-start'
										alignItems='center'
										bg='transparent'
										mx={{
											xl: 'auto'
										}}
										px='0px'
										borderRadius='8px'
										w='100%'
										_hover={{}}
										_active={{
											bg: 'inherit',
											transform: 'none',
											borderColor: 'transparent'
										}}
										_focus={{
											borderColor: 'transparent',
											boxShadow: 'none'
										}}>
										{prop.icon ? (
											<Flex justify={sidebarWidth === 275 ? 'flex-start' : 'center'}>
												<IconBox
													bg={inactiveBg}
													color={inactiveColorIcon}
													h='30px'
													w='30px'
													me={sidebarWidth === 275 ? '12px' : '0px'}
													transition={variantChange}>
													{prop.icon}
												</IconBox>
												<Text
													color={inactiveColor}
													my='auto'
													fontSize='sm'
													display={sidebarWidth === 275 ? 'block' : 'none'}>
													{prop.name}
												</Text>
											</Flex>
										) : (
											<HStack
												spacing={sidebarWidth === 275 ? '26px' : '0px'}
												ps={sidebarWidth === 275 ? '10px' : '0px'}
												ms={sidebarWidth === 275 ? '0px' : '8px'}>
												<Icon
													as={FaCircle}
													w='6px'
													color={landing ? 'white' : 'blue.500'}
													display={sidebarWidth === 275 ? 'block' : 'none'}
												/>
												<Text color={inactiveColor} my='auto' fontSize='md' fontWeight='normal'>
													{sidebarWidth === 275 ? prop.name : prop.name[0]}
												</Text>
											</HStack>
										)}
									</Flex>
								)}
								<AccordionIcon
									color={landing ? 'white' : 'gray.400'}
									display={
										prop.icon ? sidebarWidth === 275 ? (
											'block'
										) : (
											'none'
										) : sidebarWidth === 275 ? (
											'block'
										) : (
											'none'
										)
									}
									transform={prop.icon ? null : sidebarWidth === 275 ? null : 'translateX(-70%)'}
								/>
							</AccordionButton>
							<AccordionPanel
								pe={prop.icon ? null : '0px'}
								pb='8px'
								ps={prop.icon ? null : sidebarWidth === 275 ? null : '8px'}>
								<List>
									{prop.icon ? (
										createLinks(prop.items) // for bullet accordion links
									) : (
										createAccordionLinks(prop.items)
									) // for non-bullet accordion links
									}
								</List>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				);
			} else {
				return (
					<NavLink key={key} to={prop.layout + prop.path}>
						{prop.icon ? (
							<Box>
								<HStack spacing='14px' py='15px' px='15px'>
									<IconBox bg='blue.500' color='white' h='30px' w='30px' transition={variantChange}>
										{prop.icon}
									</IconBox>
									<Text
										color={activeRoute(prop.path.toLowerCase()) ? activeColor : inactiveColor}
										fontWeight={activeRoute(prop.name) ? 'bold' : 'normal'}
										fontSize='sm'>
										{prop.name}
									</Text>
								</HStack>
							</Box>
						) : (
							<ListItem key={key} ms={sidebarWidth === 275 ? null : '10px'}>
								<HStack
									spacing={
										sidebarWidth === 275 ? activeRoute(prop.path.toLowerCase()) ? (
											'22px'
										) : (
											'26px'
										) : (
											'8px'
										)
									}
									py='5px'
									px={sidebarWidth === 275 ? '10px' : '0px'}>
									<Icon
										as={FaCircle}
										w={activeRoute(prop.path.toLowerCase()) ? '10px' : '6px'}
										color={landing ? 'white' : 'blue.500'}
										display={sidebarWidth === 275 ? 'block' : 'none'}
									/>
									<Text
										color={activeRoute(prop.path.toLowerCase()) ? activeColor : inactiveColor}
										fontWeight={activeRoute(prop.path.toLowerCase()) ? 'bold' : 'normal'}>
										{sidebarWidth === 275 ? prop.name : prop.name[0]}
									</Text>
								</HStack>
							</ListItem>
						)}
					</NavLink>
				);
			}
		});
	};

	const createAccordionLinks = (routes) => {
		let inactiveColor = useColorModeValue('gray.400', 'gray.400');
		let activeColor = useColorModeValue('gray.700', 'white');

		if (landing) {
			inactiveColor = 'white';
			activeColor = 'white';
		}

		return routes.map((prop, key) => {
			return (
				<NavLink key={key} to={prop.layout + prop.path}>
					<ListItem key={key} pt='5px' ms={sidebarWidth === 275 ? '26px' : '12px'}>
						<Text
							mb='4px'
							color={activeRoute(prop.path.toLowerCase()) ? activeColor : inactiveColor}
							fontWeight={activeRoute(prop.path.toLowerCase()) ? 'bold' : 'normal'}
							fontSize='sm'>
							{sidebarWidth === 275 ? prop.name : prop.name[0]}
						</Text>
					</ListItem>
				</NavLink>
			);
		});
	};

	let isWindows = navigator.platform.startsWith('Win');
	let links = <Box>{createLinks(routes)}</Box>;
	//  BRAND
	//  Chakra Color Mode
	let sidebarBg = useColorModeValue('white', 'navy.800');
	let sidebarRadius = '20px';
	let sidebarMargins = '0px';
	var brand = (
		<Flex align='center' direction='column' pt={'25px'}>
			{props.logo}
			<HSeparator my='20px' />
		</Flex>
	);

	let sidebarContent = (
		<Box>
			<Box>{brand}</Box>
			<Stack direction='column' mb='40px'>
				<Box>{links}</Box>
			</Stack>
			<SidebarDocs landing={landing} />
		</Box>
	);

	// SIDEBAR
	return (
		<Box
			onMouseEnter={toggleSidebar ? () => setSidebarWidth(sidebarWidth === 120 ? 275 : 120) : null}
			onMouseLeave={toggleSidebar ? () => setSidebarWidth(sidebarWidth === 275 ? 120 : 275) : null}>
			<Box display={{ sm: 'none', xl: 'block' }} position='fixed'>
				<Box
					bg={landing ? 'transparent' : sidebarBg}
					transition={variantChange}
					w={`${sidebarWidth}px`}
					ms={{
						sm: '16px'
					}}
					my={{
						sm: '16px'
					}}
					h='calc(100vh - 32px)'
					ps='20px'
					pe='20px'
					m={sidebarMargins}
					borderRadius={sidebarRadius}>
					<Scrollbars
						autoHide
						renderTrackVertical={document.documentElement.dir === 'rtl' ? renderTrackRTL : renderTrack}
						renderThumbVertical={useColorModeValue(renderThumbLight, renderThumbDark)}
						renderView={document.documentElement.dir === 'rtl' ? renderViewRTL : renderView}>
						{sidebarContent}
					</Scrollbars>
				</Box>
			</Box>
		</Box>
	);
}

// FUNCTIONS

export function SidebarResponsive(props) {
	// to check for active links and opened collapses
	let location = useLocation();

	let variantChange = '0.2s linear';
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => {
		return location.pathname.includes(routeName);
	};

	// Chakra Color Mode
	let activeBg = 'blue.500';
	let inactiveBg = useColorModeValue('transparent', 'navy.700');
	let activeColor = useColorModeValue('gray.700', 'white');
	let inactiveColor = useColorModeValue('gray.400', 'gray.400');
	let activeAccordionBg = useColorModeValue('white', 'navy.700');
	let sidebarActiveShadow = useColorModeValue('0px 7px 11px rgba(0, 0, 0, 0.04)', 'none');
	let activeColorIcon = 'white';
	let inactiveColorIcon = 'blue.500';
	let sidebarBackgroundColor = useColorModeValue('white', 'navy.900');

	// this function creates the links and collapses that appear in the sidebar (left menu)
	const createLinks = (routes) => {
		return routes.map((prop, key) => {
			if (prop.category) {
				return (
					<Box key={key}>
						<Text
							fontSize={'md'}
							color={activeColor}
							fontWeight='bold'
							mx='auto'
							ps={{
								sm: '10px',
								xl: '16px'
							}}
							py='12px'
							key={key}>
							{prop.name}
						</Text>
						{createLinks(prop.items)}
					</Box>
				);
			}
			if (prop.collapse) {
				return (
					<Accordion key={key} allowToggle>
						<AccordionItem border='none'>
							<AccordionButton
								as='div'
								display='flex'
								align='center'
								justify='center'
								key={key}
								borderRadius='8px'
								px={prop.icon ? null : '0px'}
								py={prop.icon ? '12px' : null}
								boxShadow={activeRoute(prop.path) && prop.icon ? sidebarActiveShadow : 'none'}
								bg={activeRoute(prop.path) && prop.icon ? activeAccordionBg : 'transparent'}>
								{activeRoute(prop.path) ? (
									<Flex
										fontWeight='bold'
										boxSize='initial'
										justifyContent='flex-start'
										alignItems='center'
										bg='transparent'
										transition={variantChange}
										mx={{
											xl: 'auto'
										}}
										px='0px'
										borderRadius='8px'
										_hover={{}}
										w='100%'
										_active={{
											bg: 'inherit',
											transform: 'none',
											borderColor: 'transparent'
										}}>
										{prop.icon ? (
											<Flex>
												<IconBox
													bg={activeBg}
													color={activeColorIcon}
													h='30px'
													w='30px'
													me='12px'
													transition={variantChange}>
													{prop.icon}
												</IconBox>
												<Text color={activeColor} my='auto' fontSize='sm' display={'block'}>
													{prop.name}
												</Text>
											</Flex>
										) : (
											<HStack spacing={'22px'} ps='10px' ms='0px'>
												<Icon as={FaCircle} w='10px' color='blue.500' />
												<Text as='span' color={activeColor} my='auto' fontSize='sm'>
													{prop.name}
												</Text>
											</HStack>
										)}
									</Flex>
								) : (
									<Text
										as='span'
										fontWeight='bold'
										boxSize='initial'
										justifyContent='flex-start'
										alignItems='center'
										bg='transparent'
										mx={{
											xl: 'auto'
										}}
										px='0px'
										borderRadius='8px'
										_hover={{}}
										w='100%'
										_active={{
											bg: 'inherit',
											transform: 'none',
											borderColor: 'transparent'
										}}
										_focus={{
											boxShadow: 'none'
										}}>
										{prop.icon ? (
											<Flex>
												<IconBox
													bg={inactiveBg}
													color={inactiveColorIcon}
													h='30px'
													w='30px'
													me='12px'
													transition={variantChange}>
													{prop.icon}
												</IconBox>
												<Text color={inactiveColor} my='auto' fontSize='sm'>
													{prop.name}
												</Text>
											</Flex>
										) : (
											<HStack spacing={'26px'} ps={'10px'} ms={'0px'}>
												<Icon as={FaCircle} w='6px' color='blue.500' />
												<Text color={inactiveColor} my='auto' fontSize='sm' fontWeight='normal'>
													{prop.name}
												</Text>
											</HStack>
										)}
									</Text>
								)}
								<AccordionIcon color='gray.400' />
							</AccordionButton>
							<AccordionPanel pe={prop.icon ? null : '0px'} pb='8px'>
								<List>
									{prop.icon ? (
										createLinks(prop.items) // for bullet accordion links
									) : (
										createAccordionLinks(prop.items)
									) // for non-bullet accordion links
									}
								</List>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				);
			} else {
				return (
					<NavLink key={key} to={prop.layout + prop.path}>
						{prop.icon ? (
							<Box>
								<HStack spacing='14px' py='15px' px='15px'>
									<IconBox bg='blue.500' color='white' h='30px' w='30px' transition={variantChange}>
										{prop.icon}
									</IconBox>
									<Text
										color={activeRoute(prop.path.toLowerCase()) ? activeColor : inactiveColor}
										fontWeight={activeRoute(prop.name) ? 'bold' : 'normal'}
										fontSize='sm'>
										{prop.name}
									</Text>
								</HStack>
							</Box>
						) : (
							<ListItem>
								<HStack spacing='22px' py='5px' px='10px'>
									<Icon
										as={FaCircle}
										w={activeRoute(prop.path.toLowerCase()) ? '10px' : '6px'}
										color='blue.500'
									/>
									<Text
										color={activeRoute(prop.path.toLowerCase()) ? activeColor : inactiveColor}
										fontSize='sm'
										fontWeight={activeRoute(prop.path.toLowerCase()) ? 'bold' : 'normal'}>
										{prop.name}
									</Text>
								</HStack>
							</ListItem>
						)}
					</NavLink>
				);
			}
		});
	};

	const createAccordionLinks = (routes) => {
		return routes.map((prop, key) => {
			return (
				<NavLink key={key} to={prop.layout + prop.path}>
					<ListItem pt='5px' ms='26px' key={key}>
						<Text
							color={activeRoute(prop.path.toLowerCase()) ? activeColor : inactiveColor}
							fontWeight={activeRoute(prop.path.toLowerCase()) ? 'bold' : 'normal'}
							fontSize='sm'>
							{prop.name}
						</Text>
					</ListItem>
				</NavLink>
			);
		});
	};
	const { logo, display, routes } = props;

	let links = <Box>{createLinks(routes)}</Box>;
	//  BRAND
	//  Chakra Color Mode
	let hamburgerColor = 'white';

	var brand = (
		<Box pt={'25px'} mb='12px'>
			{logo}
			<HSeparator my='26px' />
		</Box>
	);

	// SIDEBAR
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	// Color variables
	return (
		<Box display={display}>
			<Box display={{ sm: 'flex', xl: 'none' }} ms='8px'>
				<HamburgerIcon
					color={hamburgerColor}
					w='18px'
					h='18px'
					me='16px'
					ref={btnRef}
					cursor='pointer'
					onClick={onOpen}
				/>
				<Drawer
					placement={document.documentElement.dir === 'rtl' ? 'right' : 'left'}
					isOpen={isOpen}
					onClose={onClose}
					finalFocusRef={btnRef}>
					<DrawerOverlay />
					<DrawerContent
						w='250px'
						bg={sidebarBackgroundColor}
						maxW='250px'
						ms={{
							sm: '16px'
						}}
						my={{
							sm: '16px'
						}}
						borderRadius='16px'>
						<DrawerCloseButton _focus={{ boxShadow: 'none' }} _hover={{ boxShadow: 'none' }} />
						<DrawerBody maxW='250px' px='1rem'>
							<Box maxW='100%' h='100vh'>
								<Box mb='20px'>{brand}</Box>
								<Stack direction='column' mb='40px'>
									<Box>{links}</Box>
								</Stack>
								<SidebarDocs />
							</Box>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Box>
		</Box>
	);
}
// PROPS

export default Sidebar;
