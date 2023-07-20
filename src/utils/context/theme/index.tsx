import { createContext } from 'react';

export type themeMode = 'dark' | 'light';

export interface ThemeContextType {
	themeMode: themeMode;
	toggleThemeMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
	themeMode: 'dark',
	toggleThemeMode: () => {},
});

export default ThemeContext;
