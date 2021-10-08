import React, { FC, Fragment } from 'react';

type CityCardProps = {
    currentLocationInformation: Object | any
}

const CityCard: FC<CityCardProps> = (props) => {

    const { currentLocationInformation } = props;

    console.log(currentLocationInformation);

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div className="city_card_container">
                            <div className="city_card_heading">Weather In {currentLocationInformation?.name}</div>
                            <div className="city_card_temperature">{currentLocationInformation.main ? currentLocationInformation.main.temp_max : ''} °C</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default CityCard;
