import { DependencyList, MutableRefObject, useEffect } from 'react';

const listenerCallbacks = new WeakMap();
let observer: IntersectionObserver;

const handleIntersections = (entries: IntersectionObserverEntry[]): void =>
	entries.forEach((entry) => {
		if (listenerCallbacks.has(entry.target)) {
			const cb = listenerCallbacks.get(entry.target);

			if (entry.isIntersecting || entry.intersectionRatio > 0) {
				observer.unobserve(entry.target);
				listenerCallbacks.delete(entry.target);
				cb();
			}
		}
	});

const getIntersectionObserver = (): IntersectionObserver => {
	if (observer === undefined) {
		observer = new IntersectionObserver(handleIntersections, {
			rootMargin: '100px',
			threshold: 0.15,
		});
	}
	return observer;
};

/**
 * Creates an intersection observer for a given element and runs the given
 * element when the element is inside the viewport.
 * The observer will be killed when the dependencies array will have changes.
 */

function useIntersection(
	elem: MutableRefObject<Element | null>,
	callback: () => void,
	dependencies: DependencyList
): void {
	useEffect(() => {
		let target: MutableRefObject<Element>['current'] | undefined;
		if (elem.current) {
			target = elem.current;
		}
		const currentObserver = getIntersectionObserver();
		if (target) {
			listenerCallbacks.set(target, callback);
			currentObserver.observe(target);
		}

		return () => {
			if (target) {
				listenerCallbacks.delete(target);
				currentObserver.unobserve(target);
			}
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [elem, callback, ...dependencies]);
}

export { useIntersection };
