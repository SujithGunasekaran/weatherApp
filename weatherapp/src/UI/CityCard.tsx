import React, { FC, Fragment } from 'react';
import { GeoIcon, WindIcon, RainIcon } from '../UI/Icons';


interface dynamicObject {
    [key: string]: any
}

type CityCardProps = {
    currentLocationInformation: dynamicObject,
    locationDetail: dynamicObject,
}

const CityCard: FC<CityCardProps> = (props) => {

    const { currentLocationInformation, locationDetail } = props;

    return (
        <Fragment>
            <div className="city_card_container">
                <div className="city_card_heading_container">
                    <GeoIcon
                        cssClass="city_card_geo_icon"
                    />
                    <div className="city_card_heading">{locationDetail?.name ?? ''}</div>
                </div>
                {
                    currentLocationInformation.weather &&
                    currentLocationInformation.weather.length > 0 &&
                    <div className="city_card_info_container">
                        <img src={`https://openweathermap.org/img/wn/${currentLocationInformation.weather[0].icon}.png`} className="city_card_info_icon" alt={locationDetail?.name} />
                        <div className="city_card_info_name">{currentLocationInformation.weather[0].main}</div>
                    </div>
                }
                <div className="city_card_temperature">{currentLocationInformation.temp.toFixed(0)} °C</div>
                <div className="city_card_weather_container">
                    <div className="city_card_weather_wind">
                        <WindIcon
                            cssClass="city_card_weather_icon"
                        />
                        <div className="city_card_wind">{currentLocationInformation.wind_speed} Km/h</div>
                    </div>
                    <div className="city_card_weather_rain">
                        <RainIcon
                            cssClass="city_card_weather_icon"
                        />
                        <div className="city_card_rain">{currentLocationInformation.rain ? currentLocationInformation['rain']['1h'].toFixed(0) : 0}%</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default CityCard;
