import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-orange-700 text-white py-4'>
        <div className='logo cursor-pointer '>
          <span className='font-bold text-xl mx-10  hover:text-zinc-950 max-sm:text-sm  '>
            &lt;<span className='text-zinc-950  hover:text-white max-sm:text-sm'>iTask</span>/&gt;
            </span>
        </div>
        <ul className="flex gap-7 mx-10 ">
            <li className='cursor-pointer hover:text-zinc-950 transition-all max-sm:text-sm '>Home</li>
            <li className='cursor-pointer  hover:text-zinc-950 transition-all max-sm:text-sm '>Notes</li>
        </ul>
    </nav>
  )
}

export default Navbar
