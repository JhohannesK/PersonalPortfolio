import hamiPreview from '../../assets/images/projects/hami-phone.webp';
import hakaloPreview from '../../assets/images/projects/hakalo@2x.webp';
import kulipaPreview from '../../assets/images/projects/kulipa@2x.webp';
import roastAndRulesPreview from '../../assets/images/projects/roast-and-rules@2x.webp';
import tipohizPreview from '../../assets/images/projects/tipohiz@2x.webp';

export interface ProjectRepoLink {
	label: string;
	href: string;
}

export type ProjectPlatform = 'web' | 'mobile' | 'hybrid';

export interface ProjectPreview {
	src: string;
	alt: string;
	/** Wide web capture or phone capture; no device chrome is drawn. */
	kind: 'browser' | 'phone';
}

export interface ProjectItem {
	title: string;
	kind: string;
	status: string;
	summary: string;
	stack: string[];
	highlights: string[];
	accent: string;
	/** Where it runs. Defaults to `web`. */
	platform?: ProjectPlatform;
	/** True when the project ships both a client and a server. */
	fullStack?: boolean;
	/** Screenshot preview. Falls back to a monogram plate when absent. */
	preview?: ProjectPreview;
	/** Public demo / deployment URL when available */
	liveUrl?: string;
	/** One or more repository links (e.g. split frontend + backend) */
	repoLinks?: ProjectRepoLink[];
}

export const projects: ProjectItem[] = [
	{
		title: 'Roast & Rules',
		kind: 'AI · Cursor rules',
		status: 'Shipped',
		summary: 'Code roasts that export Cursor rules.',
		stack: [
			'Next.js',
			'TypeScript',
			'Vercel AI SDK',
			'Anthropic Claude',
		],
		highlights: [
			'Streaming responses for long generations',
			'Exports Cursor-ready rules from your prompt or snippet',
			'Route handlers tuned for Vercel (`maxDuration` for long runs)',
		],
		accent: '#facc15',
		platform: 'web',
		preview: {
			src: roastAndRulesPreview,
			alt: 'Roast & Rules — the code input screen with format and roast-level controls.',
			kind: 'browser',
		},
		liveUrl: 'https://roast-and-rules.vercel.app',
		repoLinks: [
			{
				label: 'GitHub',
				href: 'https://github.com/JhohannesK/Roast-and-Rules',
			},
		],
	},
	{
		title: 'Hakalo',
		kind: 'Next.js site',
		status: 'Live',
		summary: 'Studio site with carousels and SWR data.',
		stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SWR'],
		highlights: [
			'Image carousels with Embla and autoplay',
			'Client-side data fetching with SWR',
			'Deployed and iterated as a long-running product surface',
		],
		accent: '#67e8f9',
		platform: 'web',
		preview: {
			src: hakaloPreview,
			alt: 'Hakalo — the opening screen with a centred wordmark and studio tagline.',
			kind: 'browser',
		},
		liveUrl: 'https://hakalo.vercel.app',
		repoLinks: [
			{ label: 'GitHub', href: 'https://github.com/JhohannesK/Hakalo' },
		],
	},
	{
		title: 'Kulipa',
		kind: 'Next.js · UI',
		status: 'Live',
		summary: 'Radix and Framer Motion banking UI.',
		stack: [
			'Next.js',
			'TypeScript',
			'Tailwind CSS',
			'Radix UI',
			'Framer Motion',
		],
		highlights: [
			'Accessible building blocks via Radix',
			'Motion-heavy interactions with Framer',
			'Continuous shipping with an active deployment target',
		],
		accent: '#a78bfa',
		platform: 'web',
		preview: {
			src: kulipaPreview,
			alt: 'Kulipa — the banking landing page with its headline and product photography.',
			kind: 'browser',
		},
		liveUrl: 'https://kulipa-eight.vercel.app',
		repoLinks: [
			{ label: 'GitHub', href: 'https://github.com/JhohannesK/Kulipa' },
		],
	},
	{
		title: 'Tipohiz',
		kind: 'Typing test · Full-stack',
		status: 'Live',
		summary: 'Typing tests with themes, WPM, and accuracy.',
		stack: [
			'Next.js',
			'React',
			'TypeScript',
			'Tailwind CSS',
			'Zustand',
			'Better Auth',
			'MongoDB',
		],
		highlights: [
			'Live WPM, accuracy, and per-character error feedback',
			'Timed modes, punctuation/numbers, and three word lists',
			'Optional Better Auth accounts with localStorage config',
		],
		accent: '#60a5fa',
		platform: 'web',
		fullStack: true,
		preview: {
			src: tipohizPreview,
			alt: 'Tipohiz — the results screen with WPM, accuracy, and a speed-by-second chart.',
			kind: 'browser',
		},
		liveUrl: 'https://tipohiz.vercel.app',
		repoLinks: [
			{ label: 'GitHub', href: 'https://github.com/JhohannesK/TipoHiZ' },
		],
	},
	{
		title: 'Fluita',
		kind: 'Social · CMS',
		status: 'Shipped',
		summary: 'Social feed with Sanity CMS and NextAuth.',
		stack: [
			'Next.js',
			'TypeScript',
			'Sanity',
			'NextAuth.js',
			'Tailwind CSS',
		],
		highlights: [
			'Portable text and structured content from Sanity',
			'Authenticated flows with NextAuth',
			'Motion and Heroicons for a polished feed experience',
		],
		accent: '#34d399',
		platform: 'web',
		repoLinks: [
			{ label: 'GitHub', href: 'https://github.com/JhohannesK/Fluita' },
		],
	},
	{
		title: 'Book tracking',
		kind: 'Full-stack',
		status: 'Active',
		summary: 'Next.js reading tracker with a FastAPI API.',
		stack: [
			'Next.js',
			'React',
			'TypeScript',
			'FastAPI',
			'Python',
			'Vitest',
			'Docker',
		],
		highlights: [
			'Split Next.js UI and FastAPI service in Docker Compose (3000 / 8000)',
			'CRUD and reading-status filters (to-read, in progress, completed)',
			'Vitest on the client; Python tests on the API',
		],
		accent: '#fb7185',
		platform: 'web',
		fullStack: true,
		repoLinks: [
			{
				label: 'GitHub',
				href: 'https://github.com/JhohannesK/book-tracking',
			},
		],
	},
	{
		title: 'Yento',
		kind: 'Inventory · Full-stack',
		status: 'In development',
		summary: 'React 19 inventory dashboard with a .NET API.',
		stack: [
			'React',
			'TypeScript',
			'Vite',
			'TanStack Query',
			'Radix UI',
			'C#',
			'Docker',
		],
		highlights: [
			'Typed forms and validation with React Hook Form + Zod',
			'Data tables and server state via TanStack Table / Query',
			'Containerized .NET backend alongside the SPA workflow',
		],
		accent: '#fdba74',
		platform: 'web',
		fullStack: true,
		repoLinks: [
			{
				label: 'Frontend',
				href: 'https://github.com/JhohannesK/Yento-FE',
			},
			{
				label: 'Backend',
				href: 'https://github.com/JhohannesK/Yento-backend',
			},
		],
	},
	{
		title: 'haMi',
		kind: 'Expo · Shop ledger',
		status: 'In development',
		summary: 'Offline-first debtor ledger for shop owners.',
		stack: [
			'Expo',
			'React Native',
			'TypeScript',
			'SQLite',
			'Supabase',
			'SheetJS',
		],
		highlights: [
			'SQLite-first ledger with optional Supabase sync',
			'PIN lock, payment promises, and local reminders',
			'GHS-native balances with Excel export',
		],
		accent: '#e879f9',
		platform: 'mobile',
		preview: {
			src: hamiPreview,
			alt: 'haMi — the shop ledger home screen showing total owed, aging balances, and customer cards.',
			kind: 'phone',
		},
		repoLinks: [
			{ label: 'GitHub', href: 'https://github.com/JhohannesK/hami' },
		],
	},
];
