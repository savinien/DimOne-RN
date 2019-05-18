import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import HomeTop from "../components/HomeTop";
import ConfigBottomButton from "../components/ConfigBottomButton";

const styles = StyleSheet.create({
  formInput: {
    height: "80%",
    color: "darkred",
    margin: 3
  }
});

class notes extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      text: "Entrer votre note",
      notes: [],
      editNote: false,
      newNote: false,
      indexOfNote: null,
      keyBoardDisplayed: false
    };
    this.retrieveNotes();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }

  keyboardDidShow = () => {
    //alert("Keyboard Shown");
    this.setState(
      state => {
        return { keyBoardDisplayed: true };
      },
      () => {
        console.log("key board displayed");
      }
    );
  };

  keyboardDidHide = () => {
    //alert("Keyboard Hidden");
    this.setState(
      state => {
        return { keyBoardDisplayed: false };
      },
      () => {
        console.log("key board hidden");
      }
    );
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  retrieveNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("@notes");
      let retrievedNotes = JSON.parse(storedNotes);
      if (!retrievedNotes) {
        retrievedNotes = [];
      } else {
        this.setState({ notes: retrievedNotes });
        console.log("retrieved notes:", retrievedNotes);
      }
    } catch (error) {
      console.log("Error retrieving notes" + error);
    }
  };

  storeNotes = async notes => {
    try {
      const notesToStore = JSON.stringify(notes);
      console.log("Notes about to be stored:", notesToStore);
      await AsyncStorage.setItem("@notes", notesToStore);
    } catch (error) {
      console.log("Error saving notes" + error);
    }
  };

  saveNote = () => {
    let currentNotes = [...this.state.notes];
    currentNotes[this.state.indexOfNote] = this.state.text;
    console.log("saveNote, currentNotes=", currentNotes);
    this.setState(
      state => {
        return { notes: currentNotes, editNote: false, newNote: false };
      },
      () => {
        console.log("saveNote - text:", this.state.text);
        console.log("saveNote - index:", this.state.indexOfNote);
        console.log("saveNote - notes:", this.state.notes);
        this.storeNotes(this.state.notes);
        //const notesToStore = JSON.stringify(this.state.notes);
        //AsyncStorage.setItem("@notes", notesToStore);
      }
    );
    // NB: this.state n'est pas mis à jour avant le call back
    // ci-dessus du setState!!!
    /*     try {
      const notesToStore = JSON.stringify(currentNotes);
      await AsyncStorage.setItem("@notes", notesToStore);
    } catch (error) {
      console.log("Error saving notes" + error);
    }
 */
  };

  deleteNote = async ind => {
    let currentNotes = [...this.state.notes];
    //console.log("current notes before deletion:", currentNotes);
    currentNotes.splice(ind, 1);
    //console.log("current notes after deletion:", currentNotes);
    this.setState({ notes: currentNotes });
    let noteToStore = JSON.stringify(currentNotes);
    try {
      await AsyncStorage.setItem("@notes", noteToStore);
    } catch (error) {
      console.log("Error resetting data" + error);
    }
    this.setState({ editNote: false, newNote: false });
  };

  addNote = () => {
    let currentNotes = [...this.state.notes];
    let ind = currentNotes.length;
    console.log("addNote - length:", ind);
    currentNotes.push("");
    this.setState(
      state => {
        return {
          editNote: true,
          newNote: true,
          indexOfNote: ind,
          notes: currentNotes
        };
      },
      () => {
        console.log(
          "addNote - notes (within callback of setState):",
          this.state.notes
        );
        console.log(
          "addNote - index (within callback of setState):",
          this.state.indexOfNote
        );
      }
    );
    //this.forceUpdate();
    //console.log("addNote - notes", this.state.notes);
    //console.log("addNote - index:", this.state.indexOfNote);
  };

  editNote = ind => {
    this.setState(
      state => {
        return {
          editNote: true,
          indexOfNote: ind,
          text: this.state.notes[ind]
        };
      },
      () => {
        console.log("editNote - text", this.state.text);
        console.log("editNote - index:", this.state.indexOfNote);
      }
    );
  };

  displayEdition = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            opacity: 0.9
          }}
        >
          <TextInput
            style={styles.formInput}
            placeholder={this.state.text}
            multiline={true}
            value={this.state.text}
            onChangeText={text => this.setState({ text: text })}
          />
        </View>
        <View
          style={{
            margin: 1,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <View style={{ margin: 1 }}>
            <Button color="darkred" onPress={this.saveNote} title="Save" />
          </View>
          <View style={{ margin: 1 }}>
            <Button color="darkred" onPress={this.deleteNote} title="Delete" />
          </View>
        </View>
      </View>
    );
  };

  displayNotes = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "BaronNeueBold",
            fontSize: 30,
            color: "white"
          }}
        >
          MES NOTES
        </Text>
        <ScrollView>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={this.addNote}>
              <Image
                source={require("../assets/images/add-icon.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ margin: 20 }}>
            {this.state.notes.map((text, ind) => (
              <TouchableOpacity key={ind} onPress={() => this.editNote(ind)}>
                <Text key={ind} style={{ margin: 3 }}>
                  {text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  navToHome = () => {
    this.props.navigation.navigate("Details");
    console.log("Navigate to Home page");
  };

  navToConfig = () => {
    this.props.navigation.navigate("Configuration");
    console.log("Navigation to Configuration");
  };

  render() {
    return (
      /*        <ImageBackground
        source={require("../assets/images/mesnotes-backgnd.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center"
            //alignItems: "center"
            //justifyContent: "flex-start"
          }}
        >
          {this.state.editNote ? this.displayEdition() : this.displayNotes()}
        </View>
        </ImageBackground> */
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
              flex: !this.state.keyBoardDisplayed ? 2.25 : 1,
              flexDirection: "column",
              justifyContent: "space-evenly"
            }}
          >
            <ImageBackground
              source={require("../assets/images/mesnotes-backgnd.png")}
              style={{ width: "100%", height: "100%" }}
            >
              {this.state.editNote ? null : this.displayNotes()}
              {this.state.editNote ? this.displayEdition() : null}
            </ImageBackground>
          </View>
          {!this.state.keyBoardDisplayed ? (
            <ConfigBottomButton nav={this.navToConfig} imageName="notes" />
          ) : null}
        </View>
      </ImageBackground>
    );
  }
}

export default notes;
