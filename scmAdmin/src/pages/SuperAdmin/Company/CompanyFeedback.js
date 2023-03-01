import MainStatusCard from 'components/SuperAdmin/MainStatusCard';
import Sidebar from 'components/SuperAdmin/Sidebar';
import Footer from 'components/SuperAdmin/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedback } from 'Services/action';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Input from '@material-tailwind/react/Input';
import loader from "assets/img/loading.gif";

const CompanyFeedback = () => {
    const superadmindata = useSelector((state) => state.SuperAdminLoginData);
    const [superAdminUserId, setSuperAdminUserId] = useState(superadmindata.superAdminUserId);
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
            receiverUserID:superAdminUserId,
            role:'Admin',
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
            <div className="main-section bg-gray-500">
                <Sidebar />
                <div className="md:ml-64">
                    <div className="bg-gray-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                        <div className="container mx-auto max-w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                                {/* <MainStatusCard /> */}
                            </div>
                        </div>
                    </div>
                    <div className="px-3 md:px-8 h-auto -mt-24">
                        <div className="container mx-auto max-w-full">
                            <div className="grid grid-cols-1 px-4 mb-16">
                                <DataTable
                                    title="Company Feedback List"
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
                                    //     to="/admin/addretailer"><Button>Add</Button></NavLink>}
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
            </div>
        </>
    );
}
export default CompanyFeedback
