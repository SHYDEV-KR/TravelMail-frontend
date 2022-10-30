import { Box, Heading, HStack, Link, Text, VStack } from "@chakra-ui/layout";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { AiOutlineMail, AiFillGithub, AiOutlineRight } from "react-icons/ai";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { useEffect, useState } from "react";

import ToTopBtn from "./ToTopButton";

export default function Root() {
	const [toTopButton, setToTopButton] = useState(() =>
		window.scrollY == 0 ? false : true
	);

	useEffect(() => {
		const handleToTopButton = () => {
			if (window.scrollY == 0) {
				setToTopButton(false);
			} else {
				setToTopButton(true);
			}
		};

		window.addEventListener("scroll", handleToTopButton);
		return () => {
			window.removeEventListener("scroll", handleToTopButton);
		};
	}, []);

	return (
		<Box position={"relative"}>
			<HStack
				justifyContent={"space-between"}
				py={4}
				px={10}
				borderBottomWidth={1}
				position={"fixed"}
				top={0}
				zIndex={"sticky"}
				bg={"white"}
				width={"100vw"}
			>
				<Box>
					<RouterLink to={"/"}>
						<Image maxW="200px" src={"/img/logo.svg"}></Image>
					</RouterLink>
				</Box>
				<HStack>
					<RouterLink to="/order">
						<Button leftIcon={<AiOutlineMail />} colorScheme={"twitter"}>
							여행정보 받기
						</Button>
					</RouterLink>
				</HStack>
			</HStack>
			<ToTopBtn visible={toTopButton} />
			<Outlet />
			<HStack
				justifyContent={"space-around"}
				alignItems={"flex-start"}
				py={4}
				px={10}
				borderTopWidth={1}
			>
				<VStack alignItems={"flex-start"}>
					<Heading fontSize={"xl"}>Contact</Heading>
					<Text fontSize={"sm"}>travelmail@naver.com</Text>
					<Heading fontSize={"xl"}>Developer</Heading>
					<Link
						href={"https://github.com/SHYDEV-KR"}
						target="_blank"
						rel="noopener noreferrer"
					>
						<HStack fontSize={"sm"} color="blue.400">
							<AiFillGithub />
							<Text>SHYDEV-KR</Text>
						</HStack>
					</Link>
				</VStack>
				<VStack alignItems={"flex-start"} maxW={"max-content"}>
					<Heading fontSize="xl">Navigate</Heading>
					<HStack spacing={10}>
						<VStack fontSize={"sm"} maxW={"max-content"}>
							<RouterLink to={"/"}>
								<HStack spacing={0.5}>
									<Text>Home</Text>
									<AiOutlineRight size={10} />
								</HStack>
							</RouterLink>
						</VStack>
						<VStack fontSize={"sm"} maxW={"max-content"}>
							<RouterLink to={"/order"}>
								<HStack spacing={0.5}>
									<Text>Order</Text>
									<AiOutlineRight size={10} />
								</HStack>
							</RouterLink>
						</VStack>
					</HStack>
				</VStack>
			</HStack>
		</Box>
	);
}
