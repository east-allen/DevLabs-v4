import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProperties } from '../store/slices/propertySlice';
import PropertyCard from '../components/Property/PropertyCard';
import SearchBar from '../components/Search/SearchBar';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { properties, isLoading, error } = useSelector((state) => state.properties);
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    // Get first 6 properties as featured
    if (properties.length > 0) {
      setFeaturedProperties(properties.slice(0, 6));
    }
  }, [properties]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Next Innovation Hub</h1>
          <p>Find inspiring workspaces and collaborative environments designed for productivity and creativity</p>
          <SearchBar />
        </div>
        <div className="hero-image">
          {/* Hero image removed */}
        </div>
      </section>

      {/* Featured Workspaces */}
        <section className="featured-workspaces">
        <div className="container">
          <h2>Featured Workspaces</h2>
          {error && (
            <div className="error-message">
              <p>Error loading properties: {error}</p>
              <button onClick={() => dispatch(fetchProperties())} className="retry-btn">
                Try Again
              </button>
            </div>
          )}
          
          {featuredProperties.length > 0 ? (
            <div className="workspaces-grid">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            !isLoading && !error && (
              <div className="no-workspaces">
                <p>No workspaces available at the moment.</p>
                <Link to="/create-property" className="create-workspace-btn">
                  Be the first to list a workspace!
                </Link>
              </div>
            )
          )}

          {properties.length > 6 && (
            <div className="view-all">
              <Link to="/search" className="view-all-btn">
                View All Workspaces
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Explore Workspace Types</h2>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Private Offices</h3>
              <p>Dedicated workspace for focused productivity</p>
            </div>
            <div className="category-card">
              <h3>Collaborative Spaces</h3>
              <p>Open environments for team collaboration</p>
            </div>
            <div className="category-card">
              <h3>Innovation Labs</h3>
              <p>Tech-enabled spaces for breakthrough thinking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Share Section */}
        <section className="share-section">
        <div className="container">
          <div className="share-content">
            <div className="share-text">
              <h2>Share Your Workspace</h2>
              <p>Transform your space into a productivity hub and connect with innovative professionals.</p>
              <ul>
                <li>Set flexible booking terms and competitive rates</li>
                <li>Connect with entrepreneurs and creative minds</li>
                <li>Full support throughout your hosting journey</li>
              </ul>
              <Link to="/create-property" className="share-btn">
                List Your Space
              </Link>
            </div>
            <div className="share-image">
              {/* Share image removed */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;