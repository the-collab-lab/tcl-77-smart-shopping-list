import React from "react";
import { Link } from "react-router-dom";
import LinkedInLogo from "../../icons/LinkedInLogo.svg?react";
import GithubLogo from "../../icons/GithubLogo.svg?react";
import { SignInButton } from "../../api";

export function About() {
	return (
		<div>
			<section>
				<h2>How it works</h2>
				<SignInButton isSignIn={false} />
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
			</section>
			<section>
				<h2>Creators</h2>
				<div>
					<p>Maha Ahmed</p>
					<Link to="https://www.linkedin.com/in/maha-ahmed3/" target="_blank">
						<LinkedInLogo width="30" height="30" />
					</Link>
					<Link to="https://github.com/eternalmaha" target="_blank">
						<GithubLogo width="30" height="30" />
					</Link>
				</div>
				<div>
					<p>Brianna Bland</p>
					<Link to="https://www.linkedin.com/in/bbland1/" target="_blank">
						<LinkedInLogo width="30" height="30" />
					</Link>
					<Link to="https://github.com/bbland1" target="_blank">
						<GithubLogo width="30" height="30" />
					</Link>
				</div>
				<div>
					<p>Falak Zahra</p>
					<Link to="https://www.linkedin.com/in/falak-zahra/" target="_blank">
						<LinkedInLogo width="30" height="30" />
					</Link>
					<Link to="https://github.com/zahrafalak" target="_blank">
						<GithubLogo width="30" height="30" />
					</Link>
				</div>
				<div>
					<p>Ross Clettenberg</p>
					<Link
						to="https://www.linkedin.com/in/ross-clettenberg/"
						target="_blank"
					>
						<LinkedInLogo width="30" height="30" />
					</Link>
					<Link to="https://github.com/RossaMania" target="_blank">
						<GithubLogo width="30" height="30" />
					</Link>
				</div>
			</section>
			<section>
				<h2>Thank you</h2>
				<p>Mentors:</p>
				<p>Alex</p>
				<p>Aditya</p>
				<p>Tanner</p>
				<p>The entire The Collab Lab.</p>
			</section>
		</div>
	);
}
