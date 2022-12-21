import MainStatusCard from 'components/Factory/MainStatusCard';
import FactorySidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFactory } from 'Services/action';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';

////need improve////
import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
import { ethers } from "ethers";
let supplyChainAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
////End need improve////

const ProductTemplate = () => {




    
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
    // const[Factories,setFactories] = useState([]);
    // const[Search,setSearch] = useState("");
    // const[FilterFactories,setFilterFactories] = useState([]);


    // const columns = [
    //     {
    //         name:"Factory Name",
    //         selector:(row) => row.name,
    //         sortable:true,
    //     },
    //     {
    //         name:"Factory Email",
    //         selector:(row) => row.email,
    //         sortable:true,
    //     },
    //     {
    //         name:"Factory Address",
    //         selector:(row) => row.address,
    //         sortable:true,
    //     },
    //     {
    //         name:"Factory Hash Address",
    //         selector:(row) => row.hashAddress,
    //         sortable:true,
    //     },
    // ];

    // useEffect(() => {
    //     dispatch(getFactory())
    // }, [])



    const getProductTemplateHandler = async (event) => {

        // let array = await supplychainContract.getAllBatchTemplateIDs();
        // console.log("array", array)

        // for(let i=0;i<array.length; i++){
        //     let data =await supplychainContract.ProductTemplateMAP(array[i]);  
        //     console.log(data);
        //   }
    }

    useEffect(() => {
        getProductTemplateHandler();
      }, []);

    //const initialdata = useSelector((state) => state.FactoryRecord);
    
    // useEffect(() => {
    //     setFactories(initialdata.factoryRec)
    //     setFilterFactories(initialdata.factoryRec)
    // }, [initialdata])
   
    // useEffect(() =>{
    //     const result = Factories.filter((retailer) => {
    //         return retailer.name.toLowerCase().match(Search.toLowerCase());
    //     })
    //     setFilterFactories(result)
    // },[Search]) 

    
     
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
                        <div className="grid grid-cols-1 px-4 mb-16">
                              <DataTable
                                title="Product Template List"
                                // columns={columns}
                                // data={FilterFactories}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                actions={ <NavLink
                                    to="/factory/addProductTemplate"><Button>Add</Button></NavLink>}
                                subHeader
                                // subHeaderComponent={
                                //     <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                //         <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
                                //     </div>
                                // }
                            />  
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default ProductTemplate

