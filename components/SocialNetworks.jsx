import Image from 'next/image';
import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { SiDiscord } from 'react-icons/si';

const SocialNetworks = () => {
    return (
        <div className='flex flex-row justify-between p-1 mb-2 w-52'>
            <a href="https://mobile.twitter.com/Kubics_NFT" target="_blank" rel="noopener noreferrer">
                <div className="text-2xl p-1 flex justify-center border border-white rounded-lg hover:shadow  hover:shadow-[#E1B649] bg-[#7094b1] text-white transition  hover:scale-110 ease-in-out  duration-300">
                    <AiOutlineTwitter />
                </div>
            </a>
            <a href="https://www.instagram.com/kubics_nft/" target="_blank" rel="noopener noreferrer">
                <div className="text-2xl p-1 flex justify-center border border-white rounded-lg hover:shadow  hover:shadow-[#E1B649] bg-[#7094b1] text-white transition  hover:scale-110 ease-in-out  duration-300">
                    <AiFillInstagram />
                </div>
            </a>
            <a href="" >
                <div className='text-2xl p-1 flex justify-center border border-white rounded-lg hover:shadow  hover:shadow-[#E1B649] bg-[#7094b1] text-white transition  hover:scale-110 ease-in-out  duration-300'>
                    <SiDiscord />
                </div>
            </a>
            <a href="https://etherscan.io/address/0x9b399a856b0016cf91c60aaae195b33738874c2b" target="_blank" rel="noopener noreferrer">
                <div className='flex p-1 flex-col items-center justify-center text-white transition  border hover:shadow-[#E1B649] border-white rounded-lg hover:shadow duration-300 ease-in-out  bg-[#7094b1] hover:scale-110'>
                    <Image src='/etherscan-logo.webp' alt='etherscan' width={24} height={24} />
                </div>
            </a>
        </div>
    );
}

export default SocialNetworks;
