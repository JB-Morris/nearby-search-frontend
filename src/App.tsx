import { useState, useCallback, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";

import { COORDINATES } from "./assets/constatns";
import tempData from "./assets/example.json"; // for testing without the API

import "./App.css";
import LocationList from "./components/LocationList";
import { Location } from "./types";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import axios from "axios";

function App() {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [locationsResponse, setLocationsResponse] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");

  const getLocations = useCallback(
    (coordinates: [number, number], keywords?: string) => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        coordinates[0]
      }%2C${coordinates[1]}&radius=1500${
        keywords ? "&keyword=" + keywords : ""
      }&key=${import.meta.env.VITE_NEARBY_SEARCH_KEY}`;
      axios
        .get(url)
        .then((response) => {
          setLocationsResponse(response.data.results);
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

  const onLocationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: number) => {
      getLocations(COORDINATES[value].coordinates);
      setSelectedLocationIndex(value);
    },
    [setSelectedLocationIndex]
  );

  const onUpdateKeywords = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const keywords = event.target.value;
    getLocations(COORDINATES[selectedLocationIndex].coordinates, keywords);
    setSearchKeywords(keywords);
  };

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
        <TextField
          onChange={onUpdateKeywords}
          defaultValue={searchKeywords}
          label="Filter Results"
        />
      </FormControl>
    );
  }, [COORDINATES]);

  return (
    <div className="App">
      <Grid container spacing={2} justifyContent="center">
        <Grid xs={6}>{destinationList()}</Grid>
        <Grid xs={6}>
          <h3>{`Showing Results for ${COORDINATES[selectedLocationIndex].name}`}</h3>
          <Button />
          <LocationList locations={locationsResponse as Location[]} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
