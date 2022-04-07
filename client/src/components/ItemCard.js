import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ItemCard = ({ item }) => {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        component="img"
        height="300"
        image={item.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          price: ₹{item.price}
          <br /> <span className="strike">mrp: ₹{item.mrp}</span>
          <br /> ratings: {item.ratings}
          <br /> total ratings: {item.ratingsCount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <a rel="noreferrer" target="_blank" href={item.link}>
            Buy on Amazon
          </a>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
