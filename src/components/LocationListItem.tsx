import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Location } from "../types";

export type LocationListItemProps = {
  location: Location;
};

const LocationListItem = ({ location }: LocationListItemProps) => {
  return (
    <ListItem className="location-list-item">
      <ListItemAvatar>
        <Avatar
          sx={{ bgcolor: location["icon_background_color"] }}
          variant="square"
          src={location.icon}
        />
      </ListItemAvatar>
      <ListItemText
        primary={location.name}
        secondary={
          <>
            Rating: {location.rating || "-"}/5
            <br />
            Address: {location.address_components}
          </>
        }
      />
    </ListItem>
  );
};

export default LocationListItem;
