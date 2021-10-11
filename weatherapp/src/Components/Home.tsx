import React, { FC, Fragment, Suspense, lazy, useEffect, useState } from 'react';
import { getCurrentLocationByLatLng, getSevenDayLocationByLatLng, getCurrentLocationByCity } from '../util';

const Header = lazy(() => import('./Header'));
const CityCard = lazy(() => import('../UI/CityCard'));
const DailyCard = lazy(() => import('../UI/DailyCard'));

const Home: FC = () => {

    const [locationData, setLocationData] = useState<{ lat: string | number | undefined, lng: string | number | undefined }>();
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
            const [currentLocationInfo, sevenDayLocationInfo] = await Promise.all([getCurrentLocationByLatLng({ lat: locationData?.lat, lng: locationData?.lng }), getSevenDayLocationByLatLng({ lat: locationData?.lat, lng: locationData?.lng })]);
            if (currentLocationInfo) {
                setLocationDetail(currentLocationInfo);
            }
            if (sevenDayLocationInfo) {
                setCurrentLocationData(sevenDayLocationInfo);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const getLocationByCityName = async (cityName: string | undefined) => {
        if (cityName) {
            try {
                const locationData: any = await getCurrentLocationByCity(cityName || undefined);
                if (locationData) {
                    const sevenDayLocationInfo = await getSevenDayLocationByLatLng({ lat: locationData?.coord?.lat ?? undefined, lng: locationData?.coord?.lon ?? undefined });
                    setLocationDetail(locationData);
                    if (sevenDayLocationInfo) setCurrentLocationData(sevenDayLocationInfo);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Header
                                getLocationByCityName={getLocationByCityName}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
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
