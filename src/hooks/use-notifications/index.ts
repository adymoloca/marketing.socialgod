import { useCallback, useContext, useState } from 'react';
import NotificationsContext, { NotificationsContextType } from 'utils/context/notifications';

export interface NotificationsType {
	message: string;
	type: notifify;
}

interface UseNotificationsReturnType extends NotificationsContextType {
	notifications: NotificationsType[];
	destroy: (index: number) => void;
}

export enum notifify {
	success,
	error,
}

export function useNotificationsContext(): NotificationsContextType {
	return useContext(NotificationsContext);
}

function useNotifications(): UseNotificationsReturnType {
	const [notifications, setNotifications] = useState<NotificationsType[]>([]);

	const success = useCallback(
		(message: string) => {
			setNotifications((prev) => {
				const temp = [...prev];
				// TO REMOVE WHEN MULTIPLE NOTIFICATIONS ARE POSSIBLE
				if (temp.length) temp.splice(0);
				temp.push({ message, type: notifify.success });
				return temp;
			});
		},
		[setNotifications]
	);

	const error = useCallback(
		(message: string) => {
			setNotifications((prev) => {
				const temp = [...prev];
				// TO REMOVE WHEN MULTIPLE NOTIFICATIONS ARE POSSIBLE
				if (temp.length) temp.splice(0);
				temp.push({ message, type: notifify.error });
				return temp;
			});
		},
		[setNotifications]
	);

	const destroy = useCallback(
		(index: number) => {
			setNotifications((prev) => {
				const temp = [...prev];
				temp.splice(index, 1);
				return temp;
			});
		},
		[setNotifications]
	);

	return { notifications, success, error, destroy };
}

export default useNotifications;
