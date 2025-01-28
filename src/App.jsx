import React from 'react'
import { useState } from "react";
import abi from "./abi.json";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [depositUserInput, setdepositUserInput] = useState("");
  const [retrievedMessage, setRetrievedMessage] = useState("");
  const contractAddress = "0xdfBaec261edA8A8EFcbBc50D34f41e24CC232971";

  async function requestAccounts() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function depositFunc() {
    if(typeof window.ethereum !== undefined){
      await requestAccounts();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myContract = new ethers.Contract(contractAddress, abi, signer);

      try{
        const tx = await myContract.deposit(userInput)
        const receipt = tx.wait();
        toast.success("🎉 Transaction successful!", {
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }catch(error){
        console.log("failed  transaction", error);
        toast.error("❌ Transaction failed! Please try again.", {
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }

  async function withdrawFunc() {
    if(typeof window.ethereum !== undefined){
      await requestAccounts();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const myContract = new ethers.Contract(contractAddress, abi, provider);

      try{
        const tx = await myContract.withdraw(depositUserInput)
        setRetrievedMessage(tx)
        toast.success("🎉 Withdrawal successful!", {
          position: "top-right",
          autoClose: 3000, // Closes after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }catch (error){
        console.log("failed  transaction", error);
        toast.error("❌ Withdrawal failed!", {
          position: "top-right",
          autoClose: 3000, // Closes after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
  }
}

  return (
    <>
      <div>
        <h1>My Mini DAPP</h1>
        <input placeholder="Deposit Amount" value ={userInput} onChange={(e)=> setUserInput(e.target.value)}/>
        <button onClick={depositFunc} >Deposit</button>
        <input placeholder="Withdraw Amount" value ={depositUserInput} onChange={(e)=> setdepositUserInput(e.target.value)}/>
        <button onClick={withdrawFunc} >Withdraw</button>
        <p>Message Retrieved: {retrievedMessage} </p>
        <ToastContainer 
        position="top-right" 
        autoClose={3000} // Closes after 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </div>
    </>
  )
}

export default App
