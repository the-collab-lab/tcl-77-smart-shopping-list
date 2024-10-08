import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";


const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<StrictMode>
		<Router>
			<App />
		</Router>
	</StrictMode>,
);
