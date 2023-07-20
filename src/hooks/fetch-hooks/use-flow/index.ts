import { useCallback, useEffect, useState, DependencyList } from 'react';
import { ISendData } from 'views/staff/flows/flow-form';
import { stateSetter } from 'utils/types/state';
import { useLoaders } from 'hooks/use-loaders';
import { useNotificationsContext } from 'hooks/use-notifications';
import { addFlows, getFlowsAll, getFlowOne, updateFlow, removeFlow } from './index.actions';

export interface IFlow {
	_id: string;
	name: string;
	typeDescriptions: string[];
}
export interface IUpdate {
	name: string;
	typeDescriptions: string[];
}

export interface FlowsReturnType<T extends IFlow | IFlow[]> {
	postFlow: (params: ISendData, id: string, platform: string) => void;
	update: (params: IUpdate, serviceId: string, flowId: string, platform: string) => void;
	getFlows: (platform: string) => void;
	getFlow: (flowId: string) => void;
	deleteFlow: (flowId: string, platform: string) => void;
	setData: stateSetter<T>;
	data: T;
	loadingFlows: boolean;
	loadingFlow: string;
}

function useFlows<T extends IFlow | IFlow[], V = IFlow[]>(
	platform: string,
	dependencies: DependencyList = [],
	setter: stateSetter<V> | undefined = undefined
): FlowsReturnType<T> {
	const [data, setData] = useState<T | null>(null);
	const [[loadingFlows, loadingFlow], toggleLoading] = useLoaders<[boolean, string]>(false, '');
	const toggleLoadGet = useCallback((val: boolean | undefined = undefined) => toggleLoading(0, val), [toggleLoading]);
	const toggleLoadFlow = (val: string | undefined = undefined): void => toggleLoading(1, val);
	const { success, error } = useNotificationsContext();

	const getFlows = useCallback(
		async (p: string) => {
			try {
				toggleLoadGet(true);
				const response = await getFlowsAll(p);
				if (typeof setter === 'function') setter(response as V);
				else setData(response as T);
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoadGet(false);
			}
		},
		// eslint-disable-next-line
		[setData, toggleLoadGet]
	);

	const getFlow = useCallback(
		async (flowId: string) => {
			try {
				toggleLoadFlow(flowId);
				const response = await getFlowOne(flowId);
				setData(response as T);
			} catch (message) {
				console.error(message);
			} finally {
				toggleLoadFlow('');
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const deleteFlow = useCallback(
		async (flowId: string) => {
			try {
				toggleLoadFlow(flowId);
				await removeFlow(flowId);
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as IFlow[]).filter((flow) => flow._id !== flowId);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Flow deleted successfully.');
			} catch (message) {
				console.error(message);
				error('Flow deleted failed.');
			} finally {
				toggleLoadFlow();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const postFlow = useCallback(
		async (params: ISendData, id: string) => {
			try {
				toggleLoadFlow('post-update-flow');
				const response = await addFlows(params, id);
				setData((prev) => {
					if (prev !== null) {
						const temp = [...(prev as IFlow[])];
						temp?.push(response.flow);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Flow added successfully.');
			} catch (message) {
				console.error(message);
				error('Flow added failed.');
			} finally {
				toggleLoadFlow();
			}
		},
		// eslint-disable-next-line
		[setData]
	);

	const update = useCallback(
		async (params: IUpdate, serviceId: string, flowId: string) => {
			try {
				toggleLoadFlow('post-update-flow');
				await updateFlow(params, serviceId, flowId);
				setData((prev) => {
					if (prev !== null) {
						const temp = (prev as IFlow[]).map((flow) =>
							flow._id === flowId ? { ...flow, ...params } : flow
						);
						return temp as T;
					}
					return [] as unknown as T;
				});
				success('Flow updated successfully.');
			} catch (message) {
				console.error(message);
				error('Flow updated failed.');
			} finally {
				toggleLoadFlow();
			}
		},
		// eslint-disable-next-line
		[setData]
	);
	useEffect(() => {
		platform && getFlows(platform);
		// eslint-disable-next-line
	}, dependencies);

	return {
		setData: setData as stateSetter<T>,
		data: data || ([] as IFlow[] as T),
		postFlow,
		getFlows,
		getFlow,
		update,
		deleteFlow,
		loadingFlows,
		loadingFlow,
	};
}

export default useFlows;
