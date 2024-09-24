import React from "react";

import { Routes, Route } from "react-router-dom";

import {
	Home,
	Layout,
	List,
	ManageList,
	PageNotFound,
	SampleList,
} from "./views";

import { useFindUser, useShoppingListData, useShoppingLists } from "./api";

import { useStateWithStorage } from "./utils";
import { ProtectRoute } from "./components";

/**
 * Putting Toaster at the top level of the App allows
 * react-hot-toast to work anywhere in the app by just
 * importing toast as done in useAuth.
 */

import { Toaster } from "react-hot-toast";

export function App() {
	/**
	 * This custom hook takes the path of a shopping list
	 * in our database and syncs it with localStorage for later use.
	 * Check ./utils/hooks.js for its implementation.
	 *
	 * We'll later use `setListPath` when we allow a user
	 * to create and switch between lists.
	 */
	const [listPath, setListPath] = useStateWithStorage(
		"tcl-shopping-list-path",
		null,
	);

	/**
	 * This custom hook holds info about the current signed in user.
	 * Check ./api/useAuth.jsx for its implementation.
	 */
	const { user } = useFindUser();

	/**
	 * This custom hook takes a user ID and email and fetches
	 * the shopping lists that the user has access to.
	 * Check ./api/firestore.js for its implementation.
	 */
	const lists = useShoppingLists(user);

	/**
	 * This custom hook takes our token and fetches the data for our list.
	 * Check ./api/firestore.js for its implementation.
	 */
	const data = useShoppingListData(listPath);

	return (
		<>
			<Toaster />
			<Routes>
				<Route path="/" element={<Layout user={user} />}>
					<Route
						path="/"
						element={
							<Home data={lists} setListPath={setListPath} user={user} />
						}
					/>

					{/* protected routes */}
					<Route element={<ProtectRoute user={user} redirectPath="/" />}>
						<Route
							path="/list"
							element={<List data={data} listPath={listPath} />}
						/>
						<Route
							path="/manage-list"
							element={<ManageList listPath={listPath} data={data || []} />}
						/>
					</Route>

					<Route path="/sample-list" element={<SampleList />}></Route>

					{/* a catch all route for if someone tries to manually navigate to something not created yet */}
					<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</>
	);
}
