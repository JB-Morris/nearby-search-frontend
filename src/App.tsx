import { useState, useCallback, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";

import { COORDINATES, LocationCoordinate } from "./assets/constatns";
import tempData from "./assets/example.json";

import "./App.css";
import LocationList from "./components/LocationList";
import { Location } from "./types";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import axios from "axios";

function App() {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [locationsResponse, setLocationsResponse] = useState([]);

  const getLocations = useCallback(
    (coordinates: [number, number]) => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        coordinates[0]
      }%2C${coordinates[1]}&radius=1500&key=${
        import.meta.env.VITE_NEARBY_SEARCH_KEY
      }`;
      axios
        .get(url)
        .then((response) => {
          setLocationsResponse(response.data.results);
          // console.log("response", JSON.stringify(response.data));
          console.log("response", response.data.results);
        })
        .catch((error) => {
          console.error("error while fetching data: ", error);
        });
    },
    [import.meta.env]
  );

  useEffect(() => {
    getLocations(COORDINATES[selectedLocationIndex].coordinates);
  }, [COORDINATES]);

  // console.log("env", import.meta.env.VITE_NEARBY_SEARCH_KEY);

  const onLocationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
      getLocations(COORDINATES[value].coordinates);
      setSelectedLocationIndex(value);
    },
    [setSelectedLocationIndex]
  );

  const destinationList = useCallback(() => {
    const result: React.ReactElement[] = [];
    COORDINATES.forEach((location, index) => {
      result.push(
        <FormControlLabel
          key={location.name}
          value={index}
          control={<Radio />}
          label={location.name}
        ></FormControlLabel>
      );
    });
    return (
      <FormControl>
        <FormLabel>Select Location</FormLabel>
        <RadioGroup
          defaultValue={selectedLocationIndex}
          onChange={onLocationChange}
          name="destinationList"
        >
          {result}
        </RadioGroup>
      </FormControl>
    );
  }, [COORDINATES]);

  console.log("index", selectedLocationIndex);
  return (
    <div className="App">
      <Grid container spacing={2} justifyContent="center">
        <div>{/* <Autocomplete></Autocomplete> */}</div>
        <Grid xs={6}>{destinationList()}</Grid>
        <Grid xs={6}>
          <h3>{`Showing Results for ${COORDINATES[selectedLocationIndex].name}`}</h3>
          <LocationList locations={locationsResponse as Location[]} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
