import {
	arrayUnion,
	getDoc,
	setDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	Timestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate } from '../utils';
import { User } from 'firebase/auth';

import * as t from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/PathReporter';

const FirebaseTimestamp = new t.Type<
	Timestamp,
	{ seconds: number; nanoseconds: number },
	unknown
>(
	'FirebaseTimestamp',
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
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(
	userId: string | null,
	userEmail: string | null,
) {
	// Start with an empty array for our data.
	const [data, setData] = useState<List[]>([]);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				// deserialize the list into a typed List
				const data = docSnap.data().sharedLists.map((list: unknown) => {
					const decoded = ListModel.decode(list);
					if (isLeft(decoded)) {
						throw Error(
							`Could not validate data: ${PathReporter.report(decoded).join('\n')}`,
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
	}, [userId, userEmail]);

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
 * @param {string | null} listPath
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
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
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
						`Could not validate data: ${PathReporter.report(decoded).join('\n')}`,
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

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user: User) {
	const userEmail = user.email ?? '';
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', userEmail));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, 'users', userEmail), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 */
export async function createList(
	userId: string,
	userEmail: string,
	listName: string,
) {
	const listDocRef = doc(db, userId, listName);

	await setDoc(listDocRef, {
		owner: userId,
	});

	const userDocumentRef = doc(db, 'users', userEmail);

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
	currentUserId: string,
	recipientEmail: string,
) {
	// Check if current user is owner.
	if (!listPath.includes(currentUserId)) {
		return;
	}
	// Get the document for the recipient user.
	const usersCollectionRef = collection(db, 'users');
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));
	// If the recipient user doesn't exist, we can't share the list.
	if (!recipientDoc.exists()) {
		return;
	}
	// Add the list to the recipient user's sharedLists array.
	const listDocumentRef = doc(db, listPath);
	const userDocumentRef = doc(db, 'users', recipientEmail);
	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocumentRef),
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.name The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(
	listPath: string,
	name: string,
	daysUntilNextPurchase: number,
) {
	const listCollectionRef = collection(db, listPath, 'items');
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	return console.log(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name,
		totalPurchases: 0,
	});
}

export async function updateItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to update an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}
