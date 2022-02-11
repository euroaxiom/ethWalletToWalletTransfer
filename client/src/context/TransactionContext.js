import React, { useEffect , useState} from 'react'
import {ethers} from 'ethers'

import {contractABI, contractAddress} from '../utils/constants'

export const TransactionContext = React.createContext();

const {ethereum} = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    //console.log({provider:provider, signer: signer, TContract:transactionContract})
 } 

 export const TransactionProvider = ({children}) =>{
    const[currentAccount, setCurrentAccount] = useState('') 
    const [formData, setFormData] = useState({addressTo: '', amount:'', keyword:'', message:''})
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(0)

    const handleChange = (e, name) =>{
        setFormData((prevState) =>({...prevState, [name]:e.target.value}));
    }

    const sendTransaction = async () =>{
        console.log('Transferring Amount')
        const {addressTo, amount, keyword, message} = formData;
        console.log({addressTo, amount, keyword, message})
        try{
            if(!ethereum)return alert("Please install Metamask ")
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            const transactionSent = await ethereum.request({
                method:"eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to:addressTo,
                    gas:"0x5208",     // 2100 GWEI
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = 
                    await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword)
            ///////////////////////// Sending transaction End ////////////////////
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber)
        }
        catch(error){
            console.log(error)
            
        }
    }
    const checkIfWalletIsConnected = async () =>{
        try{
            if(!ethereum) return alert("Please install Metamask Extension from Chrome Extension Store")    
            const accounts = await ethereum.request({method: 'eth_accounts'})
            //console.log('account Address',accounts[0])
            if(accounts.length){
                setCurrentAccount(accounts[0])
            }
            else{
                console.log("No accounts found")
            }
        }
        catch(error){
            console.log(error)
            throw new Error("No ethereum object found.")
        }
        
    }

    const connectWallet = async () =>{
        try{
            if(!ethereum) return alert("Please install Metamask Extension from Chrome Extension Store")
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            setCurrentAccount(accounts[0])
        }
        catch(error){
            console.log(error)
            throw new Error("No ethereum object found.")
        }
    }

    useEffect(() =>{
        checkIfWalletIsConnected();
    }, []);

    return(
     <TransactionContext.Provider value= {{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
         {children}
     </TransactionContext.Provider>
    );
 }
