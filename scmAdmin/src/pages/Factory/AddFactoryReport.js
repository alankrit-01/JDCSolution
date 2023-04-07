import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import { storeCompanyFeedback } from "Services/action";
import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import attach from "assets/img/attach.png";
import attach2 from "assets/img/delete-icon.png";
const AddFactoryReport = () => {
    const dataFetchedRef = useRef(false);

    const initialdata = useSelector((state) => state.FactoryLoginData);
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
            senderUserID: initialdata.factoryUserId,
            receiverUserID: initialdata.factoryUserAdminId,
            name: initialdata.factoryUserName,
            role: "Factory",
            subject: subject,
            description: description,
            date: currentDate,
        }
        if (subjectError == true && descriptionError == true) {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            dispatch(storeCompanyFeedback(data))
        }
    }, [subjectError, descriptionError])

    const initialSelfFeedbackRecordStoredata = useSelector((state) => state.CompanyFeedbackStoreData);

    useMemo(() => {
        if (initialSelfFeedbackRecordStoredata.success == true) {
            navigate('/factory/factorySelfFeedback')
        }
    }, [initialSelfFeedbackRecordStoredata])

    return (
        <>
            <FactorySidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        {/* <MainStatusCard /> */}
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 xl:grid-cols-6">
                            <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                                <Card className="background-gray rounded-none">
                                    <CardBody>
                                        <div>
                                            <h2 className="head-cust-color">Report an issue</h2>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex flex-wrap mt-10">
                                                <div className="w-full lg:w-10/12 mb-4 font-light">
                                                <label for="salutation" className="form-section-part">From:  
        <span class="field-label"> factory@gmail.com</span></label>
        <label for="salutation" className="form-section-part2">Date:
        <span class="field-label"> 15-03-2023</span></label>    
                                                </div>
                                                <div className="w-full lg:w-12/12 flex flex-wrap mb-10 font-light">
                                                <label for="salutation" className="form-section-part">To 
        <span class="field-label2">: ceo@gamil.com</span></label>
                                                  
                                                </div>
                                                <div className="w-full lg:w-12/12 flex flex-wrap mb-10 font-light">
                                                <ul className="checkbox-text-part">
 
        <li>
            <input className="form-control-part" type="checkbox" name="check-box" checked/> <span>Issue with received raw materials</span>

        </li>
        <li>
            <input className="form-control-part" type="checkbox" name="check-box" /> <span>Unable to generate/print <br/>
                                                            QR Codes-Software Issue</span>

        </li>
        <li>
            <input className="form-control-part" type="checkbox" name="check-box" /> <span>Others</span>

        </li>
    </ul>

                                                </div>
                                                <div className="w-full lg:w-11/12 flex flex-wrap mb-10 font-light lorem-text">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>       </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-full lg:w-12/12 pr-4 mb-10 font-light button-bg-use">
                                                    <Button type="submit">Send </Button>
                                                    <p className="right-img"><a href="#"> <img src={attach} /></a>
                                                    <a href="#"> <img src={attach2} /></a></p>
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
export default AddFactoryReport 