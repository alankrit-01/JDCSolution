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
import loader from "assets/img/loading.gif";
import cumulative from "assets/img/cumulative.png";

const FactorySelfReports = () => {
    const factorydata = useSelector((state) => state.FactoryLoginData);
    const [loading, setLoading] = useState(false);

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
        // {
        //     name: "Subject",
        //     selector: (row) => row.subject,
        //     sortable: true,
        // },
        // {
        //     name: "Descrition",
        //     selector: (row) => row.description,
        //     sortable: true,
        // },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
        },
    ];
    useEffect(() => {
        const data = {
            senderUserID: factorydata.factoryUserId,
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

        var a = [{ subject: "There are no record to display" }];

        setLoading(true);
        if (
            initialdata.selffeedbackRec != 0 &&
            initialdata.selffeedbackRec != null &&
            initialdata.selffeedbackRec != ""
        ) {
            setFilterFeedback(initialdata.selffeedbackRec);

        } else {
            setLoading(false);

            setFilterFeedback(a);
        }
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
            <div className="md:ml-32">
                <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        {/* <MainStatusCard /> */}
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">

                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 px-4 mb-16">
                            <div class="grid grid-cols-3 gap-4">
                                <div>
                                    <h2 className="head-cust-color">Reports Sent To CEO</h2>
                                </div>
                                <div>
                                    <input type="text" className="cust-input" placeholder="Search" value={Search}
                                        onChange={(e) => setSearch(e.target.value)} />
                                </div>
                                <div className="right-button-section">
                                    <NavLink to="/factory/addFactoryReport">
                                        <button className="cust-button">Add +</button>
                                    </NavLink>
                                

                                </div>
                            </div>
                            <DataTable
                                columns={columns}
                                noDataComponent={
                                    <div>
                                        <h4>Loading....</h4>
                                        <img
                                            style={{ width: "20px", height: "20px" }}
                                            src={loader}
                                        ></img>
                                    </div>
                                }
                                data={FilterFeedback}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                            // actions={<NavLink
                            //     to="/factory/addFactoryFeedback"><Button>Add</Button></NavLink>}
                            // subHeader
                            // subHeaderComponent={
                            //     <div className='w-full'>
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
        </>
    );
}
export default FactorySelfReports


