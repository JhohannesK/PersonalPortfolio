import { useTheme } from '../../util/theme';

const Header = () => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === 'dark';

	return (
		<header className="site-header flex items-center justify-between gap-4 px-5 py-5 sm:px-8">
			<p className="font-medium tracking-wide text-accent-soft text-2xl">
				<code>
					{'<'}Domeh.<span className="text-red-500">sh</span>
					{'/>'}
				</code>
			</p>

			<button
				type="button"
				onClick={toggleTheme}
				className="theme-toggle"
				aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
				title={isDark ? 'Light mode' : 'Dark mode'}
			>
				<span className="theme-toggle-track" aria-hidden>
					<span className={`theme-toggle-thumb ${isDark ? 'theme-toggle-thumb--dark' : 'theme-toggle-thumb--light'}`}>
						{isDark ? (
							<svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
								<path d="M6 0a1 1 0 0 1 .993.883L7 1v1a1 1 0 0 1-1.993.117L5 2V1a1 1 0 0 1 1-1Zm5.657 2.343a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM1 6a1 1 0 0 1 .117 1.993L1 8H0a1 1 0 0 1-.117-1.993L0 6h1Zm15 0a1 1 0 0 1 .117 1.993L16 8h-1a1 1 0 0 1-.117-1.993L15 6h1ZM3.05 11.95a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414Zm8.486 0a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 11a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
							</svg>
						) : (
							<svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
								<path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
							</svg>
						)}
					</span>
				</span>
			</button>
		</header>
	);
};

export default Header;
