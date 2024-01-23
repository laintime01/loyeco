import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import ClinicAndSpecialities from '../ClinicAndSpecialities/ClinicAndSpecialities';
import HeroSection from '../HeroSection/HeroSection';
import InfoPage from '../InfoPage/InfoPage';
import Header from '../../Shared/Header/Header';

const Home = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <InfoPage />
            <ClinicAndSpecialities />
            <Footer />
        </>
    );
};

export default Home;