import React from 'react';
import { GrLocation, GrMailOption, GrPhone } from 'react-icons/gr';
import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs';

const Contact = () => {
	return (
		<div id='contact' className='bg-gray-400 text-gray-800'>
			<p className='text-5xl font-bold text-center pt-5 font-Maconda uppercase tracking-wider'>
				Contact
			</p>

			{/* REVIEW: Making design responsive. */}

			<main className='flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between px-[15rem]'>
				{/* Start of container for location, email and phone */}
				<div className='pt-5 pb-16 flex flex-col gap-y-5'>
					{/* Location */}
					<div className='flex items-center gap-x-3'>
						<div className='contact-icon'>
							<GrLocation className='text-2xl hover:animate-bounce' />
						</div>
						<div>
							<p className='text-3xl'>Location: </p>
							<p className='font-Exo text-white'>
								Alajo, Paradise Street, Accra
							</p>
						</div>
					</div>

					{/* Email */}
					<div className='flex items-center gap-x-3'>
						<div className='contact-icon'>
							<GrMailOption className='text-2xl hover:animate-bounce' />
						</div>
						<div>
							<p className='text-3xl'>Email: </p>
							<p className='font-Exo text-white'>jdomeh77@gmail.com</p>
						</div>
					</div>

					{/* Phone Number */}
					<div className='flex items-center gap-x-3'>
						<div className='contact-icon'>
							<GrPhone className='text-2xl hover:animate-bounce' />
						</div>
						<div>
							<p className='text-3xl'>Phone: </p>
							<p className='font-Exo text-white'>+233 559 603 060</p>
						</div>
					</div>
				</div>
				{/* End */}

				{/* Start for social media container */}
				<div className='text-3xl flex items-center justify-center gap-x-12'>
					<BsFacebook className='social1 ' />
					<BsTwitter className='social2 ' />
					<BsLinkedin className='social3 ' />
				</div>
				{/* End */}
			</main>
		</div>
	);
};

export default Contact;
