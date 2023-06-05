import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton,Box,Button,CardActionArea, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const Cartcard = (props) => (
  <React.Fragment>
    <CardContent id={props.id}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.name}     -  {props.price} $ 
        </Typography>
        </Grid>
        <Grid item xs={4}>
        <CardActions>
      <Button size="small" color="warning" id={props.id} onClick={props.remove}>Remove </Button>
    </CardActions>
        </Grid>
        </Grid>
        </Box>
    </CardContent>
  </React.Fragment>
);




const MarketCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345,background:'#cdf7f2' }} align='Center'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Framing_hammer.jpg/1200px-Framing_hammer.jpg"
          alt="green iguana"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {props.price} $
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {props.description} 
            <br></br>
            quantity : {props.quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


const SupplyCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345,background:'#cdf7f2' }} align='Center'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Framing_hammer.jpg/1200px-Framing_hammer.jpg"
          alt="green iguana"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {props.price} $
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {props.description} 
            <br></br>
            quantity : {props.quantity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


function ComplexGrid(props) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          overflow: 'auto'
      }}
    >
      <Grid container spacing={5} sx={{overflow: 'auto'}}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128,overflow: 'auto' }}>
            <Img alt="complex" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Name : {props.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Description : {props.description} 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity : {props.quantity}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              <Button size="small" color="warning" id={props.id}>Remove </Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $ {props.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}




export default MarketCard
export {Cartcard}
export {SupplyCard}
export {ComplexGrid}