import MainStatusCard from 'components/SuperAdmin/MainStatusCard';
import SettingsForm from 'components/SuperAdmin/SettingsForm';
import ProfileCard from 'components/SuperAdmin/ProfileCard';
import SuperAdminSidebar from 'components/SuperAdmin/Sidebar';
import Footer from 'components/SuperAdmin/Footer';
const SuperAdminSetting = () => {
    return (
        <>
            <div className="main-section bg-gray-500">
                <SuperAdminSidebar /> 
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
                            <div className="grid grid-cols-1 xl:grid-cols-6">
                                <div className="xl:col-start-1 xl:col-end-5 px-4 mb-16">
                                    <SettingsForm />
                                </div>
                                <div className="xl:col-start-5 xl:col-end-7 px-4 mb-16 mt-14">
                                    <ProfileCard />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default SuperAdminSetting
