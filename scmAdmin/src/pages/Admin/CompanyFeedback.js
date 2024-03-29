import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelfFeedback } from "Services/action";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import Input from "@material-tailwind/react/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from "assets/img/loading.gif";

const CompanySelfFeedback = () => {
  const admindata = useSelector((state) => state.AdminLoginData);
  const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
  const [loading, setLoading] = useState(false);

  const successNotify = () =>
    toast.success("Feedback Added Successfully !.", {
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
      sortable: false,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: false,
    },
    {
      name: "Descrition",
      selector: (row) => row.description,
      sortable: false,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: false,
    },
  ];

  useEffect(() => {
    const data = {
      senderUserID: adminUserId,
    };
    dispatch(getSelfFeedback(data));
  }, []);

  const initialdata = useSelector((state) => state.SelfFeedbackRecord);
  const initialCompanyFeedbackStoredata = useSelector(
    (state) => state.CompanyFeedbackStoreData
  );
  useMemo(() => {
    if (initialCompanyFeedbackStoredata.success == true) {
      successNotify();
    }
  }, [initialCompanyFeedbackStoredata]);
  useEffect(() => {
    var a = [{ subject: "There are no record to display" }];
    setFeedback(initialdata.selffeedbackRec);

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
  }, [initialdata]);

  useEffect(() => {
    const result = Feedback.filter((feedbackval) => {
      return feedbackval.name.toLowerCase().match(Search.toLowerCase());
    });
    setFilterFeedback(result);
  }, [Search]);
  return (
    <>
      <ToastContainer />
      <Sidebar />
      <div className="md:ml-32">
        <div className="pt-14 pb-28 px-3 md:px-8 h-auto">
          <div className="container mx-auto max-w-full">
            <MainStatusCard />
          </div>
        </div>
        <div className="px-3 md:px-8 h-auto -mt-24">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 px-4 mb-16">
              <DataTable
                title="Company Self Feedback List"
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
                actions={
                  <NavLink to="/admin/addCompanyFeedback">
                    <Button>Add</Button>
                  </NavLink>
                }
                subHeader
                subHeaderComponent={
                  <div className="w-full">
                    <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="Search Here"
                        value={Search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
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
};
export default CompanySelfFeedback;
