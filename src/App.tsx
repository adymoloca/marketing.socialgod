import './App.css';
import { FC, Suspense, useMemo } from 'react';
import theme from 'utils/config/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Views from 'views';
import NotificationsContext from 'utils/context/notifications';
import useNotifications from 'hooks/use-notifications';
import NotificationsRenderer from 'components/common/notifications-renderer';
import useThemeToggle from 'hooks/use-theme-toggle';
import ThemeContext from 'utils/context/theme';

const App: FC = () => {
	const { notifications, success, error, destroy } = useNotifications();
	const [themeMode, toggleThemeMode] = useThemeToggle();
	const themeContext = useMemo(() => ({ themeMode, toggleThemeMode }), [themeMode, toggleThemeMode]);
	const notificationContext = useMemo(() => ({ success, error }), [success, error]);

	return (
		<Suspense fallback='Loading...'>
			<div className='App'>
				<ThemeProvider theme={theme[themeMode]}>
					<ThemeContext.Provider value={themeContext}>
						<CssBaseline />
						<NotificationsRenderer notifications={notifications} destroy={destroy} />
						<NotificationsContext.Provider value={notificationContext}>
							<Views />
						</NotificationsContext.Provider>
					</ThemeContext.Provider>
				</ThemeProvider>
			</div>
		</Suspense>
	);
};

export default App;
