import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
  phone: '',
  name: '',
};

class ContactForm extends Component {
  state = INITIAL_STATE;

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { name, phone } = this.state;
    const { onAdd } = this.props;

    const isValidateForm = this.validateForm();
    if (!isValidateForm) return;
    onAdd({ id: uuidv4(), name, phone });
  };

  validateForm = () => {
    const { name, phone } = this.state;
    const { onChekUnique } = this.props;

    if (!name || !phone) {
      alert('Some file is empty');
      return false;
    }
    return onChekUnique(name);
  };

  resetForm = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    const { name, phone } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={this.handleChangeForm}
        />
        <input
          type="text"
          name="phone"
          placeholder="Enter phone number"
          value={phone}
          onChange={this.handleChangeForm}
        />
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

export default ContactForm;
