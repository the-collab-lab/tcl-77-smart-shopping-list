const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset: number) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function moreThan24HoursPassed(purchaseDate: Date): boolean {
	const currentTime = new Date();

	const timeElapsedInMilliseconds =
		currentTime.getTime() - purchaseDate.getTime();

	return timeElapsedInMilliseconds >= ONE_DAY_IN_MILLISECONDS;
}
