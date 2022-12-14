import MainStatusCard from 'components/Factory/MainStatusCard';
import FactorySidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
import { ethers } from "ethers";
let supplyChainAddress = '0xFd0C39B94CF349a1f72B9D1510a94EBFF8E4D128';

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
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [supplychainContract, setsupplychainContract] = useState('');

    const allProductTemplatelist = [];

    useEffect(() => {
        connectWalletHandler();
    }, [])
    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
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
    }
    const chainChangedHandler = () => {
        window.location.reload();
    }
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
        let supplychainContract = new ethers.Contract(supplyChainAddress, Supplychain_abi.abi, tempSigner);
        console.log("Ether updates", supplychainContract)
        setsupplychainContract(supplychainContract);
    }
    ////End need improve////
    const getProductTemplateHandler = async () => {
        let array = await (supplychainContract && supplychainContract.getAllBatchIDs());
        if (array && array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                let data = await (supplychainContract && supplychainContract.BatchMapping(array[i]));
                allProductTemplatelist.push(data)
            }
            setFactories(allProductTemplatelist);
            setFilterFactories(allProductTemplatelist);
        }
    }
    useMemo(() => {
        getProductTemplateHandler();
    }, [supplychainContract])

    const columns = [
        {
            name: "Batch Id",
            selector: (row) => row.BatchID.toNumber(),
            sortable: true,
            width: "150px"
        },
        {
            name: "Product Template ID",
            selector: (row) => row.ProductTemplateID.toNumber(),
            sortable: true,
            width: "150px"
        },
        {
            name: "Batch Size",
            selector: (row) => row.BatchSize.toNumber(),
            sortable: true,
            width: "150px"
        },
        {
            name: "Batch Description",
            selector: (row) => row.BatchDescription,
            sortable: true,
            width: "400px"
        },
        {
            name: "Action",
            selector: (row) => <Button variant="outline-success" onClick={() => navigate('/factory/BatchQr', { state: { BatchID:  row.BatchID.toNumber() } })}>Batch Qr</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "150px"
        },
        {
            selector: (row) => <Button variant="outline-success" onClick={() => navigate('/factory/BatchProductQr', { state: { BatchID:  row.BatchID.toNumber() } })}>Batch Product Qr</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "150px"
        },
    ];

    useEffect(() => {
        const result = Factories.filter((retailer) => {
            return retailer.BatchDescription.toLowerCase().match(Search.toLowerCase());
        })
        setFilterFactories(result)
    }, [Search])
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
                                title="Batch Template List"
                                columns={columns}
                                data={FilterFactories}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                actions={<NavLink
                                    to="/factory/addBatchTemplate"><Button>Add</Button></NavLink>}
                                subHeader
                                subHeaderComponent={
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default BatchTemplate

