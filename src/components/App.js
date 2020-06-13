import React  from 'react';
import { Route } from 'react-router-dom';
import Main from './Main';
import Estimate from './Estimate';

const App = () => {

    return (
        <React.Fragment>
            <Route path="/estimate/:id" exact component={Estimate} />
            <Route path="/" exact component={Main} />
        </React.Fragment>
    );
};

export default App;