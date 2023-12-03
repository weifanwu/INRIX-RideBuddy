import React, {useState, useEffect} from "react";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { useLocation } from 'react-router-dom';
import { InfoWindow } from "@react-google-maps/api";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";

export default function Map(props) {
    const center = { lat: 47.625168, lng: -122.337751 };
    const navigate = useNavigate();

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [open, setOpen] = useState(false);
    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    const [posts, setPosts] = useState([]);

    const [marker, setMarker] = useState(false);

    const [additionalRoute, setAdditionalRoute] = useState(null);

    const google = window.google;

    // Get all nearest posts from backend later
    // set up new posts data for testing multiple markers

    useEffect(() => {
      console.log("test Get Post Data!");
      let allPosts = [];
      // '/testGetPost?lat1=${lat1}&lng1=${lng1}&lat2=${lat2}&lng2=${lng2}'

      fetch(`/testGetPost`, {
          method: "GET"
      }).then((res => res.json()))
      .then(data => {
        console.log(data);
        console.log("start for loop");
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].post_id);
          console.log(data[i]);
          allPosts.push({
            id: parseInt(data[i].post_id),
            start: {lat: data[i].start[0], lng: data[i].start[1]},
            end: {lat: data[i].end[0], lng: data[i].end[1]}
          })
        }
          console.log(allPosts);
          setPosts(allPosts);
        })
      .catch((err) => console.log(err))

        // Change posts state
      setMarker(true);
      console.log("test posts: ")
      console.log(posts);

    }, [])

    // Generating an additional route to compare
    useEffect(() => {
      const addAdditionalRoute = async () => {
        if (start && end) {
          const directionsService = new google.maps.DirectionsService();
          const results = await directionsService.route({
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
          });

          setAdditionalRoute(results);
        }
      };

      addAdditionalRoute();
    }, [start, end, google]);

    return (
      <div className='show-map'>
        <h1>Find and Match Your Post!</h1>
        <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '1000px', height: '1000px' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        
      <DirectionsRenderer directions={props.directions} />

      {marker && (posts.map((object, i) => (
        <Marker
          key={i}
          position={object.start}
          onClick={() => {
            setStart(object.start);
            setEnd(object.end);
            setOpen(true);
          }}
        />
      )))
      }

      {open && (
        <InfoWindow position={start} onCloseClick={() => setOpen(false)}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <div>
                  start latitude, longtitude:
                  {parseFloat(start['lat'].toFixed(3))},
                  {parseFloat(start['lng'].toFixed(3))}
                </div>
                <div>
                  end latitude, longtitude:
                  {parseFloat(end['lat'].toFixed(3))},
                  {parseFloat(end['lng'].toFixed(3))}
                </div>
              </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" endIcon={<SendIcon/>} onClick={() => {
                // alert('clicked');
                navigate("/chat")
                console.log('test button print');
              }}>Chat Test</Button>
            </CardActions>
          </Card>
        </InfoWindow>
      )}
      {/* Additional/Compared Route */}
      {additionalRoute && (
        <DirectionsRenderer directions={additionalRoute} />
      )}
    </GoogleMap>

      </div>
    );
}