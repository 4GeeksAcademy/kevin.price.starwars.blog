import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App.jsx';

const Card = ({ item, type }) => {
    const { addFavorite, removeFavorite, isFavorite } = useContext(AppContext);

    const getImageUrl = () => {
    const id = item.uid;
    
    switch(type) {
        case 'people':
            return `https://swapi.dev/api/people/${id}/image.jpg`;
        case 'vehicles':
            return `https://swapi.dev/api/vehicles/${id}/image.jpg`;
        case 'planets':
            return `https://swapi.dev/api/planets/${id}/image.jpg`;
        default:
            return 'https://via.placeholder.com/400x600?text=No+Image';
    }
};
    const handleFavoriteClick = () => {
        const favoriteItem = {
            uid: item.uid,
            name: item.name,
            type: type
        };

        if (isFavorite(item.uid, type)) {
            removeFavorite(item.uid, type);
        } else {
            addFavorite(favoriteItem);
        }
    };

    return (
        <div className="card" style={{ width: '18rem', minHeight: '500px' }}>
            <img 
                src={getImageUrl()} 
                className="card-img-top" 
                alt={item.name}
                style={{ height: '300px', objectFit: 'cover' }}
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">
                    {type === 'people' && 'Character'}
                    {type === 'vehicles' && 'Vehicle'}
                    {type === 'planets' && 'Planet'}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                    <Link 
                        to={`/details/${type}/${item.uid}`} 
                        className="btn btn-outline-primary"
                    >
                        Learn more!
                    </Link>
                    <button 
                        className={`btn ${isFavorite(item.uid, type) ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={handleFavoriteClick}
                    >
                        <i className={`${isFavorite(item.uid, type) ? 'fas' : 'far'} fa-heart`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;