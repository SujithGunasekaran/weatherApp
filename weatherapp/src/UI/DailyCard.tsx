import React, { FC, Fragment } from 'react';
import { WindIcon, RainIcon } from '../UI/Icons';
import { getFullDate } from '../util';

interface dynamicObject {
    [key: string]: any
}

type DailyCardProps = {
    currentLocationInformation: dynamicObject[]
}

const DailyCard: FC<DailyCardProps> = (props) => {

    // react-props
    const { currentLocationInformation } = props;

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    {
                        currentLocationInformation.length > 0 &&
                        currentLocationInformation.map((info: any, index: number) => (
                            <Fragment key={index}>
                                {
                                    index > 0 &&
                                    <div className="col-md-4 mx-auto">
                                        <div className="daily_card_container">
                                            <div className="city_card_heading_container">
                                                <div className="daily_card_heading">{getFullDate(info.dt)}</div>
                                            </div>
                                            {
                                                info.weather.length > 0 &&
                                                <div className="city_card_info_container">
                                                    <img src={`https://openweathermap.org/img/wn/${info.weather[0].icon}.png`} className="city_card_info_icon" alt={info.sunrise} />
                                                    <div className="city_card_info_name">{info.weather[0].main}</div>
                                                </div>
                                            }
                                            <div className="city_card_temperature">{info.temp.max.toFixed(0)} °C</div>
                                            <div className="city_card_weather_container">
                                                <div className="city_card_weather_wind">
                                                    <WindIcon
                                                        cssClass="city_card_weather_icon"
                                                    />
                                                    <div className="city_card_wind">{info.wind_speed} Km/h</div>
                                                </div>
                                                <div className="city_card_weather_rain">
                                                    <RainIcon
                                                        cssClass="city_card_weather_icon"
                                                    />
                                                    <div className="city_card_rain">{info['rain'] ? info.rain.toFixed(0) : 0}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </Fragment>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )

}

export default DailyCard;
