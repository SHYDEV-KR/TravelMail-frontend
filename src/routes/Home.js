import { Button, ButtonGroup } from "@chakra-ui/button";
import {
	Box,
	Heading,
	Highlight,
	HStack,
	Text,
	VStack,
	Link,
} from "@chakra-ui/layout";
import { AiFillDownCircle } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import MarginBox from "../components/MarginBox";

export default function Home() {
	return (
		<Box>
			<MarginBox minH={"100vh"} position={"relative"}>
				<VStack paddingTop={150}>
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
							query={[
								"비행기표 최저가",
								"오늘의 환율",
								"최근 30일 환율 그래프",
							]}
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
					<VStack position={"absolute"} bottom={5}>
						<Link
							href="#service-detail-1"
							fontSize={"5xl"}
							color={"twitter.400"}
						>
							<AiFillDownCircle id={"DownCircle"} />
						</Link>
					</VStack>
				</VStack>
			</MarginBox>
			<MarginBox id="service-detail-1" minH={"100vh"}>
				<VStack paddingTop={150}>
					<Heading marginBottom={"5"}>
						원하는 여행지로의 비행편을 매일 확인해드려요!
					</Heading>
					<Text fontSize={"xl"}>
						번거롭게 매일 비행기가 늘었는지 줄었는지 확인하기 귀찮지 않나요?
					</Text>
					<Text fontSize={"xl"}>까먹는 날도 분명 있을거에요.</Text>
					<Text fontSize={"xl"}>
						<Highlight
							query={["비행편 현황"]}
							styles={{
								px: "2",
								py: "1",
								rounded: "full",
								bg: "blue.300",
								color: "white",
							}}
						>
							그 수고로움을 덜고 싶어, 매일매일 이메일로 비행편 현황을 보내주는
							서비스를 만들었습니다!
						</Highlight>
					</Text>
				</VStack>
			</MarginBox>
		</Box>
	);
}
