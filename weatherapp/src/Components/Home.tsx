import React, { FC, Fragment, Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import { weatherKey } from '../config';

const CityCard = lazy(() => import('../UI/CityCard'));
const DailyCard = lazy(() => import('../UI/DailyCard'));

const Home: FC = () => {

    const [locationData, setLocationData] = useState<{ lat: String | Number, lng: String | Number }>();
    const [currentLocationData, setCurrentLocationData] = useState<{ [key: string]: any }>();
    const [locationDetail, setLocationDetail] = useState<{ [key: string]: any }>();

    useEffect(() => {
        getLatAndLng();
    }, [])

    useEffect(() => {
        if (locationData) {
            getLocationInfoBtLatLng();
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

    const getLocationInfoBtLatLng = async () => {
        try {
            const locationInfo = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData?.lat}&lon=${locationData?.lng}&units=metric&APPID=${weatherKey.key}`)
            const locationResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData?.lat}&lon=${locationData?.lng}&type=hour&exclude=minutely,hourly&units=metric&appid=${weatherKey.key}`)
            if (locationResponse.data) {
                setCurrentLocationData(locationResponse.data);

            }
            if (locationInfo.data) {
                setLocationDetail(locationInfo.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const getLocationByCityName = async (locationName: string | undefined) => {
        if (locationName) {
            try {
                const locationResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${weatherKey.key}`)
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <Fragment>
            <div className="page_body">
                {
                    currentLocationData && locationDetail &&
                    <Fragment>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-5 mx-auto">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <CityCard
                                            locationDetail={locationDetail}
                                            currentLocationInformation={currentLocationData.current}
                                            getLocationByCityName={getLocationByCityName}
                                        />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <DailyCard
                                currentLocationInformation={currentLocationData.daily}
                            />
                        </Suspense>
                    </Fragment>
                }
            </div>
        </Fragment>
    )

}

export default Home;
