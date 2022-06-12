import React from 'react';

// FIXME: Try to design it to make it look like <Domeh.sh />

const Header = () => {
	return (
		<div className="flex items-center justify-center text-2xl p-5">
			<p className="font-Source-code text-yellow-400 tracking-wide font-semibold">
				<code>
					Domeh.<span className="text-red-500">sh</span>
				</code>
			</p>
		</div>
	);
};

export default Header;
