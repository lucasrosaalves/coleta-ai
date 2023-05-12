import * as React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const MediaCard = () => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link href="/product">Detalhes</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default function Home() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 5, 6].map((key) => {
        return (
          <Grid item xs={3} key={key}>
            <MediaCard />
          </Grid>
        );
      })}
    </Grid>
  );
}
