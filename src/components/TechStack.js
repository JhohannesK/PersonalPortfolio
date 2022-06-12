import React from 'react';

const TechStack = () => {
	return (
		<div className="mt-12 p-5">
			<div>
				<p className="text-5xl text-center font-bold font-Maconda uppercase tracking-wider">
					Tech Stack
				</p>
			</div>
			<section className="pt-5 text-2xl sm:flex sm:justify-between md:justify-around space-y-8 sm:space-y-0 font-Source-code">
				{/* Languages */}
				<div className="">
					<p>
						<span className="text-purple-700">let</span>{' '}
						<span className="text-red-600">languages</span> = [
					</p>
					<pre className="pl-12 text-yellow-400">
						<ul>
							<li>'Python'</li>
							<li>'JavaScript'</li>
							<li>'HTML5'</li>
							<li>'CSS3'</li>
							<li>'Java'</li>
							<li className="text-white">];</li>
						</ul>
					</pre>
				</div>

				{/* Frameworks */}
				<div>
					<p>
						<span className="text-purple-700">let</span>{' '}
						<span className="text-red-600">frameworks</span> = [
					</p>
					<pre className="pl-12 text-yellow-400">
						<ul>
							<li>'Reactjs'</li>
							<li>'Nextjs'</li>
							<li>'Django'</li>
							<li>'TailwindCss'</li>
							<li className="text-white">];</li>
						</ul>
					</pre>
				</div>
			</section>
		</div>
	);
};

export default TechStack;
