import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App.jsx';

const Navbar = () => {
    const { favorites, removeFavorite } = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" 
                        alt="Star Wars" 
                        height="40"
                    />
                </Link>
                
                <div className="dropdown ms-auto">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        Favoritos <span className="badge bg-secondary">{favorites.length}</span>
                    </button>
                    
                    <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`} style={{ minWidth: '300px' }}>
                        {favorites.length === 0 ? (
                            <li className="dropdown-item text-center text-muted">
                                No hay favoritos
                            </li>
                        ) : (
                            favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                    <Link 
                                        to={`/details/${fav.type}/${fav.uid}`}
                                        className="text-decoration-none text-dark flex-grow-1"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        {fav.name}
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-danger ms-2"
                                        onClick={() => removeFavorite(fav.uid, fav.type)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;