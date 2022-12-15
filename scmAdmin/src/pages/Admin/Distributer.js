import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDistributer } from 'Services/action';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';

const Distributer = () => {
    const dispatch = useDispatch();
    const[Distributer,setDistributer] = useState([]);
    const[Search,setSearch] = useState("");
    const[FilterDistributer,setFilterDistributer] = useState([]);

    const columns = [
        {
            name:"Distributer Name",
            selector:(row) => row.name,
            sortable:true,
        },
        {
            name:"Distributer Email",
            selector:(row) => row.email,
            sortable:true,
        },
        {
            name:"Distributer Address",
            selector:(row) => row.address,
            sortable:true,
        },
        {
            name:"Distributer Hash Address",
            selector:(row) => row.hashAddress,
            sortable:true,
        },
    ];

    useEffect(() => {
        dispatch(getDistributer())
    }, [])

    const initialdata = useSelector((state) => state.DistributerRecord);
    
    useEffect(() => {
        setDistributer(initialdata.distributerRec)
        setFilterDistributer(initialdata.distributerRec)
    }, [initialdata])
   
    useEffect(() =>{
        const result = Distributer.filter((distributerval) => {
            return distributerval.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterDistributer(result)
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
                            <button>Import CSV</button>
                              <DataTable
                                title="Distributer List"
                                columns={columns}
                                data={FilterDistributer}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                
                                actions={ <NavLink
                                    to="/admin/adddistributer"><Button>Add</Button></NavLink>}
                                subHeader
                                subHeaderComponent={
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
                                        <NavLink to="/admin/adddistributer"><Button>Import Csv</Button></NavLink>
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
export default Distributer


