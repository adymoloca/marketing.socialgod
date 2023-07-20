import React from 'react';
import { IUpdate } from 'hooks/fetch-hooks/use-flow';
import { ISendData } from '../flow-form';

interface FlowsContextType {
	postFlow: (params: ISendData, id: string, platform: string) => void;
	update: (params: IUpdate, serviceId: string, flowId: string, platform: string) => void;
	loadingFlow: string | undefined;
}

const FlowsContext = React.createContext<FlowsContextType>({
	postFlow: () => {},
	update: () => {},
	loadingFlow: '',
});

export default FlowsContext;
