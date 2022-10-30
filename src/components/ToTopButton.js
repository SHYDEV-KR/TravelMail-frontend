import { IconButton } from "@chakra-ui/button";
import { useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function ToTopBtn({ visible }) {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<IconButton
			onClick={scrollToTop}
			display={visible ? "flex" : "none"}
			position={"fixed"}
			bottom={5}
			right={5}
			colorScheme={"twitter"}
			icon={<AiOutlineArrowUp />}
			fontSize={"xl"}
			borderRadius={"50%"}
		/>
	);
}
