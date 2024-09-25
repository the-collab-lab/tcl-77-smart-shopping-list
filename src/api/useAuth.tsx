import { useEffect, useState } from "react";
import { auth } from "./config.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addUserToDatabase, User } from "./firebase";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

/**
 * A button that signs the user in using Google OAuth. When clicked,
 * the button redirects the user to the Google OAuth sign-in page.
 * After the user signs in, they are redirected back to the app.
 */
export const SignInButton = () => (
	<Button
		type="button"
		onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
	>
		Sign In
	</Button>
);

/**
 * A button that signs the user out of the app using Firebase Auth.
 */
export const SignOutButton = () => {
	return (
		<Button
			type="button"
			onClick={() => {
				auth.signOut().catch((error) => {
					console.error(error);
					toast.error("An error occurred while signing out. Please try again.");
				});
			}}
		>
			Sign Out
		</Button>
	);
};

/**
 * A custom hook that listens for changes to the user's auth state.
 * Check out the Firebase docs for more info on auth listeners:
 * @see https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
 */
export const useFindUser = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser === null) {
				setUser(null);
				return;
			}

			if (firebaseUser.email === null || firebaseUser.displayName === null) {
				throw Error("Missing critical user information");
			}

			const user = {
				email: firebaseUser.email,
				name: firebaseUser.displayName,
				uid: firebaseUser.uid,
			};

			setUser(user);
			addUserToDatabase(user);
		});

		// Cleanup the subscription when the component unmounts
		return () => unsubscribe();
	}, []);

	return { user };
};
