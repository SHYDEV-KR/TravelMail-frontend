import { Box } from "@chakra-ui/layout";

export default function MarginBox({ children, minH, id, marginTop, position }) {
	return (
		<Box
			maxW={1080}
			marginX={"auto"}
			minH={minH}
			id={id}
			marginTop={marginTop}
			position={position}
		>
			{children}
		</Box>
	);
}
