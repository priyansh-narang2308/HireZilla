import CreateOptions from './_components/create-options';
import LatestInterviews from './_components/latest-interviews-list';
import WelcomeContainer from './_components/welcome-container';

const Dashboard = () => {
  return (
    <div>
      <WelcomeContainer />
      <h2 className='text-black py-4 font-bold text-3xl'>Dashboard</h2>
      <CreateOptions/>
      <LatestInterviews/>
    </div>
  );
};

export default Dashboard;