import MainStatusCard from "components/Factory/MainStatusCard";
import Sidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSelfFeedback } from 'Services/action';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FactoryySelfFeedback = () => {
    const factorydata = useSelector((state) => state.FactoryLoginData);


    const successNotify = () => toast.success('Feedback Added Successfully !.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false, 
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const dispatch = useDispatch();
    const [Feedback, setFeedback] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterFeedback, setFilterFeedback] = useState([]);

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Subject",
            selector: (row) => row.subject,
            sortable: true,
        },
        {
            name: "Descrition",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
        },
    ];

    useEffect(() => {
        const data = {
            senderUserID:factorydata.factoryUserId,
        }
        dispatch(getSelfFeedback(data))
    }, [])

    const initialdata = useSelector((state) => state.SelfFeedbackRecord);
    const initialCompanyFeedbackStoredata = useSelector((state) => state.CompanyFeedbackStoreData);
    useMemo(() => {
        if (initialCompanyFeedbackStoredata.success == true) {
            successNotify();
        }
    }, [initialCompanyFeedbackStoredata])
    useEffect(() => {
        setFeedback(initialdata.selffeedbackRec)
        setFilterFeedback(initialdata.selffeedbackRec)
    }, [initialdata])

    useEffect(() => {
        const result = Feedback.filter((feedbackval) => {
            return feedbackval.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterFeedback(result)
    }, [Search])
    return (
        <>
                    <ToastContainer />
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
                                title="Factory Self Feedback List"
                                columns={columns}
                                data={FilterFeedback}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                actions={<NavLink
                                    to="/factory/addFactoryFeedback"><Button>Add</Button></NavLink>}
                                subHeader
                                subHeaderComponent={
                                    <div className='w-full'>
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
export default FactoryySelfFeedback


