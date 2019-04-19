import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import LogoTitle from "../components/LogoTitle";

const styles = StyleSheet.create({
  formInput: {
    paddingLeft: 5,
    height: 50,
    borderWidth: 1,
    borderColor: "#555555",
    margin: 10
  }
});

class notes extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle title="Carnet de notes" />,
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  constructor() {
    super();
    this.state = {
      text: "Entrer votre texte",
      notes: [],
      editNote: false,
      newNote: false,
      indexOfNote: null
    };
    this.retrieveNotes();
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
    delete currentNotes[ind];
    this.setState({ notes: currentNotes });
    let noteToStore = JSON.stringify(currentNotes);
    try {
      await AsyncStorage.setItem("@notes", noteToStore);
    } catch (error) {
      console.log("Error resetting data" + error);
    }
    this.setState({ editNote: false, newNote: false });
  };

  navToDetail = () => {
    this.props.navigation.navigate("Details");
    console.log("Navigate to Details page");
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
      <View>
        <TextInput
          style={styles.formInput}
          placeholder={this.state.text}
          value={this.state.text}
          onChangeText={text => this.setState({ text: text })}
        />
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            margin: 20
          }}
        >
          <View style={{ margin: 10 }}>
            <Button onPress={() => this.saveNote()} title="Save" />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              color="red"
              onPress={this.deleteNote.bind(this)}
              title="Delete"
            />
          </View>
        </View>
      </View>
    );
  };

  displayNotes = () => {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Button onPress={() => this.addNote()} title="Ajouter une note" />
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
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "skyblue",
          opacity: 0.9,
          flex: 1,
          flexDirection: "row",
          justifyContent: "center"
          //alignItems: "center"
          //justifyContent: "flex-start"
        }}
      >
        {/* <Button title="Back to Details screen" onPress={this.navToDetail} /> */}
        {this.state.editNote ? this.displayEdition() : this.displayNotes()}
      </View>
    );
  }
}

export default notes;
