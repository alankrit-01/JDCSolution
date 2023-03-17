import MainStatusCard from 'components/Factory/MainStatusCard';
import FactorySidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';

import Card from '@material-tailwind/react/Card';
import CardRow from '@material-tailwind/react/CardRow';
import CardStatus from '@material-tailwind/react/CardStatus';
import MapExample from 'components/Factory/MapExample';
import DashboardVector from 'assets/img/vactor.jpg';

import PieRechartComponent from 'components/Factory/PieChart';

const FactoryDashboard = () => {
    return (
        <>
            <FactorySidebar />
            <div className="md:ml-32">
                <div className="px-3 md:px-8 h-40" />
                <div className="px-3 md:px-8 -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 mb-4">
                            <MainStatusCard />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                            <div className="px-4 mb-10 main-tiles-section">
                                <Card className="main-tiles p-0">
                                    <CardRow className="inner-tiles">
                                        <img src={DashboardVector} />
                                    </CardRow>
                                </Card>
                            </div>
                            <div className="px-4 mb-10 main-tiles-section">
                            <PieRechartComponent/>
                            </div>
                            <div className="px-4 mb-10 main-tiles-section">
                            <MapExample/>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default FactoryDashboard
