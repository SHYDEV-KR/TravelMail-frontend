import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./styles/styles.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<ChakraProvider>
				<RouterProvider router={router} />
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
