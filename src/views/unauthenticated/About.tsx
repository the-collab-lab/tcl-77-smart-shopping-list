import React from "react";
import { Link } from "react-router-dom";
import LinkedInLogo from "../../icons/LinkedInLogo.svg?react";
import GithubLogo from "../../icons/GithubLogo.svg?react";
import { SignInButton } from "../../api";
import { Card, Container } from "react-bootstrap";

export function About() {
	return (
		<div className="d-flex flex-wrap m-2 align-items-center justify-content-center gap-2">
			<Card className="border border-solid rounded-2 border-dark border-3 bg-primary text-info shadow">
				<h2>How it works</h2>
				<ul>
					<li>
						Create a list for different stores or different grouping of items.
					</li>
					<li>Select a list that you&apos;d like to add items on.</li>
					<li>
						Open the list manager, to start adding items and choosing when you
						will need to restock next.
					</li>
					<li>
						Now that your new list has items you can start checking off items as
						you shop!
						<ul>
							<li>
								Each time an item is marked purchase the application evaluates
								your shopping habits! Supporting you by adjusting your next
								purchase predictions base on when your previous shopping
								history!
							</li>
						</ul>
					</li>
					<li>
						If someone else needs to be let into to the shopping time you can
						easily share specific lists with with in the list manager so they
						can see and mark items as purchased too!
					</li>
				</ul>
				<SignInButton isSignIn={false} />
			</Card>
			<section className="d-flex flex-wrap align-items-center justify-content-center gap-2 w-100">
				<Card className="border border-solid rounded-2 border-dark border-3 shadow flex-grow-1  p-2 my-2 bg-primary text-info">
					<h2>Creators</h2>
					<Container>
						<div className="text-primary bg-info d-flex flex-row justify-content-between p-2 rounded-1 m-2 align-items-center">
							<Link
								to="https://www.linkedin.com/in/maha-ahmed3/"
								target="_blank"
							>
								<LinkedInLogo width="25" height="25" />
							</Link>
							<span>Maha Ahmed</span>
							<Link to="https://github.com/eternalmaha" target="_blank">
								<GithubLogo width="25" height="25" />
							</Link>
						</div>
						<div className="text-primary bg-info d-flex flex-row justify-content-between p-2 rounded-1 m-2">
							<Link to="https://www.linkedin.com/in/bbland1/" target="_blank">
								<LinkedInLogo width="25" height="25" />
							</Link>
							<span>Brianna Bland</span>
							<Link to="https://github.com/bbland1" target="_blank">
								<GithubLogo width="25" height="25" />
							</Link>
						</div>
						<div className="text-primary bg-info d-flex flex-row justify-content-between p-2 rounded-1 m-2">
							<Link
								to="https://www.linkedin.com/in/falak-zahra/"
								target="_blank"
							>
								<LinkedInLogo width="25" height="25" />
							</Link>
							<span>Falak Zahra</span>
							<Link to="https://github.com/zahrafalak" target="_blank">
								<GithubLogo width="25" height="25" />
							</Link>
						</div>
						<div className="text-primary bg-info d-flex flex-row justify-content-between p-2 rounded-1 m-2">
							<Link
								to="https://www.linkedin.com/in/ross-clettenberg/"
								target="_blank"
							>
								<LinkedInLogo width="25" height="25" />
							</Link>
							<span>Ross Clettenberg</span>
							<Link to="https://github.com/RossaMania" target="_blank">
								<GithubLogo width="25" height="25" />
							</Link>
						</div>
					</Container>
				</Card>
				<Card className="border border-solid rounded-2 border-dark border-3 shadow flex-grow-1 p-2 my-2 bg-primary text-info">
					<Card.Title>Thank you</Card.Title>
					<Container>
						<p className="text-center">To our amazing mentors:</p>
						<div className="text-primary bg-info d-flex flex-row justify-content-between p-2 rounded-1 m-2">
							<Link to="https://www.linkedin.com/in/dantonioa/" target="_blank">
								<LinkedInLogo width="25" height="25" />
							</Link>
							<span>Alex D.</span>
							<Link to="https://github.com/alex-andria" target="_blank">
								<GithubLogo width="25" height="25" />
							</Link>
						</div>
						<div className="text-primary bg-info d-flex flex-row justify-content-between p-2 rounded-1 m-2">
							<Link
								to="https://www.linkedin.com/in/adityadalal/"
								target="_blank"
							>
								<LinkedInLogo width="25" height="25" />
							</Link>
							<span>Aditya Dalal</span>
							<Link to="https://github.com/adidalal" target="_blank">
								<GithubLogo width="25" height="25" />
							</Link>
						</div>
						<div className="text-primary bg-info d-flex flex-row justify-content-between p-2 rounded-1 m-2">
							<Link
								to="https://www.linkedin.com/in/tanner-gill/"
								target="_blank"
							>
								<LinkedInLogo width="25" height="25" />
							</Link>
							<span>Tanner Gill</span>
							<Link to="https://github.com/tannaurus" target="_blank">
								<GithubLogo width="25" height="25" />
							</Link>
						</div>
						<p className="text-center">
							The entire{" "}
							<a
								href="https://the-collab-lab.codes/developers/"
								target="_blank"
							>
								The Collab Lab
							</a>
							for the opportunity!
						</p>
					</Container>
				</Card>
			</section>
		</div>
	);
}
