import { Button, IconButton } from "@chakra-ui/button";
import {
	FormControl,
	FormLabel,
	FormHelperText,
} from "@chakra-ui/form-control";
import {
	Box,
	Divider,
	Flex,
	Heading,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/layout";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	PopoverAnchor,
} from "@chakra-ui/react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
	Input,
	InputGroup,
	InputLeftElement,
	Tag,
	TagCloseButton,
	TagLabel,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import {
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
} from "@chakra-ui/react";
/* ====== */
/* ====== */
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
	AiOutlineCalendar,
	AiOutlineCheckCircle,
	AiOutlinePlus,
} from "react-icons/ai";
/* ====== */
/* ====== */
import { useForm } from "react-hook-form";
/* ====== */
/* ====== */
import React, { useEffect, useRef, useState } from "react";
/* ====== */
/* ====== */
import MarginBox from "../components/MarginBox";
import { formatDate } from "../lib/utils";

export default function Order() {
	const [dates, setDates] = useState({
		departureDate: "",
		arrivalDate: "",
		dueDate: "",
	});
	const [emails, setEmails] = useState([]);
	const [submittedForm, setSubmittedForm] = useState({
		departureDate: "",
		departureCity: "",
		arrivalDate: "",
		arrivalCity: "",
		currencyCode: "",
		dueDate: "",
		emails: [],
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const emailInput = useRef();
	const departureDateInput = useRef();
	const arrivalDateInput = useRef();
	const dueDateInput = useRef();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const onChangeCalendar = (dates) => {
		if (dates) {
			const [firstDate, secondDate] = dates;
			setDates((dates) => {
				return {
					...dates,
					dueDate: formatDate(new Date(firstDate.toJSON().split("T")[0])),
					departureDate: formatDate(firstDate),
					arrivalDate: formatDate(secondDate),
				};
			});
		}
	};

	const onChangeDueCalendar = (date) => {
		if (date && typeof date !== "string") {
			setDates((dates) => {
				return {
					...dates,
					dueDate: formatDate(date),
				};
			});
		}
	};

	useEffect(() => {
		if (departureDateInput) {
			departureDateInput.current.value = dates.departureDate;
			setValue("departureDate", dates.departureDate);
		}
		if (arrivalDateInput) {
			arrivalDateInput.current.value = dates.arrivalDate;
			setValue("arrivalDate", dates.arrivalDate);
		}
		if (dueDateInput) {
			dueDateInput.current.value = dates.dueDate;
			setValue("dueDate", dates.dueDate);
		}
	}, [dates]);

	const onSubmit = ({
		departureDate,
		departureCity,
		arrivalDate,
		arrivalCity,
		currencyCode,
		dueDate,
		emails,
	}) => {
		setSubmittedForm({
			departureDate: departureDate,
			departureCity: departureCity,
			arrivalDate: arrivalDate,
			arrivalCity: arrivalCity,
			currencyCode: currencyCode,
			dueDate: dueDate,
			emails: emails,
		});
		onOpen();
	};

	const emailTags = emails.map((email) => (
		<Tag key={email} bg={"twitter.100"}>
			<TagLabel>{email}</TagLabel>
			<TagCloseButton
				onClick={() => {
					emails.splice(emails.indexOf(email), 1);
					setEmails([...emails]);
					setValue("emails", [...emails]);
				}}
			/>
		</Tag>
	));

	const ConfirmModal = ({ isOpen, onClose, submittedForm }) => {
		const {
			departureCity,
			arrivalCity,
			departureDate,
			arrivalDate,
			currencyCode,
			dueDate,
			emails,
		} = submittedForm;
		const [checked, setChecked] = useState(false);

		return (
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>정보확인</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack
							bg={"gray.50"}
							padding={3}
							alignItems={"flex-start"}
							borderRadius={5}
							mb={3}
						>
							<HStack w={"100%"} justifyContent={"space-between"}>
								<Heading fontSize={"xl"}>
									{departureCity}-{arrivalCity}
								</Heading>
								<Tag fontWeight={"bold"} bg={"twitter.50"}>
									{currencyCode}/KRW
								</Tag>
							</HStack>
							<HStack w={"100%"} justifyContent={"space-between"}>
								<Text>
									<strong>
										{departureDate}~{arrivalDate}
									</strong>
								</Text>
							</HStack>
							<Divider />
							<Text>
								<strong>수신자 ({emails.length})</strong>
							</Text>
							<VStack alignItems={"flex-start"}>
								{emails.map((email) => (
									<Tag bg="twitter.50" key={email}>
										{email}
									</Tag>
								))}
							</VStack>
							<Divider />
							<Text fontWeight={"bold"}>이메일 수신</Text>
							<Tag bg={"twitter.50"}>{dueDate}까지</Tag>
						</VStack>
						<VStack>
							<List spacing={1} fontSize={"md"} mx={3} alignSelf={"flex-start"}>
								<ListItem>
									<ListIcon as={AiOutlineCheckCircle} color="green.500" />
									이메일은 매일 점심 12시에 일괄 발송됩니다.
								</ListItem>
								<ListItem>
									<ListIcon as={AiOutlineCheckCircle} color="green.500" />
									결제 정보에 따라 가격이 달라질 수 있습니다.
								</ListItem>
								<ListItem>
									<ListIcon as={AiOutlineCheckCircle} color="green.500" />
									환율정보는 오전 9시를 기준으로 수집됩니다.
								</ListItem>
								<Checkbox
									pt={3}
									onChange={() => {
										setChecked((checked) => (checked = !checked));
									}}
								>
									위 내용을 확인하였으며 이메일을 수신하겠습니다.
								</Checkbox>
							</List>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							정정
						</Button>
						<Button variant="solid" colorScheme="twitter" disabled={!checked}>
							메일 신청 &rarr;
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		);
	};

	return (
		<MarginBox minH={"100vh"}>
			<VStack paddingTop={125} paddingBottom={75}>
				<Heading>여행 정보 신청서</Heading>
				<VStack spacing={5}>
					<FormControl>
						<FormLabel>출발지</FormLabel>
						<Select
							isInvalid={Boolean(errors.departureCity?.message)}
							placeholder="출발지를 골라주세요."
							required
							{...register("departureCity", {
								required: "출발지를 골라주세요.",
							})}
						>
							<option value={"인천"}>인천</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>도착지</FormLabel>
						<Select
							isInvalid={Boolean(errors.arrivalCity?.message)}
							placeholder="도착지를 골라주세요."
							required
							{...register("arrivalCity", { required: "도착지를 골라주세요." })}
						>
							<option value="후쿠오카">후쿠오카</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>날짜 선택</FormLabel>

						<Popover placement="auto">
							<PopoverTrigger>
								<HStack>
									<InputGroup>
										<InputLeftElement
											pointer="true"
											pointerEvents="none"
											children={<AiOutlineCalendar />}
										/>
										<Input
											isInvalid={Boolean(errors.departureDate?.message)}
											placeholder="출발일"
											variant="filled"
											required
											{...register("departureDate", {
												required: "출발일을 정해주세요.",
											})}
											onChange={(e) => console.log("hi")}
											ref={departureDateInput}
										/>
									</InputGroup>
									<Text>~</Text>
									<InputGroup>
										<InputLeftElement
											pointer="true"
											pointerEvents="none"
											children={<AiOutlineCalendar />}
										/>
										<Input
											isInvalid={Boolean(errors.arrivalDate?.message)}
											placeholder="도착일"
											variant="filled"
											required
											{...register("arrivalDate", {
												required: "도착일을 정해주세요.",
											})}
											ref={arrivalDateInput}
										/>
									</InputGroup>
								</HStack>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverCloseButton />
								<PopoverHeader>날짜 선택</PopoverHeader>
								<PopoverBody>
									<Calendar
										onChange={onChangeCalendar}
										prev2Label={null}
										next2Label={null}
										minDetail="month"
										minDate={new Date()}
										maxDate={
											new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)
										}
										selectRange
									/>
								</PopoverBody>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormControl>
						<FormLabel>환율 정보</FormLabel>
						<Select
							isInvalid={Boolean(errors.currencyCode?.message)}
							placeholder="제공받을 환율을 설정해주세요."
							required
							{...register("currencyCode", {
								required: "제공받을 환율을 설정해주세요.",
							})}
						>
							<option value="JPY">JPY/KRW</option>
							<option value="USD">USD/KRW</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>메일 수신 기한</FormLabel>
						<Popover placement="auto">
							<PopoverTrigger>
								<InputGroup>
									<InputLeftElement
										pointer="true"
										pointerEvents="none"
										children={<AiOutlineCalendar />}
									/>
									<Input
										isInvalid={Boolean(errors.dueDate?.message)}
										placeholder="도착일"
										variant="filled"
										required
										{...register("dueDate", {
											required: "언제까지 메일을 수신할지 정해주세요.",
										})}
										ref={dueDateInput}
									/>
								</InputGroup>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverCloseButton />
								<PopoverHeader>날짜 선택</PopoverHeader>
								<PopoverBody>
									<Calendar
										onChange={onChangeDueCalendar}
										prev2Label={null}
										next2Label={null}
										minDetail="month"
										minDate={new Date()}
										maxDate={
											dates.departureDate
												? new Date(dates.departureDate)
												: new Date()
										}
									/>
								</PopoverBody>
							</PopoverContent>
						</Popover>
						<FormHelperText>언제까지 메일을 보내드리면 될까요?</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>이메일 주소</FormLabel>
						<HStack>
							<Input
								type="email"
								isInvalid={Boolean(errors.emails?.message)}
								{...register("emails", {
									required: "정보를 받을 이메일을 입력해주세요.",
								})}
								ref={emailInput}
							/>
							<IconButton
								icon={<AiOutlinePlus />}
								onClick={() => {
									const emailInputValue = emailInput.current.value;
									if (emailInputValue && !emails.includes(emailInputValue)) {
										setEmails([...emails, emailInputValue]);
										setValue("emails", [...emails, emailInputValue]);
									}
									emailInput.current.value = "";
								}}
							></IconButton>
						</HStack>
						<FormHelperText>
							이메일을 여러 개 작성하실 수 있습니다.
						</FormHelperText>
					</FormControl>
					<VStack>{emailTags}</VStack>

					<Button
						type={"submit"}
						onClick={handleSubmit(onSubmit)}
						width={"100%"}
						colorScheme="twitter"
					>
						여행메일 신청 &rarr;
					</Button>
					<ConfirmModal
						isOpen={isOpen}
						onClose={onClose}
						submittedForm={submittedForm}
					/>
				</VStack>
			</VStack>
		</MarginBox>
	);
}
