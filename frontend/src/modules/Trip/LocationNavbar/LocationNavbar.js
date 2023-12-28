import React, { useState, useEffect } from 'react';
import { Container, Section } from './Styles';
import { useAuth } from '../../../context/Auth/useAuth';
import AuthButtonGroup from '../../NavBar/AuthButtonGroup/AuthButtonGroup';
import LocationNavbarInput from './LocationNavbarInput/LocationNavbarInput';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isNavbarScopedState } from './States/isNavbarScopedState';
import { useDateRangeSelector } from '../../ui/DateRangeSelector/hooks/useDateRangeSelector';
import AuthContainer from '../../NavBar/AuthContainer/AuthContainer';
import { useLocationPicker } from '../../ui/LocationPicker/useLocationPicker';

const LocationNavbar = () => {
    const [isFixed, setIsFixed] = useState(false);
    const { authStateValue } = useAuth();
    const [, setNavbarScope] = useRecoilState(isNavbarScopedState);
    const isNavbarScoped = useRecoilValue(isNavbarScopedState);
    const { closeLocationPicker } = useLocationPicker();
    const { closeDateRangeSelector } = useDateRangeSelector();
    const isAuth = authStateValue.isAuthenticated;

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 100;
            setIsFixed(scrollPosition > threshold);
            closeDateRangeSelector();
            closeLocationPicker();
            setNavbarScope(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Container isFixed={isFixed} isNavbarScoped={isNavbarScoped}>
            <Section>TripZip</Section>
            <LocationNavbarInput />
            <Section>
                {isAuth === true ? (
                    <AuthContainer authName={authStateValue.name} isDark />
                ) : (
                    <AuthButtonGroup dark />
                )}
            </Section>
        </Container>
    );
};

export default LocationNavbar;
