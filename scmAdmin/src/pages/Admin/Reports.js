import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedback } from 'Services/action';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import loader from "assets/img/loading.gif";
import star from "assets/img/star.png";
import star2 from "assets/img/star-se.png";
import cumulative from "assets/img/cumulative.png";

const Reports = () => {
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
    const dispatch = useDispatch();
    const [Feedback, setFeedback] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterFeedback, setFilterFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
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
            receiverUserID: adminUserId,
            role: 'Factory',
        }
        dispatch(getFeedback(data))
    }, [])

    const initialdata = useSelector((state) => state.FeedbackRecord);

    useEffect(() => {
        var a = [{ subject: "There are no record to display" }];
        setFeedback(initialdata.feedbackRec);
        setLoading(true);
        if (
            initialdata.feedbackRec != 0 &&
            initialdata.feedbackRec != null &&
            initialdata.feedbackRec != ""
        ) {
            setFilterFeedback(initialdata.feedbackRec);
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
            <Sidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        {/* <MainStatusCard /> */}
                    </div>
                </div>

                <div className="px-3 md:px-7 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 px-4 mb-16">
                            <div className="grid-section">
                                <h2 className="reports-part">Reports Received - 25</h2>
                                <div className="received-part-two report-drop">
                                    <img src={cumulative} />
                                    <select id="colours" className="dd-button">
                                        <option value="red">Cumulative</option>
                                        <option value="green">Green</option>
                                        <option value="blue">Blue </option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                    <NavLink to="/admin/factoryReports">
                                        <div className="background-feedback-part">
                                            <h6>05</h6>
                                            <p>Factory</p>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                    <NavLink to="/admin/distributerReports">
                                        <div className="background-feedback-part">
                                            <h6>05</h6>
                                            <p>Distributor</p>
                                        </div>
                                    </NavLink>
                                </div>

                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                    <NavLink to="/admin/retailerReports">
                                        <div className="background-feedback-part">
                                            <h6>10</h6>
                                            <p>Retailer</p>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                    <NavLink to="/admin/customerReports">
                                        <div className="background-feedback-part">
                                            <h6>05</h6>
                                            <p>Customer</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default Reports


