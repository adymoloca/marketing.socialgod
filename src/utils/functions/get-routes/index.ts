import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch, ReactNode } from 'react';
import { RouteObject, createRoutesFromElements } from 'react-router';
import { patchRoutes } from 'store/slices/routes';

// NOTE - use only in function components
const getRoutes = (children: ReactNode, dispatcher: Dispatch<AnyAction>): RouteObject[] => {
	const routesArr: RouteObject[] = createRoutesFromElements(children);
	const routesPaths = [];
	for (const route of routesArr) {
		if (route.path?.includes('shop') && route.children) {
			for (const inner of route.children) {
				inner.path && routesPaths.push(inner.path);
			}
		}
	}

	dispatcher(patchRoutes(routesPaths));

	return routesArr;
};

export default getRoutes;
