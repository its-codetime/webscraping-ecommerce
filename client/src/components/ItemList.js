import React from "react";
import Grid from "@mui/material/Grid";
import ItemCard from "./ItemCard";

const ItemList = ({ items }) => {
  return (
    <Grid
      justifyContent="space-around"
      alignItems="center"
      container
      spacing={2}
    >
      {items.map((item) => (
        <Grid key={item._id} item xs={8} sm={6} md={4} lg={3}>
          <ItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;
