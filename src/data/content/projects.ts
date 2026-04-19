export interface ProjectRepoLink {
	label: string;
	href: string;
}

export interface ProjectItem {
	title: string;
	kind: string;
	status: string;
	summary: string;
	stack: string[];
	highlights: string[];
	accent: string;
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
		summary:
			'Next.js app that streams constructive “roasts” for your code and generates a `.cursor/rules` tree as Markdown, powered by the Vercel AI SDK and Anthropic Claude.',
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
		summary:
			'Production-oriented Next.js experience with Tailwind, Embla carousels, SWR-powered client fetching, and a live deployment on Vercel.',
		stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SWR'],
		highlights: [
			'Image carousels with Embla and autoplay',
			'Client-side data fetching with SWR',
			'Deployed and iterated as a long-running product surface',
		],
		accent: '#67e8f9',
		liveUrl: 'https://hakalo.vercel.app',
		repoLinks: [
			{ label: 'GitHub', href: 'https://github.com/JhohannesK/Hakalo' },
		],
	},
	{
		title: 'Kulipa',
		kind: 'Next.js · UI',
		status: 'Live',
		summary:
			'Next.js 14 app with Radix primitives, Framer Motion, and Tailwind — polished UI shipped to Vercel.',
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
		liveUrl: 'https://kulipa-eight.vercel.app',
		repoLinks: [
			{ label: 'GitHub', href: 'https://github.com/JhohannesK/Kulipa' },
		],
	},
	{
		title: 'Fluita',
		kind: 'Social · CMS',
		status: 'Shipped',
		summary:
			'Twitter-style social surface: timeline-style UI with Sanity as CMS, NextAuth for sessions, and Tailwind + Framer Motion on the client.',
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
		repoLinks: [
			{ label: 'GitHub', href: 'https://github.com/JhohannesK/Fluita' },
		],
	},
	{
		title: 'Book tracking',
		kind: 'Full-stack',
		status: 'Active',
		summary:
			'Reading-list style app with a Next.js App Router frontend, Python API service, repository-style data layer, and Docker Compose for local full-stack runs.',
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
		summary:
			'Shopping/inventory product: React 19 + Vite SPA with TanStack Query and tables on the front, ASP.NET Core inventory API and Docker packaging on the back.',
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
];
