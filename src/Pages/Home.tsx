import React from 'react';
import CardsContainer from '../Components/CardsContainer';
import HomeHeader from '../Components/HomeHeader';
import { PendingToDeleteProvider } from '../Context/PendingToDeleteContext';

const Home:React.FC = ()=>{
  return(
    <PendingToDeleteProvider>
      <div className="home-page page">
        <HomeHeader />
        <CardsContainer />
      </div>
    </PendingToDeleteProvider>
  );
};

export default Home;