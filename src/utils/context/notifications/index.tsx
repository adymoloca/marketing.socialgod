import { createContext } from 'react';

export interface NotificationsContextType {
	success: (message: string) => void;
	error: (message: string) => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
	success: () => {},
	error: () => {},
});

export default NotificationsContext;
