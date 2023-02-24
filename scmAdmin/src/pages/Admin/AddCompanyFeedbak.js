import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import { storeCompanyFeedback } from "Services/action";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddCompanyFeedbak = () => { 
    const initialdata = useSelector((state) => state.AdminLoginData);   

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [subjectError, setSubjectError] = useState('');
    const [descriptionError, setDescriptionError] = useState('')

     function handleSubmit(event) {
         event.preventDefault();
         const subjectRegex = /^[a-zA-Z ]+$/;
        const descriptionRegex = /^[a-zA-Z ]+$/;

        { subject == '' ? setSubjectError("Subject is required") : (subjectRegex.test(subject) === false ? setSubjectError("Invalid Subject") : setSubjectError(true)) }
        { description == '' ? setDescriptionError("Description is required") : (descriptionRegex.test(description) === false ? setDescriptionError("Invalid Description") : setDescriptionError(true)) }
    }
    const currentDate = new Date().toLocaleString();
     useMemo(() => {
        const data = {
            senderUserID: initialdata.adminUserId,
            receiverUserID: initialdata.superAdminId,
            name: initialdata.adminUserName,
            role:"Admin",
            subject:subject,
            description:description,
            date: currentDate,
        }
        if (subjectError == true && descriptionError == true) {
            dispatch(storeCompanyFeedback(data))
        }
    }, [subjectError,descriptionError])

    const initialSelfFeedbackRecordStoredata = useSelector((state) => state.CompanyFeedbackStoreData);

    useMemo(() => {
        if (initialSelfFeedbackRecordStoredata.success == true) {
            navigate('/admin/companySelfFeedback')
        }
    }, [initialSelfFeedbackRecordStoredata])

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
                        <div className="grid grid-cols-1 xl:grid-cols-6">
                            <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                                <Card>
                                    <CardHeader color="purple" contentPosition="none">
                                        <div className="w-full flex items-center justify-between">
                                            <h2 className="text-white text-2xl">Add Feedback</h2>
                                        </div>
                                    </CardHeader> 
                                    <CardBody>
                                        <form onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap mt-10">
                                                <div className="w-full lg:w-12/12 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="Subject"
                                                        name="subject"
                                                        value={subject} onChange={(e) => setSubject(e.target.value)}
                                                        required
                                                    />
                                                    <span style={{color: "red"}}>{subjectError}</span>
                                                </div>
                                                <div className="w-full lg:w-12/12 flex flex-wrap mb-10 font-light">
                                                    <Textarea color="purple" placeholder="Description" name="description"
                                                        value={description} onChange={(e) => setDescription(e.target.value)}
                                                    />
                                                    <span style={{color: "red"}}>{descriptionError}</span>
                                                </div>
                                            </div>
                                            <div className="flex">
                                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                            <Button type="submit">Submit</Button>
                                            </div>
                                            </div>
                                        </form>
                                    </CardBody> 
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default AddCompanyFeedbak