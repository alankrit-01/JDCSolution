import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRetailers } from 'Services/action';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';

const Retailer = () => {
    const dispatch = useDispatch();
    const[Retailer,setRetailer] = useState([]);
    const[Search,setSearch] = useState("");
    const[FilterRetailer,setFilterRetailer] = useState([]);

    const columns = [
        {
            name:"Retailer Name",
            selector:(row) => row.name,
            sortable:true,
        },
        {
            name:"Retailer Email",
            selector:(row) => row.email,
            sortable:true,
        },
        {
            name:"Retailer Address",
            selector:(row) => row.address,
            sortable:true,
        },
        {
            name:"Retailer Hash Address",
            selector:(row) => row.hashAddress,
            sortable:true,
        },
    ];

    useEffect(() => {
        dispatch(getRetailers())
    }, [])

    const initialdata = useSelector((state) => state.RetailerRecord);
    
    useEffect(() => {
        setRetailer(initialdata.retailerRec)
        setFilterRetailer(initialdata.retailerRec)
    }, [initialdata])
   
    useEffect(() =>{
        const result = Retailer.filter((retailer) => {
            return retailer.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterRetailer(result)
    },[Search]) 
    return (
        <>
            <Sidebar />
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
                                title="Retailer List"
                                columns={columns}
                                data={FilterRetailer}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                actions={ <NavLink
                                    to="/admin/addretailer"><Button>Add</Button></NavLink>}
                                subHeader
                                subHeaderComponent={
                                    <div className='w-full'>
                                        <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                                        <Button><NavLink
                                    to="/admin/addMultiUser">Add Multi Retailer</NavLink></Button>
                                        </div>
                                        <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                                            <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
                                        </div>
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
export default Retailer
