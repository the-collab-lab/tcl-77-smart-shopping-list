import React from "react";
import "./UnauthenticatedHome.scss";
import { useNavigate } from "react-router-dom";
import { SignInButton } from "../../api";
import Button from "react-bootstrap/Button";

export function UnauthenticatedHome() {
	const navigate = useNavigate();

	return (
		<div className="home">
			<h2 className="heading-text">Welcome to GrocerEase</h2>
			<p className="normal-text">
				The next best thing to having someone else do the shopping for you!{" "}
				<br />
				Create and manage smart lists, while it learns your shopping habits to
				let you know exactly when you will need to buy that next batch of toilet
				paper!
			</p>

			<article>
				<h3 className="heading-text">Welcome Back:</h3>
				<div className="custom-button-wrapper">
					<SignInButton />
				</div>
			</article>

			<article>
				<h5 className="heading-text">New to GrocerEase?</h5>
				<div className="custom-button-wrapper">
					<Button
						onClick={() => navigate("/about")}
						aria-label="Navigate to the about application page."
					>
						Learn More
					</Button>
					<SignInButton isSignIn={false} />
				</div>
			</article>
		</div>
	);
}
