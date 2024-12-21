import React, { useState } from 'react';
// Import the CSS file
import './update.css'; 

function UpdateAuction() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bid: '',
    enddate: Date(),
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    // if (formData.bid !== formData.enddate) {
    //   setErrorMessage('bids do not match!');
    //   setSuccessMessage('');
    // } else {
    //   setErrorMessage('');
    //   setSuccessMessage('Registration Successful!');
    // }
  };

  return (
    <div className="form-container">
      <h2>Update Auction</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bid">Bid</label>
          <input
            type="number"
            id="bid"
            name="bid"
            min={0}
            value={formData.bid}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="enddate">End Date</label>
          <input
            type="date"
            id="enddate"
            name="enddate"
            value={formData.enddate}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
}

export default UpdateAuction;