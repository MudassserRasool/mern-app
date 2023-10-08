import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import MuiPhoneNumber from 'material-ui-phone-number';
import styles from './CarInfoForm.module.css';
const CarInfoForm = () => {
  const [carModel, setCarModel] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [carModelError, setCarModelError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePictureUpload = (e) => {
    const files = e.target.files;
    if (files.length > maxPictures) {
      alert(`You can upload a maximum of ${maxPictures} pictures.`);
    } else {
      setPictures(Array.from(files));
      setCarModelError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    if (carModel.length < 3) {
      setCarModelError('Car model should be at least 3 letters.');
      hasErrors = true;
    } else {
      setCarModelError('');
    }

    if (price === '') {
      hasErrors = true;
    }

    if (phoneNumber.length !== 15) {
      setPhoneNumberError('Phone number should have a valid length.');
      hasErrors = true;
    } else {
      setPhoneNumberError('');
    }
    if (maxPictures < 1 || maxPictures > 10) {
      hasErrors = true;
    }
    if (pictures.length >maxPictures) {
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    setCarModel('');
    setPrice('');
    setPhoneNumber('');
    setMaxPictures(1);
    setPictures([]);
    setFormSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container-fluid container-md bg-white p-4 rounded mx-auto"
    >
      {formSubmitted && (
        <div className="alert alert-success" role="alert">
          Form submitted successfully!
        </div>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Car Information</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Car Model"
            variant="outlined"
            fullWidth
            required
            value={carModel}
            onChange={(e) => {
              setCarModel(e.target.value);
              if (e.target.value.length < 3) {
                setCarModelError('Car model should be at least 3 letters.');
              } else {
                setCarModelError('');
              }
            }}
          />
          {carModelError && <div className="text-danger">{carModelError}</div>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            required
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiPhoneNumber
            label="Phone Number"
            variant="outlined"
            fullWidth
            required
            defaultCountry={'pk'}
            value={phoneNumber}
            onChange={(value) => {
              setPhoneNumber(value);
              if (value.length !== 15) {
                setPhoneNumberError('Phone number should be have valid length');
              } else {
                setPhoneNumberError('');
              }
            }}
            error={!!phoneNumberError}
          />

          {phoneNumberError && (
            <div className="text-danger">{phoneNumberError}</div>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Max Number of Pictures (1-10)"
            variant="outlined"
            fullWidth
            required
            type="number"
            inputProps={{ min: 1, max: 10 }}
            value={maxPictures}
            onChange={(e) => setMaxPictures(e.target.value)}
            error={maxPictures < 1 || maxPictures > 10}
          />
          {(maxPictures < 1 || maxPictures > 10) && (
            <div className="text-danger">
              Max Number of Pictures should be between 1 and 10.
            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            component="span"
            startIcon={<PhotoCamera />}
            onClick={() => {
              const inputElement = document.getElementById('picture-upload');
              inputElement.click();
            }}
          >
            Upload Pictures
          </Button>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            id="picture-upload"
            onChange={handlePictureUpload}
          />
        </Grid>
        {pictures.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">Uploaded Pictures:</Typography>
            <div className="d-flex flex-wrap gap-2">
              {pictures.map((file, index) => (
                <div key={index} className={styles.selectedImageWrapper}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index + 1}`}
                    width="100"
                    height="100"
                    className={styles.selectedImageAddsDetailes}
                  />
                  <button
                    className={styles.removeImageButton}
                    onClick={() => {
                      const newPictures = [...pictures];
                      newPictures.splice(index, 1);
                      setPictures(newPictures);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CarInfoForm;
