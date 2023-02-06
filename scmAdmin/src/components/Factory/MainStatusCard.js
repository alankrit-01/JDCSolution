import React, { useEffect, useMemo, useState } from "react";
import StatusCard from "./StatusCard";
// import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
// import { ethers } from "ethers";
// let supplyChainAddress = '0xFd0C39B94CF349a1f72B9D1510a94EBFF8E4D128';
const MainStatusCard = () => {


    const [allBatchData, setAllBatchData] = useState([]);
    const [productTemplaterec, setProductTemplaterec] = useState([]);
    
    const [Search, setSearch] = useState("");
    const [FilterFactories, setFilterFactories] = useState([]);
    ////need improve////
    const [defaultAccount, setDefaultAccount] = useState('');
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [errorMessage, setErrorMessage] = useState(null)
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    // const [supplychainContract, setsupplychainContract] = useState('');
    // useEffect(() => {
    //     connectWalletHandler();
    // }, [])
    // const connectWalletHandler = () => {
    //     if (window.ethereum && window.ethereum.isMetaMask) {
    //         window.ethereum.request({ method: 'eth_requestAccounts' })
    //             .then(result => {
    //                 accountChangedHandler(result[0]);
    //                 setConnButtonText('Wallet Connected');
    //             })
    //             .catch(error => {
    //                 console.log("error", error);
    //                 setErrorMessage()
    //             });
    //     } else {
    //         console.log('Need to install MetaMask');
    //         setErrorMessage('Please install MetaMask browser extension to interact');
    //     }
    // }
    // const accountChangedHandler = (newAccount) => {
    //     setDefaultAccount(newAccount);
    //     updateEthers();
    // }
    // const chainChangedHandler = () => {
    //     window.location.reload();
    // }
    // // listen for account changes
    // window.ethereum.on('accountsChanged', accountChangedHandler);
    // window.ethereum.on('chainChanged', chainChangedHandler);

    // useEffect(() => {
    //     updateEthers()
    // }, [])

    // const updateEthers = async () => {
    //     let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    //     setProvider(tempProvider);
    //     let tempSigner = tempProvider.getSigner();
    //     setSigner(tempSigner);
    //     let supplychainContract = new ethers.Contract(supplyChainAddress, Supplychain_abi.abi, tempSigner);
    //     console.log("Ether updates", supplychainContract)
    //     setsupplychainContract(supplychainContract);
    // }
    // const getProductTemplateHandler = async () => {
    //     let allBatchrec = await (supplychainContract && supplychainContract.getAllBatchIDs());
    //     setAllBatchData(allBatchrec.length);
    //     let productTemplaterec = await (supplychainContract && supplychainContract.getAllProductTemplateIDs());
    //     setProductTemplaterec(productTemplaterec.length);
    // }
    // useMemo(() => {
    //     getProductTemplateHandler();
    // }, [supplychainContract])

    return (
        <>
            <StatusCard
                color="purple"
                icon="groups"
                title="All Products"
                // amount={productTemplaterec}
            // percentage="1.10"
            // percentageIcon="arrow_downward"
            // percentageColor="orange"
            // date="Since yesterday"
            />
            <StatusCard
                color="blue"
                icon="groups"
                title="All Batchs"
                // amount={allBatchData}
            // percentage="12"
            // percentageIcon="arrow_upward"
            // percentageColor="green"
            // date="Since last month"
            />
        </>
    )
}
export default MainStatusCard