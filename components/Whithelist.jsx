import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import kubicsWhitelist from "../artifacts/kubicsWhitelist.json";
import Swal from 'sweetalert2'
import { MovingSquareLoader } from 'react-loaders-kit'

export default function Whitelist() {



  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [signer, setSigner] = useState(undefined);

  const contractAddress = "0x9B399A856B0016Cf91c60aaAE195B33738874C2B";

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
        setLoading(true)
        const result = await contract.addAddressToWhitelist();
        await result.wait(1);
        Swal.fire({
          position: 'center',
          icon: 'success',
          iconColor: '#7094b1',
          title: 'Great! You have joined the whitelist!',
          showConfirmButton: false,
          timer: 2500
        })
        setLoading(false)
        setIsWhitelisted(true)
      } catch (err) {
        setLoading(false)

        if (err.code != 4001) {
          if (err.error.data.originalError.data == 0x57657b77) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              iconColor: '#7094b1',
              title: 'Address already whitelisted!',
              showConfirmButton: false,
              timer: 2500
            })
            setIsWhitelisted(true)
          }
          if (err.error.data.originalError.data == 0xfa6ef231) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              iconColor: '#7094b1',
              title: 'Whitelist closed!',
              showConfirmButton: false,
              timer: 2500
            })
          }
          if (err.error.data.originalError.data == 0xf236ce7a) {

            Swal.fire({
              position: 'center',
              icon: 'warning',
              iconColor: '#7094b1',
              title: 'Whithelist limit reached',
              showConfirmButton: false,
              timer: 2500
            })
          }
        } else {
          console.log(err)
        }
      }
    } else {
      console.log("Please install MetaMask");
      setIsWhitelisted(false)
    }
  }
  // ===================     Loader     ===================
  const [loading, setLoading] = useState(false);

  const loaderProps = {
    loading,
    size: 35,
    duration: 1,
    colors: ['#7094b1', '#E1B649']
  }

  function buttonLoading() {
    if (loading)
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <MovingSquareLoader   {...loaderProps} />
          <div className="mt-3">LOADING ...</div>
        </div>
      )
    else {
      return (
        <div className="flex flex-col items-center p-2 border shadow rounded-xl">
          <div>Connected! Make sure you are on the ETH Chain</div>
          <button className="mt-4 learn-more" onClick={() => addToWhitelist()}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text" translate="no">JOIN OUR WHITELIST</span>
          </button>
        </div>
      )
    }
  }
  // ========================================================
  return (
    <div className="flex">
      {hasMetamask ? (
        isConnected ? ("") : (
          <div>
            <button
              onClick={() => connect()}
              className="items-center text-white bg-[#7094b1]  p-3 flex justify-center rounded-3xl hover:shadow-xl  hover:text-[#E1B649] transition hover:-translate-y-1 hover:scale-105 ease-in-out  duration-500">
              <Image
                className="mr-4"
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
            <div>
              <div className="p-2 text-green-400 border shadow rounded-xl">Already whitelisted! </div>
            </div>) : (
            buttonLoading()
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}