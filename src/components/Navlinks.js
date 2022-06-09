import React, { useState } from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { VscPerson } from 'react-icons/vsc'
import { Link } from 'react-scroll'
import { AiOutlineProject } from 'react-icons/ai'
import { MdOutlineContactSupport } from 'react-icons/md'


const nav = [
      {
            offset: 0,
            icon: <BiHomeAlt />,
            name: 'Home',
            to: 'hero'
      },
      {
            offset: 100,
            icon: <VscPerson />,
            name: 'About',
            to: 'about'
      },
      {
            offset: 50,
            icon: <AiOutlineProject />,
            name: 'Project',
            to: 'projects',

      },
      {
            offset: 50,
            icon: <MdOutlineContactSupport />,
            name: 'Contact',
            to: 'contact'
      }

]

const Header = () => {
      const [iconState, setIconState] = useState({
            activeObject: null,
            objects: nav,
      })

      function toggleActive(index) {
            setIconState({ ...iconState, activeObject: iconState.objects[index] })
      }

      function toggleActiveIcon(index) {
            if (iconState.objects[index] === iconState.activeObject) {
                  return "icon -translate-y-10 opacity-0"
            } else {
                  return "icon"
            }
      }

      function toggleActiveName(index) {
            if (iconState.objects[index] === iconState.activeObject) {
                  return "text translate-y-5"
            } else {
                  return "text opacity-0"
            }
      }

      return (
            <div className=''>
                  <nav className='fixed bottom-[2rem] left-[50%]  [transform:translateX(-50%)] flex items-center  text-yellow-300 w-[360px] h-20 bg-zinc-700  bg-opacity-30 z-10 rounded-full px-5 '>

                        <div className=" flex item-center justify-center  uppercase font-bold text-sm pl-12 font-mono w-full">


                              {nav.map((item, index) => {
                                    return (
                                          <div key={index} className='flex flex-col items-center pr-12 justify-center'>
                                                <Link activeClass="active" to={item.to} spy={true} smooth={true} offset={item.offset} duration={700} className="cursor-pointer flex items-center justify-center">
                                                      <div onClick={() => { toggleActive(index) }} className={toggleActiveIcon(index)}>
                                                            {item.icon}
                                                      </div>
                                                </Link>
                                                <span className={toggleActiveName(index)}>{item.name} </span>
                                          </div>
                                    )
                              })}

                        </div>
                  </nav >
            </div >
      )
}

export default Header