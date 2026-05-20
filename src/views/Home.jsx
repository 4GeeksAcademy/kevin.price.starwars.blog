import React, { useContext } from 'react';
import { AppContext } from '../App.jsx';
import Card from '../components/Card.jsx';

const Home = () => {
    const { people, vehicles, planets, loading } = useContext(AppContext);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-warning">Loading Star Wars data...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="text-danger mb-3">Characters</h2>
            <div className="row mb-5">
                <div className="d-flex overflow-auto pb-3" style={{ gap: '1rem' }}>
                    {people.map((person) => (
                        <div key={person.uid} className="flex-shrink-0">
                            <Card item={person} type="people" />
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="text-danger mb-3">Vehicles</h2>
            <div className="row mb-5">
                <div className="d-flex overflow-auto pb-3" style={{ gap: '1rem' }}>
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.uid} className="flex-shrink-0">
                            <Card item={vehicle} type="vehicles" />
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="text-danger mb-3">Planets</h2>
            <div className="row mb-5">
                <div className="d-flex overflow-auto pb-3" style={{ gap: '1rem' }}>
                    {planets.map((planet) => (
                        <div key={planet.uid} className="flex-shrink-0">
                            <Card item={planet} type="planets" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;