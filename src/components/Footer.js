import React from 'react';

// TODO: Try and add some few things to the footer.

const Footer = () => {
	return (
		<footer
			id="footer"
			className="flex flex-col items-center justify-center gap-y-2"
		>
			<div className="flex flex-col  gap-4 py-6 items-center justify-around w-full md:px-28 md:flex-row md:border-t md:bg-gray-900">
				<div>
					<span className="text-yellow-300 text-xs">
						Domeh John Kelvin
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
