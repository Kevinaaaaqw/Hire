import React, { useState } from 'react';
import cityData from '../../data/CityCountyData.json';
import options from '../../data/item2.json';
// import './lovetop.scss';

function LoveTop({ onSearchSubmit }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const params = {
      cityCounty: selectedCity,
      productCategoryID: selectedCategory,
      minPrice,
      maxPrice,
    };

    onSearchSubmit(params);
  };

  const handlePriceRangeToggle = () => {
    setShowPriceRange(!showPriceRange);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <>
      <div className="category-section">
        <div className="category-section-title">
          <form
            id="search-group"
            onSubmit={handleFormSubmit}
          >
            <div id="search-form">
              <div className="form-group">
                <select
                  className="form-control"
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">類別</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="">選擇縣市</option>
                  {cityData.map((city) => (
                    <option key={city.CityName} value={city.CityName}>
                      {city.CityName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <div className="price-range-toggle" onClick={handlePriceRangeToggle}>
                  金額範圍
                </div>
                {showPriceRange && (
                  <div className="price-range-inputs">
                    <label>
                      最低金額:
                      <input type="number" value={minPrice} onChange={handleMinPriceChange} />
                    </label>
                    <label>
                      最高金額:
                      <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
                    </label>
                  </div>
                )}
              </div>

              <button type="submit">搜尋</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoveTop;
