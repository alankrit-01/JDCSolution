import MainStatusCard from 'components/SuperAdmin/MainStatusCard';
import Sidebar from 'components/SuperAdmin/Sidebar';
import Footer from 'components/SuperAdmin/Footer';
import {useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFactoryByCompany } from 'Services/action';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";

const Factory = () => {

    let factoryAdminData = useLocation();
    let factoryAdminId = factoryAdminData.state.adminId;
    const dispatch = useDispatch();
    const [Factory, setFactory] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterFactory, setFilterFactory] = useState([]);

    const columns = [
        {
            name: <div className='text-base'>Factory Name</div>,
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: <div className='text-base'>Factory Email</div>,
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: <div className='text-base'>Factory Address</div>,
            selector: (row) => row.address,
            sortable: true,
        },
        {
            name: <div className='text-base'>Company Phone</div>,
            selector: (row) => row.phone,
            sortable: true,
        },
    ];

    useEffect(() => {
        const data = {
            adminId: factoryAdminId,
        }
        dispatch(getFactoryByCompany(data))
    }, [])

    const initialdata = useSelector((state) => state.FactoryRecord);


    useEffect(() => {
        setFactory(initialdata.factoryRec)
        setFilterFactory(initialdata.factoryRec)
    }, [initialdata])

    useEffect(() => {
        const result = Factory.filter((factory) => {
            return factory.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterFactory(result)
    }, [Search])

    return (
        <>
            <div className="main-section bg-gray-500">
                <Sidebar />
                <div className="md:ml-64">
                    <div className="bg-gray-500 pt-14 pb-28 px-3 md:px-8 h-auto">
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
                                    title="Factory List"
                                    columns={columns}
                                    data={FilterFactory}
                                    pagination
                                    fixedHeader
                                    selectableRows
                                    selectableRowsHighlight
                                    highlightOnHover
                                    // actions={<NavLink
                                    //     to="/superAdmin/addCompany"><Button>Add</Button></NavLink>}
                                    subHeader
                                // subHeaderComponent={
                                //     <div className='w-full'>
                                //         <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                                //             <Button><NavLink
                                //                 to="/admin/addMultiUser">Add Multi Company</NavLink></Button>
                                //         </div>
                                //         <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                                //             <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
                                //         </div>
                                //     </div>
                                // }
                                />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
export default Factory
