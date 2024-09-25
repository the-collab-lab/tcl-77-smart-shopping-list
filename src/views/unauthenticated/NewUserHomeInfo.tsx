import React from "react";
import { useNavigate } from "react-router-dom";
import { SignInButton } from "../../api";

export function NewUserHomeInfo() {
	const navigate = useNavigate();

	return (
		<>
			<h1>Welcome to APPLICATION NAME</h1>
			<p>
				The next best thing to having someone else do the shopping for you!
				Create and manage smart lists learn your habits to let you know exactly
				when you will need t
			</p>

			<article>
				<p>New to APPLICATION NAME?</p>
				<button
					onClick={() => navigate("/about")}
					aria-label="Navigate to the about application page."
				>
					Learn More
				</button>
			</article>

			<article>
				<p>Welcome Back:</p>
				<SignInButton />
			</article>
		</>
	);
}
