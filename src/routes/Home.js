import { Button, ButtonGroup } from "@chakra-ui/button";
import {
	Box,
	Heading,
	Highlight,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import MarginBox from "../components/MarginBox";

export default function Home() {
	return (
		<MarginBox minH={"100vh"}>
			<VStack marginTop={75}>
				<Heading fontSize={"5xl"} paddingBottom={1} fontWeight={"900"}>
					<Highlight
						query="여행"
						styles={{
							borderBottomWidth: 7,
							borderBottomColor: "blue.100",
						}}
					>
						여행을 계획하고 계신가요?
					</Highlight>
				</Heading>
				<Heading paddingBottom={5} fontWeight={"600"}>
					매일 유용한 정보를 보내드릴게요!
				</Heading>
				<Text
					fontSize={"large"}
					color={"blue.300"}
					fontWeight={"400"}
					maxW={"500"}
					textAlign={"center"}
					lineHeight={2}
					pb={10}
				>
					<Highlight
						query={["비행기표 최저가", "오늘의 환율", "최근 30일 환율 그래프"]}
						styles={{
							px: "2",
							py: "1",
							rounded: "full",
							bg: "blue.300",
							color: "white",
						}}
					>
						비행기표 최저가, 오늘의 환율, 최근 30일 환율 그래프
					</Highlight>
					<br />
					여행 정보를 정리하여 이메일로 보내드리는 서비스입니다.
				</Text>
				<RouterLink to={"/order"}>
					<Button size={"lg"} colorScheme={"twitter"}>
						이메일 등록하기&rarr;
					</Button>
				</RouterLink>
			</VStack>
		</MarginBox>
	);
}
