import { Box } from "@chakra-ui/layout";

export default function MarginBox({ children, minH }) {
	return (
		<Box maxW={1080} marginX={"auto"} minH={minH}>
			{children}
		</Box>
	);
}
