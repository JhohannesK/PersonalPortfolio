import React from 'react'
import { GrLocation, GrMailOption, GrPhone } from 'react-icons/gr'

const Others = () => {
      return (
            <div id='contact' className='bg-white text-gray-800'>
                  <p className='text-5xl font-bold text-center pt-5 font-Maconda uppercase tracking-wider'>Contact</p>

                  <div className='px-10 sm:px-20 pt-5 pb-16 flex flex-col gap-y-5'>

                        {/* Location */}
                        <div className='flex items-center gap-x-3'>
                              <div className='contact-icon'>
                                    <GrLocation className='text-2xl hover:animate-bounce' />
                              </div>
                              <div>
                                    <p className='text-3xl'>Location: </p>
                                    <p className='font-Exo text-gray-400'>Alajo, Paradise Street, Accra</p>
                              </div>
                        </div>

                        {/* Email */}
                        <div className='flex items-center gap-x-3'>
                              <div className='contact-icon'>
                                    <GrMailOption className='text-2xl hover:animate-bounce' />
                              </div>
                              <div>
                                    <p className='text-3xl'>Email:  </p>
                                    <p className='font-Exo text-gray-400'>jdomeh77@gmail.com</p>
                              </div>
                        </div>

                        {/* Phone Number */}
                        <div className='flex items-center gap-x-3'>
                              <div className='contact-icon'>
                                    <GrPhone className='text-2xl hover:animate-bounce' />
                              </div>
                              <div>
                                    <p className='text-3xl'>Phone:  </p>
                                    <p className='font-Exo text-gray-400'>+233 559 603 060</p>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default Others 