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
					<span>Maha Ahmed</span>
					<Link to="https://www.linkedin.com/in/maha-ahmed3/" target="_blank">
						<LinkedInLogo width="25" height="25" />
					</Link>
					<Link to="https://github.com/eternalmaha" target="_blank">
						<GithubLogo width="25" height="25" />
					</Link>
				</div>
				<div>
					<span>Brianna Bland</span>
					<Link to="https://www.linkedin.com/in/bbland1/" target="_blank">
						<LinkedInLogo width="25" height="25" />
					</Link>
					<Link to="https://github.com/bbland1" target="_blank">
						<GithubLogo width="25" height="25" />
					</Link>
				</div>
				<div>
					<span>Falak Zahra</span>
					<Link to="https://www.linkedin.com/in/falak-zahra/" target="_blank">
						<LinkedInLogo width="25" height="25" />
					</Link>
					<Link to="https://github.com/zahrafalak" target="_blank">
						<GithubLogo width="25" height="25" />
					</Link>
				</div>
				<div>
					<span>Ross Clettenberg</span>
					<Link
						to="https://www.linkedin.com/in/ross-clettenberg/"
						target="_blank"
					>
						<LinkedInLogo width="25" height="25" />
					</Link>
					<Link to="https://github.com/RossaMania" target="_blank">
						<GithubLogo width="25" height="25" />
					</Link>
				</div>
			</section>
			<section>
				<h2>Thank you</h2>
				<p>Mentors:</p>
				<div>
					<span>Alex D.</span>
					<Link to="https://www.linkedin.com/in/dantonioa/" target="_blank">
						<LinkedInLogo width="25" height="25" />
					</Link>
					<Link to="https://github.com/alex-andria" target="_blank">
						<GithubLogo width="25" height="25" />
					</Link>
				</div>
				<div>
					<span>Aditya Dalal</span>
					<Link to="https://www.linkedin.com/in/adityadalal/" target="_blank">
						<LinkedInLogo width="25" height="25" />
					</Link>
					<Link to="https://github.com/adidalal" target="_blank">
						<GithubLogo width="25" height="25" />
					</Link>
				</div>
				<div>
					<span>Tanner Gill</span>
					<Link to="https://www.linkedin.com/in/tanner-gill/" target="_blank">
						<LinkedInLogo width="25" height="25" />
					</Link>
					<Link to="https://github.com/tannaurus" target="_blank">
						<GithubLogo width="25" height="25" />
					</Link>
				</div>
				<p>
					The entire{" "}
					<a href="https://the-collab-lab.codes/developers/" target="_blank">
						The Collab Lab
					</a>
					.
				</p>
			</section>
		</div>
	);
}
