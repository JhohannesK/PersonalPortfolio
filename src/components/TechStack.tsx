import { useEffect, useRef, useState } from 'react';

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
	'Reactjs',
	'Nextjs',
	'Django',
	'Prisma',
	'TailwindCss',
	'.Net',
	'Express',
];

function useTypewriter(lines: string[], startDelay: number, isVisible: boolean) {
	const [displayedLines, setDisplayedLines] = useState<string[]>([]);
	const [currentLine, setCurrentLine] = useState(0);
	const [currentChar, setCurrentChar] = useState(0);
	const [started, setStarted] = useState(false);

	useEffect(() => {
		if (isVisible && !started) setStarted(true);
	}, [isVisible, started]);

	useEffect(() => {
		if (!started) return;

		const delayTimer = setTimeout(() => {
			if (currentLine >= lines.length) return;

			const timer = setTimeout(
				() => {
					const line = lines[currentLine];
					if (currentChar < line.length) {
						setDisplayedLines((prev) => {
							const copy = [...prev];
							copy[currentLine] = line.slice(0, currentChar + 1);
							return copy;
						});
						setCurrentChar((c) => c + 1);
					} else {
						setCurrentLine((l) => l + 1);
						setCurrentChar(0);
						setDisplayedLines((prev) => [...prev, '']);
					}
				},
				currentChar === 0 ? 80 : 25
			);

			return () => clearTimeout(timer);
		}, startDelay);

		return () => clearTimeout(delayTimer);
	}, [started, currentLine, currentChar, lines, startDelay]);

	return { displayedLines, isDone: currentLine >= lines.length };
}

function TerminalWindow({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className='rounded-lg border border-white/10 overflow-hidden bg-[#0d1117] shadow-2xl shadow-black/50 w-full'>
			{/* Title bar */}
			<div className='flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-white/10'>
				<div className='flex gap-1.5'>
					<div className='w-3 h-3 rounded-full bg-[#ff5f57]' />
					<div className='w-3 h-3 rounded-full bg-[#febc2e]' />
					<div className='w-3 h-3 rounded-full bg-[#28c840]' />
				</div>
				<span className='text-xs text-gray-500 ml-2 font-Source-code'>
					{title}
				</span>
			</div>
			{/* Terminal body */}
			<div className='p-4 font-Source-code text-sm leading-relaxed min-h-[280px] overflow-x-auto'>
				{children}
			</div>
		</div>
	);
}

function TerminalLine({
	text,
	isTyping,
}: {
	text: string;
	isTyping: boolean;
}) {
	if (!text && !isTyping) return null;

	const colorize = (line: string) => {
		if (line.startsWith('$')) {
			return (
				<>
					<span className='text-green-400'>$ </span>
					<span className='text-white'>{line.slice(2)}</span>
				</>
			);
		}
		if (line.startsWith('//')) {
			return <span className='text-gray-600'>{line}</span>;
		}
		if (line.startsWith('→')) {
			return <span className='text-yellow-300'>{line}</span>;
		}
		if (line.includes('=>')) {
			const [before, after] = line.split('=>');
			return (
				<>
					<span className='text-purple-400'>{before}</span>
					<span className='text-white'>=&gt;</span>
					<span className='text-emerald-400'>{after}</span>
				</>
			);
		}
		if (line.startsWith('[') && line.includes(']')) {
			const bracket = line.indexOf(']');
			return (
				<>
					<span className='text-cyan-400'>
						{line.slice(0, bracket + 1)}
					</span>
					<span className='text-gray-300'>
						{line.slice(bracket + 1)}
					</span>
				</>
			);
		}
		if (line.startsWith('  ├') || line.startsWith('  └')) {
			const parts = line.split(' ');
			const prefix = parts.slice(0, 2).join(' ');
			const rest = parts.slice(2).join(' ');
			return (
				<>
					<span className='text-gray-600'>{prefix} </span>
					<span className='text-yellow-300'>{rest}</span>
				</>
			);
		}
		return <span className='text-gray-300'>{line}</span>;
	};

	return (
		<div className='whitespace-pre'>
			{colorize(text)}
			{isTyping && (
				<span className='inline-block w-2 h-4 bg-yellow-300 ml-0.5 animate-pulse align-middle' />
			)}
		</div>
	);
}

const TechStack = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setIsVisible(true);
			},
			{ threshold: 0.3 }
		);
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);

	const langLines = [
		'$ cat languages.config',
		'// domeh.sh — languages',
		'',
		'[languages]',
		`  ├── ${languages.slice(0, 4).join(', ')}`,
		`  └── ${languages.slice(4).join(', ')}`,
		'',
		`→ ${languages.length} languages loaded`,
	];

	const fwLines = [
		'$ cat frameworks.config',
		'// domeh.sh — frameworks & tools',
		'',
		'[frameworks]',
		`  ├── ${frameworks.slice(0, 4).join(', ')}`,
		`  └── ${frameworks.slice(4).join(', ')}`,
		'',
		`→ ${frameworks.length} frameworks loaded`,
	];

	const langTypewriter = useTypewriter(langLines, 0, isVisible);
	const fwTypewriter = useTypewriter(fwLines, 200, isVisible);

	return (
		<div className='mt-12 p-5'>
			<p className='text-5xl text-center font-bold font-Maconda uppercase tracking-wider'>
				Tech Stack
			</p>
			<p className='text-center text-gray-500 text-xs mt-2 font-Source-code mb-8'>
				~/domeh/.config
			</p>
			<section
				ref={sectionRef}
				className='flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto'
			>
				<TerminalWindow title='domeh@dev: ~/languages'>
					{langTypewriter.displayedLines.map((line, i) => (
						<TerminalLine
							key={i}
							text={line}
							isTyping={
								!langTypewriter.isDone &&
								i === langTypewriter.displayedLines.length - 1
							}
						/>
					))}
				</TerminalWindow>

				<TerminalWindow title='domeh@dev: ~/frameworks'>
					{fwTypewriter.displayedLines.map((line, i) => (
						<TerminalLine
							key={i}
							text={line}
							isTyping={
								!fwTypewriter.isDone &&
								i === fwTypewriter.displayedLines.length - 1
							}
						/>
					))}
				</TerminalWindow>
			</section>
		</div>
	);
};

export default TechStack;
