import { useCallback, useEffect, useRef, useState } from 'react';
import { stateSetter } from 'utils/types/state';

/**
 * Returns an value got from localStorage for the key given and a handlers on that.
 */

function useLocalStorage<T>(key: string, defaultValue?: T): readonly [T | null, stateSetter<T | null>] {
	const getItem: () => T = useCallback(() => {
		let parsedValue = null as T;
		try {
			const stringifiedValue = localStorage.getItem(key);
			if (stringifiedValue) parsedValue = JSON.parse(stringifiedValue);
			return parsedValue;
		} catch {
			return parsedValue;
		}
	}, [key]);

	const [value, setValue] = useState<T | null>(getItem() || defaultValue || null);

	const setItem = useCallback((v: T) => localStorage.setItem(key, JSON.stringify(v)), [key]);
	const removeItem = useCallback(() => localStorage.removeItem(key), [key]);
	const firstCall = useRef<boolean>(true);

	useEffect(() => {
		if (!firstCall.current)
			if (value === null) removeItem();
			else setItem(value);
		return () => {
			firstCall.current = false;
		};
		// eslint-disable-next-line
	}, [value]);

	return [value, setValue] as const;
}

export default useLocalStorage;
