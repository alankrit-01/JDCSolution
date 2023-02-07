import MainStatusCard from 'components/SuperAdmin/MainStatusCard';
import Sidebar from 'components/SuperAdmin/Sidebar';
import Footer from 'components/SuperAdmin/Footer';
const SuperAdminDashboard = () => {
    return (
        <>
            <div className="main-section bg-gray-500">
                <Sidebar />
                <div className="md:ml-64">
                    <div className="bg-gray-500 px-3 md:px-8 h-40" />
                    <div className="px-3 md:px-8 -mt-24">
                        <div className="container mx-auto max-w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                                <MainStatusCard />
                            </div>
                        </div>
                    </div>
                  <Footer />
                </div>
            </div>
        </>
    );
}
export default SuperAdminDashboard
