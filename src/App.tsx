import React from 'react';
import { Home } from './page/Home';

const App: React.FC = () => {
    const [randomNum] = React.useState(Math.random());
    React.useEffect(() => {
        console.log('App mounted');
    }, []);

    return (
        <main>
            <h1>Hello, {randomNum}</h1>
            <Home />
        </main>
    );
};

export { App };
