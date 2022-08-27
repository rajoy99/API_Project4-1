import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton,Box,Button,CardActionArea, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';




const Cartcard = (props) => (
  <React.Fragment>
    <CardContent id={props.id}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.name}     -  {parseInt(props.price)} $  X {props.quantity} pcs    :  {props.quantity*props.price}$
        </Typography>
        </Grid>
        <Grid item xs={4}>
        <CardActions>
      {/* <Button size="small" color="warning" id={props.id} onClick={props.remove}>Remove </Button> */}
    </CardActions>
        </Grid>
        </Grid>
        </Box>
    </CardContent>
  </React.Fragment>
);




const ActionAreaCard = (props) => {



  

  return (
    <Card sx={{ maxWidth: 345,background:'#bce3e2',marginTop:'15px' }} align='Center'>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Framing_hammer.jpg/1200px-Framing_hammer.jpg"
          alt="green iguana"
        /> */}
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            Product Name : {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {props.price} $
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {props.description} 
          </Typography>
          {/* <IconButton color="primary" aria-label="add to shopping cart" id={props.id} onClick={props.addtocart}>
  <AddShoppingCartIcon />
</IconButton> */}
          <form>
          <Button variant="contained"   endIcon={<ShoppingCartCheckoutIcon />} id={props.id} onClick={props.addtocart}>
                  Add to Cart
          </Button>
          </form>


        </CardContent>
      </CardActionArea>
    </Card>
  );
}



export default ActionAreaCard
export {Cartcard}