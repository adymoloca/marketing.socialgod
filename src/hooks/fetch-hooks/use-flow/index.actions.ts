import { AxiosError } from 'axios';
import { requestAdmin } from 'utils/config/axios';
import { ISendData } from 'views/staff/flows/flow-form';
import { decryptData, encryptData } from 'utils/functions/decript';
import { IFlow, IUpdate } from '.';

async function addFlows(params: ISendData, id: string): Promise<{ flow: IFlow }> {
	try {
		const sendData = encryptData(params);
		const res = await requestAdmin.post(`/services/${id}/flows`, sendData);
		const data = decryptData(res);
		return { flow: data?.flow || {} };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to add flows.');
	}
}
async function updateFlow(params: IUpdate, serviceId: string, flowId: string): Promise<{ message: string }> {
	try {
		const sendData = encryptData(params);
		const res = await requestAdmin.patch(`/services/${serviceId}/flows/${flowId}`, sendData);
		return { message: res?.data?.message || 'Flows successfully added!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to update flow.');
	}
}

async function getFlowsAll(platform: string): Promise<IFlow[]> {
	try {
		const res = await requestAdmin.get(`flows?platform=${platform}`);
		const decryptedData = decryptData(res);
		const data = decryptedData as { flows: IFlow[] };
		return data?.flows || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get flows.');
	}
}
async function removeFlow(flowId: string): Promise<{ data: IFlow[]; message: string }> {
	try {
		const res = await requestAdmin.delete(`flows/${flowId}`);
		const data = res?.data as { flow: IFlow[] };
		return { data: data?.flow || [], message: 'Flows successfully removed!' };
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to remove flow.');
	}
}

async function getFlowOne(flowId: string): Promise<IFlow[]> {
	try {
		const res = await requestAdmin.get(`flows/${flowId}`);
		const decryptedData = decryptData(res);
		const data = decryptedData as { flow: IFlow[] };
		return data?.flow || [];
	} catch (e) {
		const error = e as AxiosError;
		const data = error.response?.data as { error: string };
		throw new Error(data?.error || 'Failed to get flow.');
	}
}

export { addFlows, getFlowsAll, updateFlow, getFlowOne, removeFlow };
