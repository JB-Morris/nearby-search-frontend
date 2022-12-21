import { List } from "@mui/material";
import { ReactElement } from "react";
import { Location } from "../types";
import LocationListItem from "./LocationListItem";

export type LocationListProps = {
  locations: Location[];
};

const LocationList = ({ locations }: LocationListProps): ReactElement => {
  return (
    <List sx={{ bgcolor: "background.paper" }}>
      {locations.map((location) => {
        return <LocationListItem location={location} key={location.place_id} />;
      })}
    </List>
  );
};

export default LocationList;
