import { Alert, IconButton, Snackbar } from '@mui/material';
import { NotificationsType } from 'hooks/use-notifications';
import { FC, Fragment, ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { uuid } from 'utils/functions';

interface NotificationsRendererProps {
	notifications: NotificationsType[];
	destroy: (index: number) => void;
}

const action = (callback: () => void): ReactNode => (
	<IconButton size='small' aria-label='close' color='inherit' onClick={callback}>
		<CloseIcon fontSize='small' />
	</IconButton>
);

const NotificationsRenderer: FC<NotificationsRendererProps> = ({ notifications = [], destroy }) => {
	if (!notifications.length) return null;

	return (
		<>
			{notifications.map((el, index) => (
				<Fragment key={uuid()}>
					<Snackbar
						anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
						open={!!el.message}
						autoHideDuration={5000}
						onClose={(): void => destroy(index)}>
						<Alert severity={el.type === 0 ? 'success' : 'error'} action={action(() => destroy(index))}>
							{el.message}
						</Alert>
					</Snackbar>
				</Fragment>
			))}
		</>
	);
};

export default NotificationsRenderer;
