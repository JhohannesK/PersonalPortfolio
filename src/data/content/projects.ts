export interface Project {
	id: number;
	title: string;
	description: string;
	tech: string[];
	github?: string;
	live?: string;
	color: string;
}

export const projects: Project[] = [
	{
		id: 1,
		title: 'E-Commerce Platform',
		description:
			'Full-stack e-commerce app with cart, payments, and admin dashboard built with Next.js and Prisma.',
		tech: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind'],
		github: 'https://github.com/jhohannesK',
		live: '#',
		color: '#f59e0b',
	},
	{
		id: 2,
		title: 'Task Management API',
		description:
			'RESTful API with authentication, role-based access control, and real-time notifications.',
		tech: ['Go', 'PostgreSQL', 'Docker', 'Redis'],
		github: 'https://github.com/jhohannesK',
		live: '#',
		color: '#3b82f6',
	},
	{
		id: 3,
		title: 'Real-time Chat App',
		description:
			'WebSocket-powered chat application with rooms, typing indicators, and message persistence.',
		tech: ['React', 'Express', 'Socket.io', 'MongoDB'],
		github: 'https://github.com/jhohannesK',
		live: '#',
		color: '#10b981',
	},
	{
		id: 4,
		title: 'Portfolio CMS',
		description:
			'Headless CMS for managing portfolio content with a custom admin panel and API.',
		tech: ['Django', 'Python', 'React', 'PostgreSQL'],
		github: 'https://github.com/jhohannesK',
		live: '#',
		color: '#8b5cf6',
	},
	{
		id: 5,
		title: 'DevOps Dashboard',
		description:
			'Monitoring dashboard for CI/CD pipelines, server health, and deployment tracking.',
		tech: ['.NET', 'C#', 'React', 'Docker'],
		github: 'https://github.com/jhohannesK',
		live: '#',
		color: '#ef4444',
	},
	{
		id: 6,
		title: 'AI Code Reviewer',
		description:
			'Automated code review tool that analyzes PRs and provides suggestions using ML models.',
		tech: ['Python', 'FastAPI', 'TypeScript', 'OpenAI'],
		github: 'https://github.com/jhohannesK',
		live: '#',
		color: '#ec4899',
	},
];
