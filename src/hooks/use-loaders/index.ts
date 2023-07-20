import { useCallback, useState } from 'react';

/**
 * Returns an array composed of n boolean/string values to use in loading context and a handler for that.
 * Reccomended: use it as string only in case of multiple elements and you want add load on a single element.
 *
 * If the value inside the position given to the handler is a bool the second param will be not considered.
 *
 * As convention inside the fetch hooks we have 4 loaders:
 * - GET loader (pos. 0)
 * - ADD loader (pos. 1)
 * - UPDATE loader (pos. 2)
 * - DELETE loader (pos. 3)
 *
 * @example
 * const [loadGet, loadAdd, loadUpdate, loadDelete, handleLoad] = useLoaders(false, false, '', '');
 * //let's update the third loader
 * handleLoad(2, 'example_id');
 * // loadUpdate = '' ---> loadUpdate = 'example_id'
 */

function useLoaders<T extends Array<boolean | string>>(
	...loaders: T
): readonly [T, (pos: number, value?: string | boolean) => void] {
	const [loading, setLoading] = useState<T>([...loaders] as T);
	const toggleLoading = useCallback(
		(pos: number, value?: boolean | string) =>
			setLoading((prev) => {
				const temp = [...prev];
				const boolAssign = typeof value === 'boolean' ? value : !prev[pos];
				const newValue = typeof prev[pos] === 'boolean' ? boolAssign : value || '';
				temp.splice(pos, 1, newValue);
				return temp as T;
			}),
		[]
	);

	return [loading, toggleLoading] as const;
}

export { useLoaders };
