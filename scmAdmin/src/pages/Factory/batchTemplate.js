import MainStatusCard from 'components/Factory/MainStatusCard';
import FactorySidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFactory } from 'Services/action';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';

import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
import { ethers } from "ethers";
let supplyChainAddress = '0xf41D5f4EA5037B3cb0799BcFb6Ec66be22908311';

const BatchTemplate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Factories, setFactories] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterFactories, setFilterFactories] = useState([]);

    ////need improve////

    const [defaultAccount, setDefaultAccount] = useState('');
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [errorMessage, setErrorMessage] = useState(null)

    // const [SCContract, setSCContract] = useState();
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [supplychainContract, setsupplychainContract] = useState('');

    const [productTemplatelist, setProductTemplatelist] = useState(null);

    const allProductTemplatelist = [];

    useEffect(() => {
        connectWalletHandler();

    }, [])


    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    //console.log("helllo then",result)
                    accountChangedHandler(result[0]);
                    setConnButtonText('Wallet Connected');

                })
                .catch(error => {
                    console.log("error", error);
                    setErrorMessage()
                });

        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');

        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        updateEthers();

        //localStorage.setItem('currentFactoryUserHash', newAccount);
    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    // listen for account changes
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);


    // listen for account changes
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);

    useEffect(() => {
        updateEthers()
    }, [])

    const updateEthers = async () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        // console.log("tempSigner",tempSigner)
        // console.log("supplyChainAddress",supplyChainAddress)
        // console.log(Supplychain_abi.abi)
        let supplychainContract = new ethers.Contract(supplyChainAddress, Supplychain_abi.abi, tempSigner);
        console.log("Ether updates", supplychainContract)
        setsupplychainContract(supplychainContract);

    }



    ////End need improve////


    const getProductTemplateHandler = async () => {
        // console.log("supplychainContract", supplychainContract)
        let array = await (supplychainContract && supplychainContract.getAllBatchIDs());
        if (array && array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                let data = await (supplychainContract && supplychainContract.BatchMapping(array[i]));
                // console.log(data);
                allProductTemplatelist.push(
                    <>
                        <tr>
                            <td>{i}</td>
                            <td>{data && data.BatchID.toNumber()}</td>
                            <td>{data && data.ProductTemplateID.toNumber()}</td>
                            <td> {data && data.BatchSize.toNumber()}</td>
                            <td> {data && data.Distributor}</td>
                            <td>
                                <NavLink to="/factory/batchQr"><Button>View Batch Qr</Button></NavLink><NavLink
                                        to="/factory/BatchProductQr"><Button>View Product Qr</Button></NavLink>

                                <Button variant="outline-success" onClick={() => navigate('/factory/batchQr', { state: { BatchID: data.BatchID.toNumber() } })}>Buy</Button>
                            </td>
                        </tr>
                    </>
                )
            }
            setProductTemplatelist(allProductTemplatelist);
        }
    }

    useMemo(() => {
        getProductTemplateHandler();
    }, [supplychainContract])







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

    // const initialdata = useSelector((state) => state.FactoryRecord);

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
                            <NavLink
                                to="/factory/addBatchTemplate"><Button>Add</Button></NavLink>
                            <table className="table-auto">
                                <tr>
                                    <th style={{ textAlign: "left" }}>Sr. NO</th>
                                    <th style={{ textAlign: "left" }}>Batch ID</th>
                                    <th style={{ textAlign: "left" }}>Product Template ID</th>
                                    <th style={{ textAlign: "left" }}>Batch Size</th>
                                    <th style={{ textAlign: "left" }}>Distributer</th>
                                    <th style={{ textAlign: "left" }}>Action</th>
                                    {/* <th style={{textAlign: "left"}}>Batch Description</th> */}

                                </tr>
                                {productTemplatelist}
                            </table>
                            {/* <DataTable
                                title="Batch Template List"
                                // columns={columns}
                                // data={FilterFactories}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                actions={ <NavLink
                                    to="/factory/addBatchTemplate"><Button>Add</Button></NavLink>}
                                subHeader
                                subHeaderComponent={
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
                                    </div>
                                }
                            />   */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default BatchTemplate

