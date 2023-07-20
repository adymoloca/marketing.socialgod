import React from 'react';
import { stateSetter } from 'utils/types/state';
import { INewsletter, IParams } from 'hooks/fetch-hooks/use-newsletter/index.actions';

interface NewsletterContextType<V = INewsletter[]> {
	addNewsletter: (params: IParams) => void;
	loadingNewsletter: string;
	update: (params: IParams, newsletterId: string) => void;
	setter: stateSetter<V>;
}

const NewsletterContext = React.createContext<NewsletterContextType>({
	addNewsletter: () => {},
	update: () => {},
	setter: () => {},
	loadingNewsletter: '',
});

export default NewsletterContext;
