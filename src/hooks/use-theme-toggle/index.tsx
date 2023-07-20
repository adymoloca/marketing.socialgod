import useLocalStorage from 'hooks/use-local-storage';
import { useCallback, useContext } from 'react';
import ThemeContext, { ThemeContextType, themeMode } from 'utils/context/theme';

function useThemeContext(): ThemeContextType {
	return useContext(ThemeContext);
}

function useThemeToggle(): readonly [theme: themeMode, toggle: () => void] {
	const [theme, setTheme] = useLocalStorage<themeMode>('themeMode', 'light');

	const toggleTheme = useCallback(() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')), [setTheme]);

	return [theme ?? 'light', toggleTheme] as const;
}

export { useThemeContext };
export default useThemeToggle;
