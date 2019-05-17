import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  Alert
} from "react-native";
import HomeTop from "../components/HomeTop";
import NotifService from "../NotifService";
import appConfig from "../app.json";
import TimePicker from "../components/TimePicker";
import DefisPicker from "../components/DefisPicker";
import DefisService from "../services/DefisService";

class configurationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choiceAvatar: true,
      choiceSound: false,
      setAlarm: false,
      title: "MON COMPAGNON",
      senderId: appConfig.senderID,
      error: " "
    };

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this)
    );

    this.defisService = new DefisService();
  }

  componentDidMount = async () => {
    let restTimes = await this.defisService.restrieveRestTimesAsync();
    let defisNumber = await this.defisService.retrieveDefisNumber();
    this.setState(
      state => {
        return {
          restTimeStart: restTimes.restTimeStart1,
          restTimeEnd: restTimes.restTimeEnd1,
          restTimeStart2: restTimes.restTimeStart2,
          restTimeEnd2: restTimes.restTimeEnd2,
          numberOfDefis: defisNumber
        };
      },
      () => {
        console.log("rest times initialized", restTimes);
        console.log("defis number initialized", defisNumber);
      }
    );
  };

  static navigationOptions = {
    header: null
  };

  navToHome = () => {
    this.defisService.setRestTimes(
      this.state.restTimeStart,
      this.state.restTimeEnd,
      this.state.restTimeStart2,
      this.state.restTimeEnd2
    );
    this.defisService.setDefisNumber(this.state.numberOfDefis);
    this.defisService.setAllowedDefisTimes(
      this.state.restTimeStart,
      this.state.restTimeEnd,
      this.state.restTimeStart2,
      this.state.restTimeEnd2
    );
    if (this.defisService.checkAllowedDefisTimes()) {
      this.scheduleDefis();
      this.props.navigation.navigate("Details");
      //this.defisService.scheduleDefis(() => this.notif.localNotif());

      console.log("Navigate to Home page");
    } else {
      Alert.alert(
        "désactiver les défis?",
        "les périodes 'ne pas déranger' que vous avez réglées recouvrent les 24h de votre journée",
        [
          {
            text: "confimer",
            onPress: () => {
              console.log("Navigate to Home page");
              this.props.navigation.navigate("Details");
            }
          },
          {
            text: "annuler",
            onPress: () => {
              console.log("stay on page to change defis times");
            }
          }
        ]
      );
    }
  };

  chooseAvatar = () => {
    this.setState(
      state => {
        return { choiceAvatar: false, choiceSound: true };
      },
      () => {
        console.log("avatar chosen - choice of sound");
      }
    );
  };

  chooseSound = () => {
    this.setState(
      state => {
        return { choiceSound: false, title: "MES DÉFIS", setAlarm: true };
      },
      () => {
        console.log("sound chosen - set alarms");
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
      text: Platform.OS === "ios" ? notif.data.text : notif.userInfo.text
      //text: notif.data.text
      //text:  notif.userInfo.text
    });
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }

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

  scheduleDefis = () => {
    this.notif.cancelAll();
    console.log("scheduling defis...");
    let numDays = 30; // can set this up to 30 days!
    for (i = 0; i < numDays; i++) {
      for (j = 0; j < this.state.numberOfDefis; j++) {
        //console.log("whithin second for j loop");
        let date = this.defisService.generateDefisScheduleTime(i);
        let defi = this.defisService.getRandomDefi();
        if (date) {
          this.notif.scheduleNotif(defi.text, new Date(date.getTime()));
          console.log("defi:", defi.text, ", will be scheduled at:", date);
        }
      }
    }
  };

  increaseNumberOfDefis = () => {
    if (this.state.numberOfDefis < 5) {
      this.setState(
        state => {
          return { numberOfDefis: this.state.numberOfDefis + 1 };
        },
        () => {
          console.log("increased number of defis:", this.state.numberOfDefis);
        }
      );
    }
  };

  decreaseNumberOfDefis = () => {
    if (this.state.numberOfDefis > 0) {
      this.setState(
        state => {
          return { numberOfDefis: this.state.numberOfDefis - 1 };
        },
        () => {
          console.log("decreased number of defis:", this.state.numberOfDefis);
        }
      );
    }
  };

  increaseRestTimeStart = () => {
    this.setState(
      state => {
        return { restTimeStart: (this.state.restTimeStart + 1) % 24 };
      },
      () => {
        console.log("increased rest time start:", this.state.restTimeStart);
      }
    );
  };

  decreaseRestTimeStart = () => {
    this.setState(
      state => {
        return {
          restTimeStart: (((this.state.restTimeStart - 1) % 24) + 24) % 24
        };
      },
      () => {
        console.log("decreased rest time start:", this.state.restTimeStart);
      }
    );
  };

  increaseRestTimeEnd = () => {
    this.setState(
      state => {
        return { restTimeEnd: (this.state.restTimeEnd + 1) % 24 };
      },
      () => {
        console.log("increased rest time end:", this.state.restTimeEnd);
      }
    );
  };

  decreaseRestTimeEnd = () => {
    this.setState(
      state => {
        return {
          restTimeEnd: (((this.state.restTimeEnd - 1) % 24) + 24) % 24
        };
      },
      () => {
        console.log("decreased rest time end:", this.state.restTimeEnd);
      }
    );
  };

  increaseRestTimeStart2 = () => {
    this.setState(
      state => {
        return { restTimeStart2: (this.state.restTimeStart2 + 1) % 24 };
      },
      () => {
        console.log("increased rest time start2:", this.state.restTimeStart2);
      }
    );
  };

  decreaseRestTimeStart2 = () => {
    this.setState(
      state => {
        return {
          restTimeStart2: (((this.state.restTimeStart2 - 1) % 24) + 24) % 24
        };
      },
      () => {
        console.log("decreased rest time start2:", this.state.restTimeStart2);
      }
    );
  };

  increaseRestTimeEnd2 = () => {
    this.setState(
      state => {
        return { restTimeEnd2: (this.state.restTimeEnd2 + 1) % 24 };
      },
      () => {
        console.log("increased rest time end2:", this.state.restTimeEnd2);
      }
    );
  };

  decreaseRestTimeEnd2 = () => {
    this.setState(
      state => {
        return {
          restTimeEnd2: (((this.state.restTimeEnd2 - 1) % 24) + 24) % 24
        };
      },
      () => {
        console.log("decreased rest time end2:", this.state.restTimeEnd2);
      }
    );
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/fond.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <HomeTop nav={this.navToHome} />
          <View
            style={{
              flex: 2.5,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "BaronNeueBold",
                fontSize: 20,
                color: "white"
              }}
            >
              {this.state.title}
            </Text>
            {this.state.choiceAvatar ? (
              <ImageBackground
                source={require("../assets/images/choice-avatar.png")}
                style={{ width: "100%", height: "100%" }}
              >
                <TouchableOpacity onPress={this.chooseAvatar}>
                  <View style={{ width: "100%", height: "100%" }} />
                </TouchableOpacity>
              </ImageBackground>
            ) : null}
            {this.state.choiceSound ? (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  margin: 20
                }}
              >
                <TouchableOpacity onPress={this.chooseSound}>
                  <Image
                    source={require("../assets/images/avatar-defi.png")}
                    style={{ width: 150, height: 140 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "BaronNeueBold",
                    fontSize: 15,
                    color: "white",
                    margin: 20
                  }}
                >
                  son de la notification
                </Text>
                <Image
                  source={require("../assets/images/choice-sound.png")}
                  style={{ width: 250, height: 60 }}
                />
              </View>
            ) : null}
            {this.state.setAlarm ? (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  margin: 20
                }}
              >
                <Text style={styles.text}>Nombre de défis quotidiens</Text>
                <DefisPicker
                  number={this.state.numberOfDefis}
                  increase={this.increaseNumberOfDefis}
                  decrease={this.decreaseNumberOfDefis}
                />
                <Text style={styles.text}>
                  plages horaires "ne pas déranger"
                </Text>

                <TimePicker
                  start={this.state.restTimeStart}
                  end={this.state.restTimeEnd}
                  increaseStart={this.increaseRestTimeStart}
                  decreaseStart={this.decreaseRestTimeStart}
                  increaseEnd={this.increaseRestTimeEnd}
                  decreaseEnd={this.decreaseRestTimeEnd}
                />
                <TimePicker
                  start={this.state.restTimeStart2}
                  end={this.state.restTimeEnd2}
                  increaseStart={this.increaseRestTimeStart2}
                  decreaseStart={this.decreaseRestTimeStart2}
                  increaseEnd={this.increaseRestTimeEnd2}
                  decreaseEnd={this.decreaseRestTimeEnd2}
                />

                {/* <TouchableOpacity
                  onPress={() => {
                    this.notif.localNotif(
                      "quels moments de ma journée je peux remercier?"
                    );
                  }}
                >
                  <Text style={styles.text}>
                    Lancer une notification maintenant
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.randomDefis}>
                  <Text style={styles.text}>
                    Lancer trois notifications aléatoires dans l'heure
                  </Text>
                </TouchableOpacity> */}
              </View>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default configurationScreen;

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
    margin: 10
  }
});
