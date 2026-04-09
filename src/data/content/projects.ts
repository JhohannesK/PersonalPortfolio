export interface ProjectItem {
	title: string;
	kind: string;
	status: string;
	summary: string;
	stack: string[];
	highlights: string[];
	accent: string;
}

export const projects: ProjectItem[] = [
	{
		title: 'Nebula Commerce',
		kind: 'B2B SaaS Platform',
		status: 'Production',
		summary:
			'Headless commerce workspace with role-aware analytics, dynamic pricing, and campaign orchestration.',
		stack: ['React', 'TypeScript', 'Node', 'Prisma', 'PostgreSQL'],
		highlights: [
			'Reduced checkout friction with adaptive flows',
			'Shipped real-time analytics dashboard for sales teams',
			'Implemented multi-tenant access and audit logs',
		],
		accent: '#facc15',
	},
	{
		title: 'PulseBoard Ops',
		kind: 'Incident Intelligence',
		status: 'Active Development',
		summary:
			'Monitoring cockpit for distributed systems with timeline replay and alert grouping to speed incident response.',
		stack: ['Next.js', 'Tailwind', 'Go', 'Redis', 'WebSockets'],
		highlights: [
			'Correlated noisy alerts into single incidents',
			'Added timeline playback for fast postmortems',
			'Designed command palette for keyboard-first workflows',
		],
		accent: '#67e8f9',
	},
	{
		title: 'Aether Studio',
		kind: 'Creator Workflow Tool',
		status: 'Concept to MVP',
		summary:
			'Generative content workspace that turns rough prompts into structured assets with review-ready pipelines.',
		stack: ['React', 'Python', 'FastAPI', 'Docker', 'S3'],
		highlights: [
			'Introduced async queue-based rendering pipeline',
			'Built versioned asset history with rollback',
			'Integrated one-click export bundles for teams',
		],
		accent: '#a78bfa',
	},
];
