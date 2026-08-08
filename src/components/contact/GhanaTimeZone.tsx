import { useEffect, useState } from 'react';

const TIME_ZONE = 'Africa/Accra';

type ClockParts = {
	hours: number;
	minutes: number;
	seconds: number;
	digital: string;
};

function getGhanaTime(now = new Date()): ClockParts {
	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: TIME_ZONE,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hourCycle: 'h23',
	}).formatToParts(now);

	const pick = (type: Intl.DateTimeFormatPartTypes) =>
		Number(parts.find((p) => p.type === type)?.value ?? 0);

	const hours = pick('hour');
	const minutes = pick('minute');
	const seconds = pick('second');

	return {
		hours,
		minutes,
		seconds,
		digital: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
	};
}

const GhanaTimeZone = () => {
	const [clock, setClock] = useState<ClockParts>(() => getGhanaTime());

	useEffect(() => {
		const tick = () => setClock(getGhanaTime());
		tick();
		const id = window.setInterval(tick, 1000);
		return () => window.clearInterval(id);
	}, []);

	const hourAngle =
		((clock.hours % 12) + clock.minutes / 60 + clock.seconds / 3600) * 30;
	const minuteAngle = (clock.minutes + clock.seconds / 60) * 6;
	const secondAngle = clock.seconds * 6;

	const hourMarks = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

	return (
		<div
			className="ghana-tz mx-auto mt-8 flex w-full max-w-md items-center gap-5 sm:gap-6"
			aria-live="polite"
			aria-atomic="true"
		>
			<svg
				viewBox="0 0 120 120"
				className="ghana-tz-face h-[5.5rem] w-[5.5rem] shrink-0 sm:h-[6.25rem] sm:w-[6.25rem]"
				role="img"
				aria-label={`Analog clock showing ${clock.digital} in Ghana`}
			>
				<defs>
					<radialGradient id="ghana-tz-dial" cx="50%" cy="40%" r="65%">
						<stop offset="0%" stopColor="var(--clock-dial-hi)" />
						<stop offset="100%" stopColor="var(--clock-dial-lo)" />
					</radialGradient>
				</defs>
				<circle
					cx="60"
					cy="60"
					r="56"
					fill="url(#ghana-tz-dial)"
					stroke="var(--clock-ring)"
					strokeWidth="1.5"
				/>
				<circle
					cx="60"
					cy="60"
					r="48"
					fill="none"
					stroke="var(--clock-inner-ring)"
					strokeWidth="0.75"
					opacity="0.55"
				/>
				{hourMarks.map((n, i) => {
					const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
					const outer = 50;
					const inner = n % 3 === 0 ? 44 : 46.5;
					const x1 = 60 + Math.cos(angle) * inner;
					const y1 = 60 + Math.sin(angle) * inner;
					const x2 = 60 + Math.cos(angle) * outer;
					const y2 = 60 + Math.sin(angle) * outer;
					return (
						<line
							key={n}
							x1={x1}
							y1={y1}
							x2={x2}
							y2={y2}
							stroke={n % 3 === 0 ? 'var(--clock-tick-strong)' : 'var(--clock-tick)'}
							strokeWidth={n % 3 === 0 ? 2 : 1.2}
							strokeLinecap="round"
						/>
					);
				})}
				{[
					{ label: '12', x: 60, y: 22 },
					{ label: '3', x: 98, y: 64 },
					{ label: '6', x: 60, y: 106 },
					{ label: '9', x: 22, y: 64 },
				].map(({ label, x, y }) => (
					<text
						key={label}
						x={x}
						y={y}
						textAnchor="middle"
						dominantBaseline="middle"
						fill="var(--clock-numeral)"
						fontSize="11"
						fontWeight="600"
						fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
					>
						{label}
					</text>
				))}
				<line
					x1="60"
					y1="60"
					x2="60"
					y2="36"
					stroke="var(--clock-hand)"
					strokeWidth="3.4"
					strokeLinecap="round"
					transform={`rotate(${hourAngle} 60 60)`}
				/>
				<line
					x1="60"
					y1="60"
					x2="60"
					y2="26"
					stroke="var(--clock-hand)"
					strokeWidth="2.4"
					strokeLinecap="round"
					transform={`rotate(${minuteAngle} 60 60)`}
				/>
				<line
					x1="60"
					y1="68"
					x2="60"
					y2="22"
					stroke="var(--accent)"
					strokeWidth="1.35"
					strokeLinecap="round"
					transform={`rotate(${secondAngle} 60 60)`}
				/>
				<circle cx="60" cy="60" r="3.4" fill="var(--clock-hand)" />
				<circle cx="60" cy="60" r="1.6" fill="var(--accent)" />
				<circle
					cx="60"
					cy="22"
					r="2.2"
					fill="var(--accent)"
					transform={`rotate(${secondAngle} 60 60)`}
				/>
			</svg>

			<div className="min-w-0 flex-1 text-left sm:text-right">
				<p className="ghana-tz-kicker text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
					Time zone · GMT
				</p>
				<p className="ghana-tz-title mt-1 text-base font-semibold tracking-tight sm:text-lg">
					Time in Ghana
				</p>
				<p className="ghana-tz-digital mt-0.5 text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">
					{clock.digital}
				</p>
			</div>
		</div>
	);
};

export default GhanaTimeZone;
