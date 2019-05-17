import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import FetchLocation from "../components/FetchLocation";
import LogoTitle from "../components/LogoTitle";
import NotifService from "../NotifService";
import appConfig from "../app.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "powderblue",
    borderRadius: 5
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%"
  },
  spacer: {
    height: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  }
});

//type Props = {};
//<Props>
class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle title="" />,
    headerStyle: {
      backgroundColor: "#A80A35"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      error: " "
    };

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this)
    );
  }

  getUserLocationHandler = () => {
    console.log("pressed 'get location' button");
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("user location:", position);
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude
          }
        });
      },
      err => {
        console.log("error getting user location:", err);
        this.setState({
          error: JSON.stringify(err)
        });
      },
      {
        //maximumAge: Infinity,
        timeout: 5000,
        enableHighAccuracy: true
      }
    );
  };

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    //Alert.alert(notif.title, notif.message);
    this.props.navigation.navigate("Animation", {
      title: "MON DÉFI",
      text: notif.userInfo.text
    });
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }

  navToDetail = () => {
    this.props.navigation.navigate("Details");
    console.log("Navigate to Details page");
  };

  randomDefis = () => {
    const Defis = [
      {
        text: "quels moments de ma journée je peux remercier?",
        time: 0,
        type: "Merci"
      },
      {
        text:
          "prends quelques minutes pour identifier la dernière bonne chose qui t'est arrivée et murmure un remerciement",
        time: 0,
        type: "Merci"
      },
      {
        text:
          "avant de t'endormir, remonte ta journée en esprit et murmure tes remerciements pour les petits bonheurs que tu as vécus",
        time: 0,
        type: "Merci"
      }
    ];
    Defis.forEach(defi => {
      let time = new Date(
        Date.now() + Math.floor(Math.random() * 60 + 1) * 60 * 1000
      );
      defi.time = time;
      this.notif.scheduleNotif(defi.text, time);
      console.log("defi: ", defi.text, "\n will be notified on", time);
    });
    console.log(Defis);
  };

  render() {
    let location = null;
    //console.log("etat initial:", this.state);
    if (this.state.userLocation) {
      //console.log("defining location:", this.state.userLocation);
      location = (
        <View style={{ margin: 20 }}>
          {Object.keys(this.state.userLocation).map(key => (
            <Text key={key}>
              {key} : {this.state.userLocation[key]}
            </Text>
          ))}
        </View>
      );
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="back" onPress={this.navToDetail} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.localNotif(
              "quels moments de ma journée je peux remercier?"
            );
          }}
        >
          <Text>Lancer un défis maintenant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.randomDefis}>
          <Text>Lancer 3 défis aléatoires dans l'heure</Text>
        </TouchableOpacity>
        <FetchLocation
          title="Get User Location"
          onGetLocation={this.getUserLocationHandler}
        />
        {location}
        <Text style={{ margin: 50, color: "red" }}>{this.state.error}</Text>
      </View>
    );
  }
}

export default HomeScreen;
