import React, { Component } from "react";
import { Button } from "react-native";

/* const fetchLocation = props => {
  return <Button title="Get user location" onPress={props.onGetLocation} />;
};
 */
class fetchLocation extends Component {
  state = {};
  render() {
    return (
      <Button title={this.props.title} onPress={this.props.onGetLocation} />
    );
  }
}

export default fetchLocation;
