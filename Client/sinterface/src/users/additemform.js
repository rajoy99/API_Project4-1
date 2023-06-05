import React, { useState } from 'react';
import Popup from './Popup';
import './popupstyle.css'
import axios from 'axios';
import AddTaskIcon from '@mui/icons-material/AddTask';



function MyForm(props) {
    const [inputs, setInputs] = useState({});

     

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = event => {
        event.preventDefault();
    

        let id=props.id
        
        
        const supply_items=inputs
        const { name,price,quantity,description } = supply_items;
        axios.post("http://192.168.2.104:3003/login/giventoken/product_add", { id,name,price,quantity,description })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
        console.log("Sent while adding item : ",{ id, name,price,quantity,description })
        setInputs("")
      }
    return (
      <form onSubmit={handleSubmit}>
        <label>Enter Product name:
        <input 
          type="text" 
          name="name" 
          value={inputs.name || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Enter unit price:
          <input 
            type="number" 
            name="price" 
            value={inputs.price || ""} 
            onChange={handleChange}
          />
          </label>
          <label>Set quantity:
          <input 
            type="number" 
            name="quantity" 
            value={inputs.quantity || ""} 
            onChange={handleChange}
          />
          </label>
          <label>Set Description:
          <input 
            type="text" 
            name="description" 
            value={inputs.description || ""} 
            onChange={handleChange}
          />
          </label>
          <input type="submit" />
      </form>
    )
  }
  








function AdditemForm({id}) {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 
  return <div>
    <input
      type="button"
      value="Add Items to supply List + "
      onClick={togglePopup}
      style={{ backgroundColor : '#08591e',
        border : '2px',
        color: 'white',
        borderRadius: '8px',
        fontSize: '24px',
        content: "🔎 "}}
    />
    {isOpen && <Popup
      content={<>
        <b>Enter Item Details and Quantity: </b>
        <MyForm id={id} />
        
      </>}
      handleClose={togglePopup}
    />}
  </div>
}


export default AdditemForm;