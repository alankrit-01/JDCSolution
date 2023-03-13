import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import PieRechartComponent from 'components/Admin/PieChart';
const Dashboard = () => {
    return (
        <>
            <Sidebar />
            <div className="md:ml-32">
                <div className="bg-light-blue-500 px-3 md:px-8 h-40" />
                <div className="px-3 md:px-8 -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 mb-4">
                            <MainStatusCard />
                        </div>
                        <PieRechartComponent />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default Dashboard
