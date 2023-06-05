import Card from 'react-bootstrap/Card';
import { IconButton,Box,Button,CardActionArea, Grid } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Typography from '@mui/material/Typography';


const ItemCard = (props) => {


    return (
        <div>
        <Card bg="success" style={{ width: "18rem" }} className="mb-2">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title> Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
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
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
    )
}

export default ItemCard;