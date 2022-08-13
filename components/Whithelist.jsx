import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import kubicsWhitelist from "../artifacts/kubicsWhitelist.json";

export default function Whitelist() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [signer, setSigner] = useState(undefined);

  const contractAddress = "0x4BA92F86D368f3B1d446579598d68603c6a04E31";

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function addToWhitelist() {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(contractAddress, kubicsWhitelist, signer);
      try {
        const result = await contract.addAddressToWhitelist();
        await result.wait(1);
        alert("Great! You have joined the whitelist!");
        setIsWhitelisted(true)
      } catch (e) {
        console.log(e);
        if (e.error.message == "execution reverted: Sender has already been whitelisted") {
          alert("Address already whitelist!");
        }
        if (e.error.message == "execution reverted: Whitelist closed") {
          alert("Whitelist closed!");
        }
        if (e.error.message == "execution reverted: More addresses cant be added, limit reached")
          alert("Whithelist limit reached!");
      }
    } else {
      console.log("Please install MetaMask");
      setIsWhitelisted(false)
    }
  }
  return (
    <div>
      {hasMetamask ? (
        isConnected ? ("") : (
          <div>
            <button 
              onClick={() => connect()} 
              className="items-center text-white bg-[#7094b1]  p-2 flex justify-center rounded-3xl hover:shadow-xl  hover:text-[#E1B649] transition hover:-translate-y-1 hover:scale-105 ease-in-out  duration-500">
              <Image 
                className="mr-2"
                src='/MetaMask.png'
                width='30'
                height='30'
                alt="metamask"
                />
              Connect with Metamask to join our Whitelist!
            </button>
          </div>
        )
      ) : (
        "Please install metamask"
      )}
      <div>
        {isConnected ? (
          isWhitelisted ? (
            "Already whitelisted!"
          ) : (
            <div className="flex flex-col items-center">
              <div>Connected! Make sure you are on the ETH Chain</div>
              {/* <button onClick={() => addToWhitelist()} className="px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500">JOIN OUR WHITELIST</button> */}
              <button className="learn-more" onClick={() => addToWhitelist()}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">JOIN OUR WHITELIST</span>
              </button>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}