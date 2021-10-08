import React, { FC, Fragment, Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import { weatherKey } from '../config';

const Header = lazy(() => import('./Header'));
const CityCard = lazy(() => import('../UI/CityCard'));

const Home: FC = () => {

    const [locationData, setLocationData] = useState<{ lat: String | Number, lng: String | Number }>();
    const [currentLocationData, setCurrentLocationData] = useState<any>();

    useEffect(() => {
        getLatAndLng();
    }, [])

    useEffect(() => {
        if (locationData) {
            getCurrenLocationData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationData])

    const getLatAndLng = () => {
        navigator.geolocation.getCurrentPosition((locationInfo) => {
            setLocationData({ lat: locationInfo.coords.latitude, lng: locationInfo.coords.longitude });
        }, (err) => {
            console.log(err);
        })
    }

    const getCurrenLocationData = async () => {
        try {
            const locationResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData?.lat}&lon=${locationData?.lng}&units=metric&APPID=${weatherKey.key}`)
            if (locationResponse.data) {
                setCurrentLocationData(locationResponse.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
            </Suspense>
            {
                currentLocationData &&
                <Suspense fallback={<div>Loading...</div>}>
                    <CityCard
                        currentLocationInformation={currentLocationData}
                    />
                </Suspense>
            }

        </Fragment>
    )

}

export default Home;
