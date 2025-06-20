import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyById } from '../store/slices/propertySlice';
import { createBooking } from '../store/slices/bookingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faMapMarkerAlt, 
  faUsers, 
  faBed, 
  faBath, 
  faWifi, 
  faParking, 
  faSwimmingPool, 
  faDumbbell,
  faUtensils,
  faSnowflake,
  faPaw,
  faBalanceScale,
  faLeaf,
  faHotTub,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faShare
} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedProperty, isLoading, error } = useSelector((state) => state.properties);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading: bookingLoading } = useSelector((state) => state.bookings);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut && selectedProperty) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (nights > 0) {
        setNumberOfNights(nights);
        setTotalPrice(nights * selectedProperty.price);
      } else {
        setNumberOfNights(0);
        setTotalPrice(0);
      }
    }
  }, [bookingData.checkIn, bookingData.checkOut, selectedProperty]);

  const handleImageNavigation = (direction) => {
    if (!selectedProperty?.images) return;
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev === selectedProperty.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
      );
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
      alert('Check-out date must be after check-in date');
      return;
    }
    
    try {
      await dispatch(createBooking({
        propertyId: selectedProperty.id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        totalPrice
      })).unwrap();
      
      alert('Booking created successfully!');
      navigate('/bookings');
    } catch (error) {
      alert('Failed to create booking. Please try again.');
    }
  };

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'WiFi': faWifi,
      'Pool': faSwimmingPool,
      'Gym': faDumbbell,
      'Parking': faParking,
      'Kitchen': faUtensils,
      'Air Conditioning': faSnowflake,
      'Pet Friendly': faPaw,
      'Balcony': faBalanceScale,
      'Garden': faLeaf,
      'Hot Tub': faHotTub
    };
    return iconMap[amenity] || faLeaf;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProperty.title,
        text: selectedProperty.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="property-details-container">
        <LoadingSpinner size="large" message="Loading property details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="property-details-container">
        <div className="error-message">
          <h2>Error loading property</h2>
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!selectedProperty) {
    return (
      <div className="property-details-container">
        <div className="error-message">
          <h2>Property not found</h2>
          <p>The property you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="property-details-container">
      <div className="property-header">
        <div className="property-title-section">
          <h1>{selectedProperty.title}</h1>
          <div className="property-meta">
            <div className="rating">
              <FontAwesomeIcon icon={faStar} />
              <span>{selectedProperty.rating}</span>
              <span className="review-count">({selectedProperty.reviewCount} reviews)</span>
            </div>
            <div className="location">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>{selectedProperty.location}</span>
            </div>
          </div>
        </div>
        
        <div className="property-actions">
          <button 
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className="share-btn" onClick={handleShare}>
            <FontAwesomeIcon icon={faShare} />
            Share
          </button>
        </div>
      </div>

      <div className="property-images">
        <div className="main-image">
          <img 
            src={selectedProperty.images?.[currentImageIndex] || '/api/placeholder/800/500'} 
            alt={selectedProperty.title}
          />
          {selectedProperty.images?.length > 1 && (
            <>
              <button 
                className="image-nav prev"
                onClick={() => handleImageNavigation('prev')}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button 
                className="image-nav next"
                onClick={() => handleImageNavigation('next')}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}
        </div>
        
        {selectedProperty.images?.length > 1 && (
          <div className="image-thumbnails">
            {selectedProperty.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${selectedProperty.title} ${index + 1}`}
                className={index === currentImageIndex ? 'active' : ''}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="property-content">
        <div className="property-info">
          <div className="property-details">
            <div className="property-stats">
              <div className="stat">
                <FontAwesomeIcon icon={faUsers} />
                <span>{selectedProperty.maxGuests} guests</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faBed} />
                <span>{selectedProperty.bedrooms} bedrooms</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faBath} />
                <span>{selectedProperty.bathrooms} bathrooms</span>
              </div>
            </div>
            
            <div className="property-description">
              <h2>About this place</h2>
              <p>{selectedProperty.description}</p>
            </div>
            
            {selectedProperty.amenities?.length > 0 && (
              <div className="property-amenities">
                <h2>Amenities</h2>
                <div className="amenities-grid">
                  {selectedProperty.amenities.map((amenity, index) => (
                    <div key={index} className="amenity">
                      <FontAwesomeIcon icon={getAmenityIcon(amenity)} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="host-info">
              <h2>Meet your host</h2>
              <div className="host-card">
                <img 
                  src={selectedProperty.host?.avatar || '/api/placeholder/60/60'} 
                  alt={selectedProperty.host?.name}
                  className="host-avatar"
                />
                <div className="host-details">
                  <h3>{selectedProperty.host?.name}</h3>
                  <p>Host since {selectedProperty.host?.joinDate}</p>
                  <div className="host-stats">
                    <span>{selectedProperty.host?.reviewCount} reviews</span>
                    <span>•</span>
                    <span>{selectedProperty.host?.rating} rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="booking-section">
          <div className="booking-card">
            <div className="price-info">
              <span className="price">${selectedProperty.price}</span>
              <span className="period">per night</span>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="date-inputs">
                <div className="input-group">
                  <label>Check-in</label>
                  <input
                    type="date"
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Check-out</label>
                  <input
                    type="date"
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                    min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label>Guests</label>
                <select
                  value={bookingData.guests}
                  onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                >
                  {Array.from({ length: selectedProperty.maxGuests }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} guest{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              
              {numberOfNights > 0 && (
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>${selectedProperty.price} × {numberOfNights} nights</span>
                    <span>${selectedProperty.price * numberOfNights}</span>
                  </div>
                  <div className="price-row">
                    <span>Service fee</span>
                    <span>${Math.round(totalPrice * 0.1)}</span>
                  </div>
                  <div className="price-row total">
                    <span>Total</span>
                    <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
                  </div>
                </div>
              )}
              
              <button 
                type="submit" 
                className="book-btn"
                disabled={bookingLoading || !bookingData.checkIn || !bookingData.checkOut}
              >
                {bookingLoading ? (
                  <LoadingSpinner size="small" message="" />
                ) : (
                  isAuthenticated ? 'Book Now' : 'Login to Book'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;