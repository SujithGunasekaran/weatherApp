import React, { FC, Fragment } from 'react';

type CityCardProps = {
    currentLocationInformation: Object
}

const CityCard: FC<CityCardProps> = (props) => {

    const { currentLocationInformation } = props;

    return (
        <Fragment>
            City Component
        </Fragment>
    )

}

export default CityCard;
