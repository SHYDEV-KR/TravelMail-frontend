import { Button } from "@chakra-ui/button";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
	return (
		<VStack bg={"blue.50"} justifyContent={"center"} minH="100vh">
			<Heading>404 Not Found</Heading>
			<Text>존재하지 않는 페이지입니다.</Text>
			<Text>This is not an existing Page.</Text>
			<RouterLink to="/">
				<Button colorScheme={"twitter"} variant={"outline"}>
					Get back Home &rarr;
				</Button>
			</RouterLink>
		</VStack>
	);
}
