import MainStatusCard from 'components/Factory/MainStatusCard';
import SettingsForm from 'components/Factory/SettingForm';
import ProfileCard from 'components/Factory/ProfileCard';
import Sidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
const FactorySetting = () => {
    return (
        <>
        <Sidebar />
            <div className="md:ml-32">
            <div className="pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5">
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
        </>
    );
}

export default FactorySetting
