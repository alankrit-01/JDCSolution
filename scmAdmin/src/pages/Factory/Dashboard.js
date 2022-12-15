import MainStatusCard from 'components/Factory/MainStatusCard';
import FactorySidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';

const FactoryDashboard = () => {
    return (
        <>
            <FactorySidebar />
            <div className="md:ml-64">
                <div className="bg-light-blue-500 px-3 md:px-8 h-40" />
                <div className="px-3 md:px-8 -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                            <MainStatusCard />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default FactoryDashboard
