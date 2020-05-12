import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import axios from "axios";
// import apiHandler from "../../api/apiHandler";

class FormItem extends Component {
  state = {
    name: "",
    category: "",
    quantity: 0,
    address: "",
    location: [0, 0],
    description: "",
    image: "",
  };

  handleChange = (event) => {
    let value;
    if (event.target.type === "file") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", this.state.name);
    formData.append("category", this.state.category);
    formData.append("quantity", this.state.quantity);
    formData.append("address", this.state.address);
    formData.append("description", this.state.description);
    formData.append("image", this.state.image);
    formData.append("location", this.state.location);

    axios
      .post("http://localhost:5000/api/items", formData)
      .then((apiResponse) => {
        // this.setState({ image: apiResponse.secure_url });
        this.props.history.push("/");
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  // In order to send back the data to the client, since there is an input type file you have to send the
  // data as formdata.
  // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
  // Check out the stackoverflow solution below : )

  // Nested object into formData by user Raj Pawam Gumdal @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    this.setState({
      location: [place.center[0], place.center[1]],
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className='ItemForm-container'>
        <form
          className='form'
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2 className='title'>Add Item</h2>

          <div className='form-group'>
            <label className='label' htmlFor='name'>
              Name
            </label>
            <input
              id='name'
              name='name'
              className='input'
              type='text'
              placeholder='What are you giving away ?'
            />
          </div>

          <div className='form-group'>
            <label className='label' htmlFor='category'>
              Category
            </label>

            <select name='category' id='category' defaultValue='-1'>
              <option value='-1' disabled>
                Select a category
              </option>
              <option value='Plant'>Plant</option>
              <option value='Kombucha'>Kombucha</option>
              <option value='Vinegar'>Vinegar</option>
              <option value='Kefir'>Kefir</option>
            </select>
          </div>

          <div className='form-group'>
            <label className='label' htmlFor='quantity'>
              Quantity
            </label>
            <input
              name='quantity'
              className='input'
              id='quantity'
              type='number'
            />
          </div>

          <div className='form-group'>
            <label className='label' htmlFor='location'>
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className='form-group'>
            <label className='label' htmlFor='description'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              className='text-area'
              placeholder='Tell us something about this item'
            ></textarea>
          </div>

          <div className='form-group'>
            <label className='custom-upload label' htmlFor='image'>
              Upload image
            </label>
            <input className='input' name='image' id='image' type='file' />
          </div>

          <h2>Contact information</h2>

          <div className='form-group'>
            <label className='label' htmlFor='contact'>
              How do you want to be reached?
            </label>
            <div>
              <input type='radio' />
              user email
            </div>
            <input type='radio' />
            contact phone number
          </div>

          <p className='message'>
            <img src='/media/info.svg' alt='info' />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className='btn-submit'>Add Item</button>
        </form>
      </div>
    );
  }
}

export default FormItem;
