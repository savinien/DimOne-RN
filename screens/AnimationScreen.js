import React, { Component } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import Video from "react-native-video";

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
    const defi = navigation.getParam("defi", "some default value");
    console.log("Animation screen, nav params:", title, defi);
    /*     setTimeout(() => {
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
    }, timeOut); */
  }

  navToDefis = () => {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const defi = navigation.getParam("defi", "some default value");
    this.props.navigation.navigate("Defis", {
      title: title,
      defi: defi
    });
    console.log("nav to Defi screen - params:", title, defi);
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/fond.png")}
        //source={images[this.state.index]}
        style={{ width: "100%", height: "100%" }}
      >
        <Video
          source={require("../assets/video/animation.mp4")}
          /*           ref={ref => {
            this.player = ref;
          }} */
          onEnd={this.navToDefis}
          style={styles.backgroundVideo}
          fullscreen={true}
          controls={true}
        />
      </ImageBackground>
    );
  }
}

export default animationScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
