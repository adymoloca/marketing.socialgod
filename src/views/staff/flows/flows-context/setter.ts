import React from 'react';
import { IFlow } from 'hooks/fetch-hooks/use-flow';
import { stateSetter } from 'utils/types/state';

interface SetterContextType<V = IFlow[]> {
	setter: stateSetter<V>;
}

const SetterContext = React.createContext<SetterContextType>({
	setter: () => {},
});

export default SetterContext;
