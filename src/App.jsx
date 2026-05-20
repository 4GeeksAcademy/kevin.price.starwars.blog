import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './views/Home.jsx';
import Details from './views/Details.jsx';
import { createContext, useState, useEffect } from 'react';


export const AppContext = createContext();

function App() {
    const [people, setPeople] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        const storedPeople = localStorage.getItem('people');
        const storedVehicles = localStorage.getItem('vehicles');
        const storedPlanets = localStorage.getItem('planets');

        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }

        if (storedPeople && storedVehicles && storedPlanets) {
            setPeople(JSON.parse(storedPeople));
            setVehicles(JSON.parse(storedVehicles));
            setPlanets(JSON.parse(storedPlanets));
            setLoading(false);
        } else {
            fetchAllData();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const peopleResponse = await fetch('https://www.swapi.tech/api/people');
            const peopleData = await peopleResponse.json();
            setPeople(peopleData.results);
            localStorage.setItem('people', JSON.stringify(peopleData.results));

            const vehiclesResponse = await fetch('https://www.swapi.tech/api/vehicles');
            const vehiclesData = await vehiclesResponse.json();
            setVehicles(vehiclesData.results);
            localStorage.setItem('vehicles', JSON.stringify(vehiclesData.results));

            const planetsResponse = await fetch('https://www.swapi.tech/api/planets');
            const planetsData = await planetsResponse.json();
            setPlanets(planetsData.results);
            localStorage.setItem('planets', JSON.stringify(planetsData.results));

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const addFavorite = (item) => {
        const exists = favorites.find(
            fav => fav.uid === item.uid && fav.type === item.type
        );
        
        if (!exists) {
            setFavorites([...favorites, item]);
        }
    };

    const removeFavorite = (uid, type) => {
        setFavorites(favorites.filter(
            fav => !(fav.uid === uid && fav.type === type)
        ));
    };

    const isFavorite = (uid, type) => {
        return favorites.some(fav => fav.uid === uid && fav.type === type);
    };

    return (
        <AppContext.Provider value={{
            people,
            vehicles,
            planets,
            favorites,
            loading,
            addFavorite,
            removeFavorite,
            isFavorite
        }}>
            <BrowserRouter>
                <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/details/:type/:uid" element={<Details />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;