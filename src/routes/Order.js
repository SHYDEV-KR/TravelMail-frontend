import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import MarginBox from "../components/MarginBox";

export default function order() {
	return (
		<MarginBox>
			Order route
			<RouterLink to="/">
				<Button>Back Home &rarr;</Button>
			</RouterLink>
		</MarginBox>
	);
}
