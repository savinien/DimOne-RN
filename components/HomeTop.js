import React, { Component } from "react";
import { TouchableOpacity, Image, View } from "react-native";

class homeTop extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 0.75
        }}
        onPress={this.props.nav}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../assets/images/picto-oiseau.png")}
            style={{ width: "25%", height: "80%" }}
            //style={{ width: "7%", height: "60%" }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default homeTop;
