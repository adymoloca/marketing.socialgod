import { FormEvent } from 'react';

const capitalize = (str: string): string => `${str.at(0)?.toUpperCase()}${str.slice(1)}`;
const minimize = (str: string): string => `${str.at(0)?.toLowerCase()}${str.slice(1)}`;
const getTimesArray = (): string[] => {
	const hours = Array.from(
		{
			length: 24,
		},
		(_, hour) => `${hour < 10 ? `0${hour}` : hour}:00`
	);
	return hours;
};
const { isArray } = Array;
function ifIsArray<T>(el: any): T[] {
	return (isArray(el) ? [...el] : []) as T[];
}

// This function can be used to get the form values without creating a new state
// to control them as MUI with Formik is giving issues on that side.
//    ⚠️ ATTENTION
// On Select component if the value is from a multiple select the next prop has to be used
// inputProps = {{ id: * you can use any id but it has to contain the word 'multiplesel' * }}
const submitForm = (e: FormEvent): Record<string, string | string[]> => {
	e.preventDefault();
	const targetKeys = Object.keys(e.target).filter((key) => !Number.isNaN(parseInt(key)));
	const targetObjectsFiltered = targetKeys
		.map((key) => e.target[key as keyof typeof e.target])
		.filter((el) => {
			const parsedEl = el as unknown as HTMLElement;
			return parsedEl.nodeName === 'INPUT';
		});
	const valuesArray = targetObjectsFiltered.map((el) => {
		const parsedEl = el as unknown as HTMLInputElement;
		const value = parsedEl.id.includes('multiplesel') ? parsedEl.value.split(',') : parsedEl.value;
		return {
			key: parsedEl.name,
			value,
		};
	});
	const values = {} as Record<(typeof valuesArray)[0]['key'], (typeof valuesArray)[0]['value']>;
	for (const valuesArrayEl of valuesArray) Object.assign(values, { [valuesArrayEl.key]: valuesArrayEl.value });
	return values;
};

export { capitalize, minimize, submitForm, getTimesArray, isArray, ifIsArray };
export { v4 as uuid } from 'uuid';
