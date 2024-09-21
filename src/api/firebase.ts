import {
	arrayUnion,
	getDoc,
	setDoc,
	addDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./config";
import { getFutureDate, getDaysBetweenDates } from "../utils";
import { calculateEstimate } from "@the-collab-lab/shopping-list-utils";

import * as t from "io-ts";
import { isLeft } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/PathReporter";

const FirebaseTimestamp = new t.Type<
	Timestamp,
	{ seconds: number; nanoseconds: number },
	unknown
>(
	"FirebaseTimestamp",
	(input): input is Timestamp => input instanceof Timestamp,
	(input, context) => {
		if (input instanceof Timestamp) {
			return t.success(input);
		}

		return t.failure(input, context);
	},
	(timestamp) => ({
		seconds: timestamp.seconds,
		nanoseconds: timestamp.nanoseconds,
	}),
);

const ListModel = t.type({
	id: t.string,
	path: t.string,
});

type ListModel = t.TypeOf<typeof ListModel>;

export interface List {
	name: string;
	path: string;
}

/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 */
export function useShoppingLists(user: User | null) {
	// Start with an empty array for our data.
	const [data, setData] = useState<List[]>([]);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!user) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, "users", user.email);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				// deserialize the list into a typed List
				const data = docSnap.data().sharedLists.map((list: unknown) => {
					const decoded = ListModel.decode(list);
					if (isLeft(decoded)) {
						throw Error(
							`Could not validate data: ${PathReporter.report(decoded).join("\n")}`,
						);
					}

					const model = decoded.right;
					return {
						name: model.id,
						path: model.path,
					};
				});
				setData(data);
			}
		});
	}, [user?.email, user?.name]);

	return data;
}

const ListItemModel = t.type({
	id: t.string,
	name: t.string,
	dateLastPurchased: t.union([FirebaseTimestamp, t.null]),
	dateNextPurchased: FirebaseTimestamp,
	totalPurchases: t.number,
	dateCreated: FirebaseTimestamp,
});

export type ListItem = t.TypeOf<typeof ListItemModel>;

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath: string | null) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const [data, setData] = useState<ListItem[]>([]);

	useEffect(() => {
		if (!listPath) return;

		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, "items"), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				const decoded = ListItemModel.decode(item);
				if (isLeft(decoded)) {
					throw Error(
						`Could not validate data: ${PathReporter.report(decoded).join("\n")}`,
					);
				}

				return decoded.right;
			});

			// Update our React state with the new data.
			setData(nextData);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return data;
}

// Designed to replace Firestore's User type in most contexts.
// Firestore's User type allows "email" to be optional.
export interface User {
	email: string;
	name: string;
	uid: string;
}

/**
 * Add a new user to the users collection in Firestore.
 */
export async function addUserToDatabase(user: User) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, "users", user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, "users", user.email), {
			email: user.email,
			name: user.name,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 */
export async function createList(user: User, listName: string) {
	const listDocRef = doc(db, user.uid, listName);

	await setDoc(listDocRef, {
		owner: user.uid,
	});

	const userDocumentRef = doc(db, "users", user.email);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocRef),
	});
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */
export async function shareList(
	listPath: string,
	currentUser: User,
	recipientEmail: string,
) {
	// Check if current user is owner.
	if (!listPath.includes(currentUser.uid)) {
		return;
	}
	// Get the document for the recipient user.
	const usersCollectionRef = collection(db, "users");
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));
	// If the recipient user doesn't exist, we can't share the list.
	if (!recipientDoc.exists()) {
		throw new Error(
			"Unable to share list. Please verify correct email address.",
		);
	}
	// Add the list to the recipient user's sharedLists array.
	const listDocumentRef = doc(db, listPath);
	const userDocumentRef = doc(db, "users", recipientEmail);
	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocumentRef),
	});
}

/**
 * Add a new item to the user's list in Firestore.
 */
export async function addItem(
	listPath: string,
	name: string,
	daysUntilNextPurchase: number,
) {
	const listCollectionRef = collection(db, listPath, "items");

	try {
		await addDoc(listCollectionRef, {
			dateCreated: new Date(),
			// NOTE: This is null because the item has just been created.
			// We'll use updateItem to put a Date here when the item is purchased!
			dateLastPurchased: null,
			dateNextPurchased: getFutureDate(daysUntilNextPurchase),
			name,
			totalPurchases: 0,
		});
	} catch (error) {
		console.error("Error adding an item", error);
		throw error;
	}
}

export async function updateItem(listPath: string, item: ListItem) {
	const itemDocRef = doc(db, listPath, "items", item.id);

	const lastUpdatedDate = item.dateLastPurchased
		? item.dateLastPurchased
		: item.dateCreated;

	// Last estimated date of next purchase, or previous dateNextPurchased in whole number
	const previousEstimate = getDaysBetweenDates(
		lastUpdatedDate.toDate(),
		item.dateNextPurchased.toDate(),
	);

	const daysSinceLastPurchased = getDaysBetweenDates(
		new Date(),
		lastUpdatedDate.toDate(),
	);

	const newDateNextPurchased = getFutureDate(
		calculateEstimate(
			previousEstimate,
			daysSinceLastPurchased,
			item.totalPurchases,
		),
	);

	const updates: Pick<
		ListItem,
		"totalPurchases" | "dateLastPurchased" | "dateNextPurchased"
	> = {
		totalPurchases: item.totalPurchases + 1,
		dateLastPurchased: Timestamp.fromDate(new Date()),
		dateNextPurchased: Timestamp.fromDate(newDateNextPurchased),
	};

	try {
		await updateDoc(itemDocRef, updates);
	} catch (error) {
		console.error("Error updating document", error);
		throw error;
	}
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export function comparePurchaseUrgency(
	item1: ListItem,
	item2: ListItem,
): -1 | 0 | 1 {
	const currentDate = new Date();

	// Check for last time item1 had any activity
	const daysSinceItem1LastActivity = item1.dateLastPurchased
		? getDaysBetweenDates(currentDate, item1.dateLastPurchased.toDate())
		: getDaysBetweenDates(currentDate, item1.dateCreated.toDate());

	// De-prioritize an item if its had no activity for more than 60 days
	if (daysSinceItem1LastActivity >= 60) {
		return 1;
	}

	// Prioritize item1 if current date is past next purchase date and not inactive yet
	if (currentDate > item1.dateNextPurchased.toDate()) {
		return -1;
	}

	// Check for last time item2 had any activity
	const daysSinceItem2LastActivity = item2.dateLastPurchased
		? getDaysBetweenDates(currentDate, item2.dateLastPurchased.toDate())
		: getDaysBetweenDates(currentDate, item2.dateCreated.toDate());

	// Prioritize item2 if current date is past next purchase date and not inactive yet
	if (
		currentDate > item2.dateNextPurchased.toDate() &&
		daysSinceItem2LastActivity < 60
	) {
		return 1;
	}

	const item1DaysUntilNextPurchased = getDaysBetweenDates(
		currentDate,
		item1.dateNextPurchased.toDate(),
	);
	const item2DaysUntilNextPurchased = getDaysBetweenDates(
		currentDate,
		item2.dateNextPurchased.toDate(),
	);

	//Compare days until next purchase for item1 and item2
	//if item1 needs to be purchased sooner, prioritize item1 over item2
	if (item1DaysUntilNextPurchased < item2DaysUntilNextPurchased) {
		return -1;
	}

	//if item2 needs to be purchased sooner, prioritize item2 over item1
	if (item1DaysUntilNextPurchased > item2DaysUntilNextPurchased) {
		return 1;
	}

	//if both items have the same sort order, we sort alphabetically
	return item1.name.toLowerCase() < item2.name.toLowerCase() ? -1 : 1;
}
