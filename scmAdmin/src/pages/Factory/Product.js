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

const Products = () => {
    
    const dispatch = useDispatch();
    const[Factories,setFactories] = useState([]);
    const[Search,setSearch] = useState("");
    const[FilterFactories,setFilterFactories] = useState([]);

    const columns = [
        {
            name:"Factory Name",
            selector:(row) => row.name,
            sortable:true,
        },
        {
            name:"Factory Email",
            selector:(row) => row.email,
            sortable:true,
        },
        {
            name:"Factory Address",
            selector:(row) => row.address,
            sortable:true,
        },
        {
            name:"Factory Phone",
            selector:(row) => row.phone,
            sortable:true,
        },
    ];

    useEffect(() => {
        dispatch(getFactory())
    }, [])

    const initialdata = useSelector((state) => state.FactoryRecord);
    
    useEffect(() => {
        setFactories(initialdata.factoryRec)
        setFilterFactories(initialdata.factoryRec)
    }, [initialdata])
   
    useEffect(() =>{
        const result = Factories.filter((retailer) => {
            return retailer.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterFactories(result)
    },[Search]) 
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
                                title="Product List"
                                // columns={columns}
                                // data={FilterFactories}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                actions={ <NavLink
                                    to="/factory/addProduct"><Button>Add</Button></NavLink>}
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
export default Products

