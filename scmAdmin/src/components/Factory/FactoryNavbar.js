import { useLocation } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import NavbarInput from '@material-tailwind/react/NavbarInput';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import ProfilePicture from 'assets/img/richmint.png';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function FactoryNavbar({ showSidebar, setShowSidebar }) {
    const location = useLocation().pathname;

    const [defaultAccount, setDefaultAccount] = useState('');
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [errorMessage,setErrorMessage] =  useState(null)

    // const [SCContract, setSCContract] = useState();
    const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);

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
		// dispatch({ type: "setMetask",data:newAccount })
		
		///console.log('accountChangedHandler called ',newAccount);
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

		// let supplyChaintempContract = new ethers.Contract(SupplyChainContractAddress, Supplychain_abi.abi, tempSigner);
		// setSCContract(supplyChaintempContract);
		// dispatch({ type: "updateSupplyChain",supplyChainContract:supplyChaintempContract })
	
	}

    return (
        <nav className="bg-light-blue-500 md:ml-64 py-6 px-3">
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        iconOnly
                        rounded
                        ripple="light"
                        onClick={() => setShowSidebar('left-0')}
                    >
                        <Icon name="menu" size="2xl" color="white" />
                    </Button>
                    <div
                        className={`absolute top-2 md:hidden ${
                            showSidebar === 'left-0' ? 'left-64' : '-left-64'
                        } z-50 transition-all duration-300`}
                    >
                        <Button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            iconOnly
                            rounded
                            ripple="light"
                            onClick={() => setShowSidebar('-left-64')}
                        >
                            <Icon name="close" size="2xl" color="white" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 className="uppercase text-white text-sm tracking-wider mt-1">
                        {location === '/'
                            ? 'DASHBOARD'
                            : location.toUpperCase().replace('/', '')}
                    </h4>
                    <div className="flex">
                    <span style={{padding:'5px', color:'#fff'}} ><b>Addres:-</b> {defaultAccount}</span>
                    <Button onClick={connectWalletHandler}> Connect Metamask</Button>

                        {/* <NavbarInput placeholder="Search" /> */}
                        <div className="-mr-4 ml-6">
                            <Dropdown
                                color="transparent"
                                buttonText={
                                    <div className="w-12">
                                        <Image src={ProfilePicture} rounded />
                                    </div>
                                }
                                rounded
                                style={{
                                    padding: 0,
                                    color: 'transparent',
                                }}
                            > 
                            <NavLink
                                    to="/factory/settings">
                                <DropdownItem color="lightBlue">
                                    Profile
                                </DropdownItem>
                                </NavLink>
                                
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
