import React, { Component } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

class restTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { time: this.props.time };
  }

  render() {
    return (
      <ImageBackground
        style={{
          width: 130,
          height: 40
        }}
        source={require("../assets/images/time-picker.png")}
      >
        <View
          style={{
            //position: "absolute",
            //top: 0,
            //left: 0,
            //bottom: 0,
            //right: 0,
            width: 130,
            height: 40,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={this.props.decrease}>
            <Text style={styles.signs}>-</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{this.props.time}h</Text>
          <TouchableOpacity onPress={this.props.increase}>
            <Text style={styles.signs}>+</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default restTimePicker;

const styles = StyleSheet.create({
  signs: {
    fontFamily: "BaronNeueBold",
    fontSize: 40,
    color: "white"
    //margin: 5
  },
  text: {
    fontFamily: "BaronNeueBold",
    fontSize: 20,
    color: "darkred"
    //margin: 5
  }
});
