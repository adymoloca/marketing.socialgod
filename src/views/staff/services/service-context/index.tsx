import React from 'react';
import { stateSetter } from 'utils/types/state';
import { IParams, IService } from 'hooks/fetch-hooks/use-service';

interface ServicesContextType<V = IService[]> {
	postServices: (params: IParams) => void;
	update: (params: IParams, serviceId: string) => void;
	setter: stateSetter<V>;
	loadingService: string;
}

const ServicesContext = React.createContext<ServicesContextType>({
	postServices: () => {},
	update: () => {},
	setter: () => {},
	loadingService: '',
});

export default ServicesContext;
