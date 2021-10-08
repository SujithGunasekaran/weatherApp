import React, { FC, Fragment } from 'react';


const Header: FC = () => {

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="header_main">
                            <div className="header_logo">
                                Daily Weather
                            </div>
                            <div className="header_search_container">
                                <input
                                    className="header_search_input"
                                    placeholder="Search Location"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default Header;
