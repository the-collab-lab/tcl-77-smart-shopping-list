import React from "react";
import { useNavigate } from "react-router-dom";
import { SignInButton } from "../../api";

export function UnauthenticatedHome() {
	const navigate = useNavigate();

	return (
		<div className="Home">
			<h2>Welcome to GrocerEase</h2>
			<p>
				The next best thing to having someone else do the shopping for you!
				Create and manage smart lists, while it learns your shopping habits to
				let you know exactly when you will need to buy that next batch of toilet
				paper!
			</p>

			<article>
				<p>New to GrocerEase:</p>
				<button
					onClick={() => navigate("/about")}
					aria-label="Navigate to the about application page."
				>
					Learn More
				</button>
				<SignInButton isSignIn={false} />
			</article>

			<article>
				<p>Welcome Back:</p>
				<SignInButton />
			</article>
		</div>
	);
}
