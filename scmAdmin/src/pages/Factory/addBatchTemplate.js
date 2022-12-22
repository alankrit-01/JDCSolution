import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";         
import Card from '@material-tailwind/react/Card';           
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 

    
    //\/\/\/\/\/\/\/\/-need-improve-/\/\/\/\/\/\/\/\

import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
import { ethers } from "ethers";
let supplyChainAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
////End need improve////
const AddBatchTemplate = () => {


    
////need improve////
const [defaultAccount, setDefaultAccount] = useState('');
const [connButtonText, setConnButtonText] = useState('Connect Wallet');
const [errorMessage,setErrorMessage] =  useState(null)

// const [SCContract, setSCContract] = useState();
const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);
const [supplychainContract, setsupplychainContract] = useState(null);


useEffect(() => {
    connectWalletHandler();  
 
}, [])


const connectWalletHandler=()=>{
    if (window.ethereum && window.ethereum.isMetaMask){
        window.ethereum.request({ method: 'eth_requestAccounts'})
        .then(result => {
        //console.log("helllo then",result)
        accountChangedHandler(result[0]);
        setConnButtonText('Wallet Connected');
        
        })
        .catch(error => {
        console.log("error",error);
        setErrorMessage()
        });

    } else{
        console.log('Need to install MetaMask');
        setErrorMessage('Please install MetaMask browser extension to interact');
       
    }
    
}

const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();

}

const chainChangedHandler = () => {
    window.location.reload();
}

// listen for account changes
window.ethereum.on('accountsChanged', accountChangedHandler);
window.ethereum.on('chainChanged', chainChangedHandler);


const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    
    //console.log("tempSigner",tempSigner)

    let supplychainContract = new ethers.Contract(supplyChainAddress, Supplychain_abi.abi, tempSigner);
    setsupplychainContract(supplychainContract);

    //console.log("supplychaintempContract",supplychainContract);
    
    
    // dispatch({ type: "updateSupplychain", supplyChainContract: supplychaintempContract })
    // console.log(await supplychaintempContract.totalBatchs());	
}


// const buyCottonMaterialHandler = async (event) => {
    
    
//   }

////End need improve////


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    const [batchTemplateId, setBatchTemplateId] = useState('');
    const [batchSize, setBatchSize] = useState('');
    const [batchDescription, setBatchDescription] = useState('');
  

    const  handleSubmit = async (event) =>{
        event.preventDefault();
        const tx = await supplychainContract.addBatchTemplate("1827371912","0193Bvch11","Batch Description",15,"0x71bE63f3384f5fb98995898A86B02Fb2426c5788");
        if(tx){
           navigate("/factory/batchTemplate")
        }
       
    }

    return (
        <>
            <FactorySidebar />
            <div className="md:ml-64">
                <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                            <MainStatusCard />
                        </div>
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 xl:grid-cols-6">
                            <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                                <Card>
                                    <CardHeader color="purple" contentPosition="none">
                                        <div className="w-full flex items-center justify-between">
                                            <h2 className="text-white text-2xl">Add Batch Template </h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex flex-wrap mt-10">
                                                <div className="w-full pr-4 font-light">
                                                    <span><b>Batch Template ID</b></span>
                                                    <Input
                                                     type="text"
                                                     color="purple"
                                                     name="batchTemplateId"
                                                     value={batchTemplateId} onChange={(e) => setBatchTemplateId(e.target.value)}
                                                     />
                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Product ID</b></span>
                                                    <Input
                                                     type="text"
                                                     color="purple"
                                                     name="productId"
                                                     value={productId} onChange={(e) => setProductId(e.target.value)}
                                                     />
                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Batch Size</b></span>
                                                    <Input
                                                     type="text"
                                                     color="purple"
                                                     name="batchSize"
                                                     value={batchSize} onChange={(e) => setBatchSize(e.target.value)}
                                                     />
                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Batch Description</b></span>
                                                    <Input
                                                     type="text"
                                                     color="purple"
                                                     name="batchDescription"
                                                     value={batchDescription} onChange={(e) => setBatchDescription(e.target.value)}
                                                     />
                                                </div>
                                            </div>
                                            <div className="flex mt-10">
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <Button type="submit">Submit</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default AddBatchTemplate