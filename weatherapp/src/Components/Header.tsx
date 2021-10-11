import React, { FC, Fragment, useState } from 'react';
import { SearchIcon } from '../UI/Icons';

type HeaderProps = {
    getLocationByCityName: (locationName: string | undefined) => Promise<void>
}

const Header: FC<HeaderProps> = (props) => {

    // react-props
    const { getLocationByCityName } = props;

    // react-state
    const [location, setLocation] = useState<string | undefined>('');

    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLocation('');
            getLocationByCityName(location)
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <div className="header_main">
                <form onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="col-md-11">
                            <input
                                className="header_search_input"
                                placeholder="Search Location"
                                value={location}
                                onChange={handleInputFieldChange}
                            />
                        </div>
                        <div className="col-md-1">
                            <button type="submit" className="header_search_icon_container">
                                <SearchIcon
                                    cssClass="header_search_icon"
                                />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )

}

export default Header;
