import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

function readStoredTheme(): Theme | null {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		if (value === 'dark' || value === 'light') return value;
	} catch {
		/* private mode / denied */
	}
	return null;
}

/** Prefer stored theme; else dark (product default). */
export function resolveTheme(): Theme {
	const stored = readStoredTheme();
	if (stored) return stored;
	return 'dark';
}

export function applyTheme(theme: Theme) {
	const root = document.documentElement;
	root.classList.remove('dark', 'light');
	root.classList.add(theme);
	root.style.colorScheme = theme;
}

type ThemeContextValue = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
	theme: 'dark',
	setTheme: () => {},
	toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof document !== 'undefined') {
			if (document.documentElement.classList.contains('light')) return 'light';
			if (document.documentElement.classList.contains('dark')) return 'dark';
		}
		return resolveTheme();
	});

	useEffect(() => {
		applyTheme(theme);
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			/* ignore */
		}
	}, [theme]);

	const setTheme = (next: Theme) => setThemeState(next);
	const toggleTheme = () =>
		setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
