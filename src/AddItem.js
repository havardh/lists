import React, { Component } from 'react';

class AddItem extends Component {

  constructor(props) {
    super(props);
    this.state = {name: ""};
  }

  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  add = (name) => {
    this.props.add(name);
    this.setState({name: ""});
  }

  render() {
    return (
      <div>
        <input
          value={this.state.name}
          onChange={this.handleChange}
          placeholder=""
        />
        <button
          onClick={() => this.add(this.state.name)}
        >
          Legg til
        </button>
      </div>
    );
  }
}

export default AddItem;
