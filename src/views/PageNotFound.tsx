import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PageNotFound() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate("/", { replace: true });
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div>
			<h1>404 - Page Not Found</h1>
			<p>Redirecting to home...</p>
		</div>
	);
}
