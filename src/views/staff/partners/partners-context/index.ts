import React from 'react';
import { stateSetter } from 'utils/types/state';
import { IPartnersValueProps, IPartner } from 'hooks/fetch-hooks/use-partners/index.actions';

interface PartnersContextType<V = IPartner[]> {
	postPartner: (params: IPartnersValueProps) => void;
	update: (params: IPartnersValueProps, partnerId: string) => void;
	setter: stateSetter<V>;
	loadingPartner: string;
}

const PartnersContext = React.createContext<PartnersContextType>({
	postPartner: () => {},
	update: () => {},
	setter: () => {},
	loadingPartner: '',
});

export default PartnersContext;
