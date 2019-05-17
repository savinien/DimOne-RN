import React, { Component } from "react";
import { ImageBackground } from "react-native";

const images = [
  require("../assets/images/animation-1.png"),
  require("../assets/images/animation-2.png"),
  require("../assets/images/animation-3.png")
];

const timeOut = 100;

class animationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
    console.log(this.props, this.state, images);
    console.log(images[this.state.index]);
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const text = navigation.getParam("text", "some default value");

    setTimeout(() => {
      this.setState(
        state => {
          return { index: 1 };
        },
        () => {
          setTimeout(() => {
            this.setState(
              state => {
                return { index: 2 };
              },
              () => {
                setTimeout(() => {
                  this.props.navigation.navigate("Defis", {
                    title: title,
                    text: text
                  });
                }, timeOut);
              }
            );
          }, timeOut);
        }
      );
    }, timeOut);
  }

  render() {
    return (
      <ImageBackground
        //source={require("../assets/images/animation-1.png")}
        source={images[this.state.index]}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}

export default animationScreen;
