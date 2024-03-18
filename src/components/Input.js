import React from "react";
class Input extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search for location"
          value={this.props.location}
          onChange={(e) => this.props.handleChange(e)}
        />
      </div>
    );
  }
}

export default Input;
