import React, { Component } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import RestTimePicker from "./RestTimePicker";

class timePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  increase = () => {
    if (this.state.number < 5) {
      this.setState(
        state => {
          return { number: number + 1 };
        },
        () => {
          console.log("increased number:", this.state.number);
        }
      );
    }
  };

  decrease = () => {
    if (this.state.number > 0) {
      this.setState(
        state => {
          return { number: number - 1 };
        },
        () => {
          console.log("decreased number:", this.state.number);
        }
      );
    }
  };

  render() {
    return (
      <ImageBackground
        style={{
          width: 200,
          height: 100
        }}
        source={require("../assets/images/time-picker-large.png")}
      >
        <View
          style={{
            //position: "absolute",
            //top: 0,
            //left: 0,
            //bottom: 0,
            //right: 0,
            width: 200,
            height: 100,
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "space-between"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.text}>entre</Text>
            <RestTimePicker
              time={this.props.start}
              increase={this.props.increaseStart}
              decrease={this.props.decreaseStart}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.text}>et</Text>
            <RestTimePicker
              time={this.props.end}
              increase={this.props.increaseEnd}
              decrease={this.props.decreaseEnd}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default timePicker;

const styles = StyleSheet.create({
  signs: {
    fontFamily: "BaronNeueBold",
    fontSize: 40,
    color: "white"
    //margin: 5
  },
  text: {
    fontFamily: "BaronNeueBold",
    fontSize: 15,
    color: "white",
    margin: 5
  }
});
