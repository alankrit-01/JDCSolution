import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import PieRechartComponent from "components/Admin/PieChart";
import ProgressCard from "components/Admin/ProgressCard";

import "react-multi-carousel/lib/styles.css";

const Dashboard = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Sidebar />
      <div className="md:ml-32">
        <div className="px-3 md:px-8 h-40" />
        <div className="px-4 md:px-8 -mt-24">
            <MainStatusCard />
          <div>
            <ProgressCard />
          </div>

          <div className="container mx-auto max-w-full">
            <PieRechartComponent />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Dashboard;
