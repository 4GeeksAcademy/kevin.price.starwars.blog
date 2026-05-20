import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { type, uid } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDetails();
    }, [type, uid]);

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
            const data = await response.json();
            setItem(data.result);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching details:', error);
            setLoading(false);
        }
    };

   const getImageUrl = () => {
    const baseUrl = 'https://swapi.dev/api';
    
    switch(type) {
        case 'people':
            return `${baseUrl}/people/${uid}/image.jpg`;
        case 'vehicles':
            return `${baseUrl}/vehicles/${uid}/image.jpg`;
        case 'planets':
            return `${baseUrl}/planets/${uid}/image.jpg`;
        default:
            return 'https://via.placeholder.com/800x600?text=No+Image';
    }
};

    const renderProperties = () => {
        if (!item || !item.properties) return null;

        const props = item.properties;
        
        if (type === 'people') {
            return (
                <>
                    <div className="col-md-6">
                        <p><strong>Height:</strong> {props.height}</p>
                        <p><strong>Mass:</strong> {props.mass}</p>
                        <p><strong>Hair Color:</strong> {props.hair_color}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Skin Color:</strong> {props.skin_color}</p>
                        <p><strong>Eye Color:</strong> {props.eye_color}</p>
                        <p><strong>Birth Year:</strong> {props.birth_year}</p>
                        <p><strong>Gender:</strong> {props.gender}</p>
                    </div>
                </>
            );
        }

        if (type === 'vehicles') {
            return (
                <>
                    <div className="col-md-6">
                        <p><strong>Model:</strong> {props.model}</p>
                        <p><strong>Manufacturer:</strong> {props.manufacturer}</p>
                        <p><strong>Cost:</strong> {props.cost_in_credits} credits</p>
                        <p><strong>Length:</strong> {props.length}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Max Speed:</strong> {props.max_atmosphering_speed}</p>
                        <p><strong>Crew:</strong> {props.crew}</p>
                        <p><strong>Passengers:</strong> {props.passengers}</p>
                        <p><strong>Cargo Capacity:</strong> {props.cargo_capacity}</p>
                    </div>
                </>
            );
        }

        if (type === 'planets') {
            return (
                <>
                    <div className="col-md-6">
                        <p><strong>Diameter:</strong> {props.diameter}</p>
                        <p><strong>Rotation Period:</strong> {props.rotation_period}</p>
                        <p><strong>Orbital Period:</strong> {props.orbital_period}</p>
                        <p><strong>Gravity:</strong> {props.gravity}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Population:</strong> {props.population}</p>
                        <p><strong>Climate:</strong> {props.climate}</p>
                        <p><strong>Terrain:</strong> {props.terrain}</p>
                        <p><strong>Surface Water:</strong> {props.surface_water}%</p>
                    </div>
                </>
            );
        }
    };

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="container text-center mt-5">
                <h2>Item not found</h2>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img 
                            src={getImageUrl()} 
                            className="img-fluid rounded-start" 
                            alt={item.properties.name}
                            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">{item.properties.name}</h1>
                            <p className="card-text text-center mb-4">
                                {type === 'people' && 'Learn more about this character from the Star Wars universe.'}
                                {type === 'vehicles' && 'Discover the specifications of this vehicle.'}
                                {type === 'planets' && 'Explore the details of this planet.'}
                            </p>
                            <hr className="text-danger" />
                            <div className="row mt-4">
                                {renderProperties()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;