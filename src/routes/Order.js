import { Button, IconButton } from "@chakra-ui/button";
import {
	FormControl,
	FormLabel,
	FormHelperText,
} from "@chakra-ui/form-control";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import {
	Input,
	InputGroup,
	InputLeftElement,
	Tag,
	TagCloseButton,
	TagLabel,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import MarginBox from "../components/MarginBox";
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
import { formatDate } from "../lib/utils";

import { useForm } from "react-hook-form";

export default function Order() {
	const [departureDate, setDepartureDate] = useState("");
	const [arrivalDate, setArrivalDate] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [emails, setEmails] = useState([]);
	const emailInput = useRef();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onChangeCalendar = (dates) => {
		if (dates) {
			const [firstDate, secondDate] = dates;
			setDueDate(formatDate(new Date(firstDate.toJSON().split("T")[0])));
			setDepartureDate(formatDate(firstDate));
			setArrivalDate(formatDate(secondDate));
		}
	};

	const onChangeDueCalendar = (dueDate) => {
		if (dueDate && typeof dueDate !== "string") {
			setDueDate(formatDate(dueDate));
		}
	};

	const onSubmit = (formData) => {
		formData.departureDate = departureDate;
		formData.arrivalDate = arrivalDate;
		formData.dueDate = dueDate;
		formData.emails = emails;
		console.log(formData);
	};

	const emailTags = emails.map((email) => (
		<Tag key={email}>
			<TagLabel>{email}</TagLabel>
			<TagCloseButton
				onClick={() => {
					emails.splice(emails.indexOf(email), 1);
					setEmails([...emails]);
				}}
			/>
		</Tag>
	));

	return (
		<MarginBox minH={"100vh"}>
			<VStack paddingTop={125}>
				<Heading>여행 정보 신청서</Heading>
				<VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5}>
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
							<option value="인천">인천</option>
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
											pointer
											pointerEvents="none"
											children={<AiOutlineCalendar />}
										/>
										<Input
											isInvalid={Boolean(errors.departureDate?.message)}
											width={"auto"}
											placeholder="출발일"
											variant="filled"
											required
											{...register("departureDate", {
												required: "출발일을 정해주세요.",
											})}
											value={departureDate}
										/>
									</InputGroup>
									<Text>~</Text>
									<InputGroup>
										<InputLeftElement
											pointer
											pointerEvents="none"
											children={<AiOutlineCalendar />}
										/>
										<Input
											isInvalid={Boolean(errors.arrivalDate?.message)}
											width={"fit-content"}
											placeholder="도착일"
											variant="filled"
											required
											{...register("arrivalDate", {
												required: "도착일을 정해주세요.",
											})}
											value={arrivalDate}
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
										pointer
										pointerEvents="none"
										children={<AiOutlineCalendar />}
									/>
									<Input
										isInvalid={Boolean(errors.dueDate?.message)}
										width={"fit-content"}
										placeholder="도착일"
										variant="filled"
										required
										value={dueDate}
										{...register("dueDate", {
											required: "언제까지 메일을 수신할지 정해주세요.",
										})}
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
											departureDate ? new Date(departureDate) : new Date()
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
							<Input type="email" {...register("email")} ref={emailInput} />
							<IconButton
								icon={<AiOutlinePlus />}
								onClick={() => {
									setEmails([...emails, emailInput.current.value]);
									emailInput.current.value = "";
								}}
							></IconButton>
						</HStack>
						<FormHelperText>
							이메일을 여러 개 작성하실 수 있습니다.
						</FormHelperText>
					</FormControl>
					<VStack>{emailTags}</VStack>

					<Button type={"submit"} width={"100%"} colorScheme="twitter">
						여행메일 신청 &rarr;
					</Button>
				</VStack>
			</VStack>
		</MarginBox>
	);
}
