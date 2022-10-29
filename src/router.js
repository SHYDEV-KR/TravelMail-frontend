import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Order from "./routes/Order";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "order",
				element: <Order />,
			},
		],
	},
]);

export default router;
