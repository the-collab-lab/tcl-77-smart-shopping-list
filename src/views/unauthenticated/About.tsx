import React, { useState } from "react";
import { Link } from "react-router-dom";
import LinkedInLogo from "../../assets/icons/LinkedInLogo.svg?react";
import GithubLogo from "../../assets/icons/GithubLogo.svg?react";
import { SignInButton } from "../../api";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import SampleImage from "../../assets/images/sample.png";

export function About() {
	const [stepIndex, setStepIndex] = useState(0);

	const handleStepIndexChoice = (selectedIndex: number) => {
		setStepIndex(selectedIndex);
	};

	return (
		<div className="d-flex flex-wrap mx-lg-5 my-3 align-items-center justify-content-center gap-2">
			<Card className="border border-solid rounded-2 border-dark border-3 bg-primary text-info shadow">
				<Card.Body>
					<Card.Title className="fs-3">How it works</Card.Title>
					<Carousel
						activeIndex={stepIndex}
						onSelect={handleStepIndexChoice}
						touch
					>
						<Carousel.Item>
							<Container className="w-50">
								<Image src={SampleImage} fluid />
							</Container>
							<Carousel.Caption>
								<p>
									Create a list for different stores or different grouping of
									items.
								</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<Container className="w-50">
								<Image src={SampleImage} fluid />
							</Container>
							<Carousel.Caption>
								<p>Select a list that you&apos;d like to add items on.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<Container className="w-50">
								<Image src={SampleImage} fluid />
							</Container>
							<Carousel.Caption>
								<p>
									Open the list manager, to start adding items and choosing when
									you will need to restock next.
								</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<Container className="w-50">
								<Image src={SampleImage} fluid />
							</Container>
							<Carousel.Caption>
								<p>
									Now that your new list has items you can start checking off
									items as you shop!
								</p>
								<p>
									Each time an item is marked purchase the application evaluates
									your shopping habits! Supporting you by adjusting your next
									purchase predictions base on when your previous shopping
									history!
								</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<Container className="w-50">
								<Image src={SampleImage} fluid />
							</Container>
							<Carousel.Caption>
								<p>
									If someone else needs to be let into to the shopping time you
									can easily share specific lists with with in the list manager
									so they can see and mark items as purchased too!
								</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
					<SignInButton isSignIn={false} />
				</Card.Body>
			</Card>
			<section className="container align-items-center justify-content-center w-100">
				<div className="row gap-3">
					<Card className="col-lg-6 border border-solid rounded-2 border-dark border-3 shadow  p-2 my-2 bg-primary text-info">
						<Card.Body>
							<Card.Title className="fs-3">Creators</Card.Title>
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
						</Card.Body>
					</Card>
					<Card className="col border border-solid rounded-2 border-dark border-3 shadow  p-2 my-2 bg-primary text-info">
						<Card.Body>
							<Card.Title className="fs-3">Thank you</Card.Title>
							<Card.Text className="text-center">
								To our amazing mentors:
							</Card.Text>
							<div className="text-primary bg-info d-flex flex-row justify-content-between p-2 rounded-1 m-2">
								<Link
									to="https://www.linkedin.com/in/dantonioa/"
									target="_blank"
								>
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
						</Card.Body>
					</Card>
				</div>
			</section>
		</div>
	);
}
