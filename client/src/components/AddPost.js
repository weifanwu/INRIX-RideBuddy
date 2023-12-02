import React, { useState, useRef } from 'react';
import '../App.css';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { Container, Typography, Box, CircularProgress, Button, Grid, CssBaseline, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { useNavigate } from "react-router-dom";

// import { getGeocode, getLatLng } from 'use-places-autocomplete'

// the center Marker at the beginning
const center = { lat: 47.625168, lng: -122.337751 };
const lib = ['places'];
const API_KEY = process.env.REACT_APP_MAPS_API_KEY;


function App(props) {
  const [view, setView] = useState(0);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const navigate = useNavigate();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  const destiantionRef = useRef();
  const dateRef = useRef();
  const [value, setValue] = React.useState(dayjs(Date()));
  const contentRef = useRef();

  // const [geocode, setGeocode] = useState({start: [], end: []});

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: lib,
  })

  // If it's not loaded
  if (!isLoaded) {
    return <CircularProgress />
  }

  // A function to handle submission of a post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const origin = originRef.current.value;
    const destination = destiantionRef.current.value;
    const date = dateRef.current.value;
    const content = contentRef.current.value;
    console.log(origin, destination);
    const coo_origin = await getGeocode(origin);
    const coo_destination = await getGeocode(destination);
    console.log(coo_origin, coo_destination);

    // convert address to la/ln
    // const originData = await getGeocode(origin);
    // const {lat, lng} = await getLatLng(originData[0]);
    // console.log(lat, lng);

    // test for fetch a geocoder information
    // `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=Space+Needle,+Broad+Street,+Seattle,+WA&key=${API_KEY}`, {
    //   method: "GET"
    // }).then((res => res.json()))
    // .then(data => {
    //   // console.log(data.results[0]);
    //   const lat = data.results[0].geometry.location.lat;
    //   const lng = data.results[0].geometry.location.lng;
    //   // console.log(lat, lng);
    // })
    // .catch((err) => console.log(err))

    // this.setGeocode()
    console.log(origin)
    console.log(destination)
    console.log(date)
    console.log(content)
    fetch("/postData", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        start: coo_origin,
        end: coo_destination,
        date: date,
        content: content
      })
    })
    .then(res => res.json())

    await showRoute()
    setView(1);
    console.log("test submit!")
  }

  async function getGeocode(direction) {
    let lat;
    let lng;
    let geocode = [];

    // fetch a geocoder information from GoogleMap API
    direction = direction.replace(/ /g, "+");
    // console.log(direction)
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + direction + "&key=" + API_KEY;
    // console.log(url)
    await fetch(url, {
      method: "GET"
    }).then((res => res.json()))
    .then(data => {
      console.log(data.results[0]);
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
      // setGeocode([lat, lng])
      geocode[0] = lat;
      geocode[1] = lng;
      console.log("Inside getGeocode: ", geocode);

    })
    .catch((err) => console.log(err))

    return(geocode);
  }

  async function showRoute() {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    props.setDirections(results)
    navigate("/map");
  }

  // return (
  //   <div className='all'>
  //     <div className='form-part'>
  //       <h1>Create Your Post Here!</h1>
  //       <form onSubmit={handleSubmit} method='post' className='post-form'>
  //         <label>Origin:</label>
  //         <Autocomplete>
  //         <input type="text" name="start" ref={originRef}/>
  //         </Autocomplete>

  //         <label>Destination:</label>
  //         <Autocomplete>
  //         <input type="text" name="end" ref={destiantionRef} />
  //         </Autocomplete>

  //         <label htmlFor='date'>Date:</label>
  //         <input type="date" name="time" id="date" ref={dateRef} />

  //         <label htmlFor='content'>Content:</label>
  //         <input type="text" name="end" id='content' ref={contentRef} />

  //         <Button type="submit" className="form-btn">Submit</Button>
  //       </form>
  //     </div>
  //   </div>
  // );


  return (
    // <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component="h1" variant="h5">
          Create Your Post Here!
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Autocomplete>
                <TextField
                  name="start"
                  fullWidth
                  id="start"
                  label="Start"
                  autoFocus
                  inputRef={originRef}
                />
                </Autocomplete>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete>
                <TextField
                  fullWidth
                  id="end"
                  label="Destination"
                  name="end"
                  inputRef={destiantionRef}
                />
                </Autocomplete>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Date"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      inputRef = {dateRef}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="content"
                    label="Content"
                    name="content"
                    inputRef={contentRef}
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Start Matching
            </Button>

          </Box>
        </Box>
      </Container>
    // </ThemeProvider>
  );
}

export default App;
