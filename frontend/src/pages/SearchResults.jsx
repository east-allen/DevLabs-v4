import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProperties, setSearchFilters, clearSearchResults } from '../store/slices/propertySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faMapMarkerAlt, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import PropertyCard from '../components/Property/PropertyCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { 
    searchResults, 
    searchFilters, 
    isLoading, 
    error,
    totalResults 
  } = useSelector((state) => state.properties);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [localFilters, setLocalFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyType: '',
    amenities: [],
    rating: ''
  });

  // Extract search parameters from URL
  useEffect(() => {
    const location = searchParams.get('location') || '';
    const checkIn = searchParams.get('checkIn') || '';
    const checkOut = searchParams.get('checkOut') || '';
    const guests = parseInt(searchParams.get('guests')) || 1;
    
    const filters = {
      location,
      checkIn,
      checkOut,
      guests,
      sortBy: 'relevance'
    };
    
    dispatch(setSearchFilters(filters));
    dispatch(searchProperties(filters));
  }, [searchParams, dispatch]);

  // Clear results when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const updatedFilters = {
      ...searchFilters,
      sortBy: newSortBy
    };
    dispatch(setSearchFilters(updatedFilters));
    dispatch(searchProperties(updatedFilters));
  };

  const handleFilterChange = (filterType, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setLocalFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const applyFilters = () => {
    const updatedFilters = {
      ...searchFilters,
      ...localFilters,
      sortBy
    };
    dispatch(setSearchFilters(updatedFilters));
    dispatch(searchProperties(updatedFilters));
    setShowFilters(false);
  };

  const clearFilters = () => {
    setLocalFilters({
      priceMin: '',
      priceMax: '',
      propertyType: '',
      amenities: [],
      rating: ''
    });
    setSortBy('relevance');
    const basicFilters = {
      location: searchFilters.location,
      checkIn: searchFilters.checkIn,
      checkOut: searchFilters.checkOut,
      guests: searchFilters.guests,
      sortBy: 'relevance'
    };
    dispatch(setSearchFilters(basicFilters));
    dispatch(searchProperties(basicFilters));
  };

  const formatSearchSummary = () => {
    const { location, checkIn, checkOut, guests } = searchFilters;
    let summary = '';
    
    if (location) summary += location;
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn).toLocaleDateString();
      const checkOutDate = new Date(checkOut).toLocaleDateString();
      summary += ` • ${checkInDate} - ${checkOutDate}`;
    }
    if (guests > 1) summary += ` • ${guests} guests`;
    
    return summary || 'All properties';
  };

  const amenityOptions = [
    'WiFi', 'Pool', 'Gym', 'Parking', 'Kitchen', 'Air Conditioning',
    'Pet Friendly', 'Balcony', 'Garden', 'Hot Tub'
  ];

  if (isLoading && searchResults.length === 0) {
    return (
      <div className="search-results-container">
        <LoadingSpinner size="large" message="Searching properties..." />
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <div className="search-summary">
          <h1>Workspace Search Results</h1>
          <p className="search-details">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {formatSearchSummary()}
          </p>
          <p className="results-count">
            {totalResults > 0 ? `${totalResults} workspaces found` : 'No workspaces found'}
          </p>
        </div>
        
        <div className="search-controls">
          <button 
            className="filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filters
          </button>
          
          <div className="sort-dropdown">
            <FontAwesomeIcon icon={faSort} />
            <select 
              value={sortBy} 
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="relevance">Most Relevant</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-content">
            <div className="filter-group">
              <h3>Price Range</h3>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min price"
                  value={localFilters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max price"
                  value={localFilters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <h3>Workspace Type</h3>
              <select
                value={localFilters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="office">Private Office</option>
                <option value="coworking">Co-working Space</option>
                <option value="meeting">Meeting Room</option>
                <option value="studio">Creative Studio</option>
                <option value="lab">Innovation Lab</option>
              </select>
            </div>

            <div className="filter-group">
              <h3>Minimum Rating</h3>
              <select
                value={localFilters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>

            <div className="filter-group">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {amenityOptions.map((amenity) => (
                  <label key={amenity} className="amenity-checkbox">
                    <input
                      type="checkbox"
                      checked={localFilters.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="filters-actions">
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All
            </button>
            <button className="apply-filters-btn" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>Error loading search results: {error}</p>
          <button 
            onClick={() => dispatch(searchProperties(searchFilters))}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="search-results-grid">
        {searchResults.length > 0 ? (
          searchResults.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          !isLoading && (
            <div className="no-results">
              <h3>No workspaces found</h3>
              <p>Try adjusting your search criteria or filters.</p>
              <button 
                onClick={clearFilters}
                className="clear-filters-btn"
              >
                Clear Filters
              </button>
            </div>
          )
        )}
      </div>

      {isLoading && searchResults.length > 0 && (
        <div className="loading-more">
          <LoadingSpinner size="small" message="Loading more results..." />
        </div>
      )}
    </div>
  );
};

export default SearchResults;