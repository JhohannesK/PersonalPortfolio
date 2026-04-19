import { Link } from 'react-scroll';
import { FaArrowUp } from 'react-icons/fa';

const footerLinks = [
	{ to: 'hero', label: 'Home', offset: 0 },
	{ to: 'about', label: 'About', offset: 100 },
	{ to: 'projects', label: 'Projects', offset: 150 },
	{ to: 'stack', label: 'Stack', offset: 130 },
	{ to: 'contact', label: 'Contact', offset: 200 },
] as const;

const Footer = () => {
	return (
		<footer id='footer' className='site-footer relative mt-6'>
			<div className='site-footer-ambient' aria-hidden />
			<div className='site-footer-noise' aria-hidden />

			<div className='site-footer-inner relative mx-auto max-w-6xl px-5 pb-8 pt-14 md:pb-10 md:pt-16'>
				<div className='site-footer-topline' aria-hidden />

				<div className='flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10'>
					<div className='site-footer-brand max-w-md'>
						<p className='font-mono text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-yellow-300/85'>
							Portfolio
						</p>
						<p className='mt-3 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl'>
							Domeh John Kelvin
						</p>
						<p className='mt-2 text-sm leading-relaxed text-zinc-500 md:text-[0.95rem]'>
							Full-stack &amp; frontend craft — shipping interfaces that feel as good
							as they look.
						</p>
					</div>

					<nav
						className='site-footer-nav flex flex-wrap gap-x-1 gap-y-2'
						aria-label='Footer'
					>
						{footerLinks.map(({ to, label, offset }) => (
							<Link
								key={to}
								to={to}
								spy
								smooth
								offset={offset}
								duration={700}
								href={`#${to}`}
								className='site-footer-nav-link'
							>
								{label}
							</Link>
						))}
					</nav>
				</div>

				<div className='site-footer-bottom mt-12 flex flex-col items-start justify-between gap-6 border-t border-zinc-800/90 pt-8 sm:flex-row sm:items-center'>
					<p className='font-Source-code text-xs text-zinc-500'>
						<span className='text-zinc-400'>© {new Date().getFullYear()}</span>
						{' · '}
						<span className='text-zinc-500'>Built with care</span>
					</p>

					<Link
						to='hero'
						smooth
						offset={0}
						duration={600}
						href='#hero'
						className='site-footer-top'
					>
						<span>Back to top</span>
						<span className='site-footer-top-icon' aria-hidden>
							<FaArrowUp className='text-sm' />
						</span>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
