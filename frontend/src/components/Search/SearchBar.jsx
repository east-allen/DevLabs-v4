import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchFilters } from '../../store/slices/propertySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    occupancy: 1
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update search filters in Redux store
    dispatch(setSearchFilters({
      location: searchData.location,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      occupancy: parseInt(searchData.occupancy)
    }));
    
    // Navigate to search results page
    const searchParams = new URLSearchParams();
    if (searchData.location) searchParams.set('location', searchData.location);
    if (searchData.checkIn) searchParams.set('checkIn', searchData.checkIn);
    if (searchData.checkOut) searchParams.set('checkOut', searchData.checkOut);
    if (searchData.occupancy) searchParams.set('occupancy', searchData.occupancy);
    
    navigate(`/search?${searchParams.toString()}`);
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-field">
        <label htmlFor="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="field-icon" />
          <span>Where</span>
        </label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Search destinations"
          value={searchData.location}
          onChange={handleInputChange}
        />
      </div>

      <div className="search-field">
        <label htmlFor="checkIn">
          <FontAwesomeIcon icon={faCalendarAlt} className="field-icon" />
          <span>Check in</span>
        </label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          min={today}
          value={searchData.checkIn}
          onChange={handleInputChange}
        />
      </div>

      <div className="search-field">
        <label htmlFor="checkOut">
          <FontAwesomeIcon icon={faCalendarAlt} className="field-icon" />
          <span>Check out</span>
        </label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          min={searchData.checkIn || today}
          value={searchData.checkOut}
          onChange={handleInputChange}
        />
      </div>

      <div className="search-field">
        <label htmlFor="occupancy">
              <FontAwesomeIcon icon={faUsers} />
              <span>Occupancy</span>
            </label>
            <select
              id="occupancy"
              name="occupancy"
              value={searchData.occupancy}
          onChange={handleInputChange}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} person{i + 1 !== 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="search-button">
        <FontAwesomeIcon icon={faSearch} />
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;