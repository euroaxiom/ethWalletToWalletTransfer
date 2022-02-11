import React, {useContext} from "react";
import { TransactionContext } from "../context/TransactionContext";

const Input = ({placeholder, name, type, value, handleChange}) =>(
    <input
        placeholder = {placeholder}
        name= {name}
        type={type}
        step= "0.0001"
        value={value}
        onChange = {(e) =>handleChange(e, name)}
    />
);


const Welcome = () =>{
    const {connectWallet, currentAccount, formData, 
           setFormData, handleChange, sendTransaction} = useContext(TransactionContext)
    console.log('Connecting Wallets : ')

    const handleSubmit = (e) =>{
        const {addressTo, amount, keyword, message} = formData;
        e.preventDefault();
        if(!addressTo || !amount || !message || !keyword) return;
        sendTransaction();
    }
    return (
        <div style = {{display:'flex'}}>
            {!currentAccount &&
                (<div>
                    <button 
                    type = 'button'
                    onClick={connectWallet}
                    
                    >
                        <h2>Connect Wallet</h2>
                    </button>
                </div>)
            }
            <div>
            <div style = {{padding: "30px"}}>
                <Input placeholder = "Address To" name="addressTo" type = "text" handleChange = {handleChange}/> 
                <Input placeholder = "Amount (ETH)" name="amount" type = "number" handleChange = {handleChange}/> 
                <Input placeholder = "keyword" name="keyword" type = "text" handleChange = {handleChange}/> 
                <Input placeholder = "Enter Message" name="message" type = "text" handleChange = {handleChange}/> 
            </div>
            {false ? 
                (<div>Sending Ether</div>)
                : 
                (
                 <div>
                     <button type = 'button' onClick = {handleSubmit}>Send Now</button>
                 </div>
                 )
            }
            </div>
        </div>
    )
}

export default Welcome;