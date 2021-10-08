import React, { FC, Fragment, Suspense, lazy } from 'react';
import './Style/main.css';
import './Style/header.css';
import './Style/card.css';

const Home = lazy(() => import('./Components/Home'));

const App: FC = () => {

  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="page">
          <Home />
        </div>
      </Suspense>
    </Fragment>
  )

}

export default App;
