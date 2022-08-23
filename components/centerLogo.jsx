import Image from 'next/image';
import React, { Component } from 'react'
import logo from '../public/logo_loop_SO.gif'


const CenterLogo = () => {

        return (
            <div className='flex flex-row justify-center'>
                <div className='flex flex-col justify-center text-center'>
                    <div>
                    <div className='md:hidden'>
                        <Image  src={logo} width={124} height={110} alt="logo" / >
                    </div>
                    <div className='hidden md:block'>
                        <Image  src={logo} width={166} height={149} alt="logo" / >
                    </div>

                    </div>

                    <div translate="no" className='flex flex-row justify-center mt-2 text-3xl md:text-4xl may'>
                        <div  className='tracking-[.70em] hover:animate-bounce'>K</div>
                        <div  className='tracking-[.70em] hover:animate-bounce'>U</div>
                        <div  className='tracking-[.70em] hover:animate-bounce'>B</div>
                        <div  className='tracking-[.70em] hover:animate-bounce'>I</div>
                        <div  className='tracking-[.70em] hover:animate-bounce'>C</div>
                        <div  className='hover:animate-bounce'>S</div>
                    </div>
                </div>
            </div>
        );
}

export default CenterLogo;
