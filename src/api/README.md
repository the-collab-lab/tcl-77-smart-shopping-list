# The shopping list API

## Overview

The `firebase.js` file contains all of the functions that communicate with your Firestore database. Think of it as the home base for the shopping list API. React components that need to communicate with your Firestore database should import a function defined here; they should _never_ import any modules in the `firebase/firestore` package directly.

## The API functions

### `addUserToDatabase`

This function adds a new user to the database on their initial sign-in.

| Parameter | Type     | Description                                          |
| --------- | -------- | ---------------------------------------------------- |
| `user`    | `object` | The user object returned by Firebase Authentication. |

### `createList`

This function takes user-provided data and uses it to create a new list in the Firestore database.

| Parameter   | Type     | Description                                              |
| ----------- | -------- | -------------------------------------------------------- |
| `userId`    | `string` | The user ID of the current user (the owner of the list). |
| `userEmail` | `string` | The email of the current user (the owner of the list).   |
| `listName`  | `string` | The name of the list.                                    |

### `shareList`

This function takes the path to a list, the owner's id, and the user to be added's email and shares the list with that user if they exist in the database and if the current user is the owner of the list.

| Parameter        | Type     | Description                                               |
| ---------------- | -------- | --------------------------------------------------------- |
| `listPath`       | `string` | The Firestore path of the list to be shared.              |
| `currentUserId`  | `string` | The user ID of the current user (the owner of the list).  |
| `recipientEmail` | `string` | The email of the user with whom the list is to be shared. |

### `addItem`

This function takes user-provided data and uses it to create a new item in the Firestore database.

| Parameter               | Type     | Description                                                                              |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `listPath`              | `string` | The Firestore path of the list to which the item will be added.                          |
| `itemName`              | `string` | The name of the item.                                                                    |
| `daysUntilNextPurchase` | `number` | The number of days until the user anticipates they will need to purchase the item again. |

#### Note

**`daysUntilNextPurchase` is not added to the item directly**. It is used alongside the `getFutureDate` utility function to create a new _JavaScript Date_ that represents when we think the user will buy the item again.

### `updateItem`

This function takes user-provided data and uses it to update an exiting item in the Firestore database.

| Parameter  | Type     | Description                                                     |
| ---------- | -------- | --------------------------------------------------------------- |
| `listPath` | `string` | The Firestore path of the list to which the item will be added. |
| `item`     | `object` | The item object.                                                |

### `deleteItem`

🚧 To be completed! 🚧

### `comparePurchaseUrgency`

This function compares two item objects to determine their priority order for sorting. It evaluates `daysSineLastActivity` of `item1` and uses `daysSineLastActivity`, `item1.dateNextPurchased` and `item2.dateNextPurchased` to establish the order urgency.

| Parameter | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| `item1`   | `object` | The first item being compared to the second item. |
| `item2`   | `object` | The second item being compared to the first item. |

## The shape of the the data

When we request a shopping list, it is sent to us as an array of objects with a specific shape – a specific arrangement of properties and the kinds of data those properties can hold. This table describes the shape of the items that go into the shopping list.

| Property            | Type     | Description                                                       |
| ------------------- | -------- | ----------------------------------------------------------------- |
| `dateCreated`       | `Date`   | The date at which the item was created.                           |
| `dateLastPurchased` | `Date`   | The date at which the item was last purchased.                    |
| `dateNextPurchased` | `Date`   | The date at which we expect the user to purchase this item again. |
| `name`              | `string` | The name of the item.                                             |
| `totalPurchases`    | `number` | The total number of times the item has been purchased.            |
