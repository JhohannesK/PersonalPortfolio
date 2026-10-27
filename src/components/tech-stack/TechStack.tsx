import React from 'react';
import { FollowerPointerCard } from '../ui/following-pointer';

function TerminalPointerTitle() {
	return (
		<span className="flex items-center gap-2 font-mono">
			<span
				className="h-1.5 w-1.5 rounded-full bg-emerald-400"
				aria-hidden="true"
			/>
			kelvin@portfolio
		</span>
	);
}

const TechStack = () => {
	const languages = [
		'Python',
		'JavaScript',
		'TypeScript',
		'HTML5',
		'CSS3',
		'Java',
		'Golang',
		'C#',
	];

	const frameworks = [
		'React',
		'Next.js',
		'Django',
		'Prisma',
		'Tailwind CSS',
		'.NET',
		'Express',
	];

	const tools = ['Git', 'Docker', 'Vite', 'Figma', 'Postman', 'Linux'];

	return (
		<section
			id="stack"
			className="relative z-10 mt-16 px-5 md:mt-20"
		>
			<p className="text-center text-5xl font-bold uppercase tracking-wider">
				<span className="contact-headline-shimmer">Tech Stack</span>
			</p>

			<div className="mx-auto mt-8 max-w-5xl">
				<FollowerPointerCard title={<TerminalPointerTitle />}>
					<div className="terminal-window font-Source-code">
						<div className="terminal-top">
					<div className="terminal-lights">
						<span className="terminal-light bg-red-500" />
						<span className="terminal-light bg-yellow-400" />
						<span className="terminal-light bg-green-500" />
					</div>
					<p className="text-xs text-zinc-400">/usr/portfolio/skills</p>
				</div>

				<div className="terminal-body">
					<div className="terminal-row">
						<span className="terminal-prompt">kelvin@portfolio:~$</span>
						<span className="text-zinc-200">./stack --list languages</span>
					</div>
					<ul className="terminal-output">
						{languages.map((language, index) => {
							return (
								<li key={language}>
									<span className="text-zinc-500">{index + 1}.</span> {language}
								</li>
							);
						})}
					</ul>

					<div className="terminal-row pt-5">
						<span className="terminal-prompt">kelvin@portfolio:~$</span>
						<span className="text-zinc-200">./stack --list frameworks</span>
					</div>
					<ul className="terminal-output">
						{frameworks.map((framework, index) => {
							return (
								<li key={framework}>
									<span className="text-zinc-500">{index + 1}.</span>{' '}
									{framework}
								</li>
							);
						})}
					</ul>

					<div className="terminal-row pt-5">
						<span className="terminal-prompt">kelvin@portfolio:~$</span>
						<span className="text-zinc-200">./stack --list tools</span>
					</div>
					<ul className="terminal-output">
						{tools.map((tool, index) => {
							return (
								<li key={tool}>
									<span className="text-zinc-500">{index + 1}.</span> {tool}
								</li>
							);
						})}
					</ul>

					<div className="terminal-row pt-5">
						<span className="terminal-prompt">kelvin@portfolio:~$</span>
						<span className="terminal-cursor">_</span>
					</div>
					</div>
				</div>
				</FollowerPointerCard>
			</div>
		</section>
	);
};

export default TechStack;
