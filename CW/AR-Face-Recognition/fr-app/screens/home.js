import * as React from "react";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#6278e4" }}>
        <SafeAreaView style={styles.droidSafeArea}>
          <View style={styles.headingContainer}></View>
          <View style={styles.contentContainer}></View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("main");
              }}
            >
              <Text style={styles.buttonText}>Let's get started!</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText1: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    color: "#efb141",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  titleText2: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    color: "white",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  subheading1: {
    fontSize: RFValue(20),
    color: "#efb141",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  subheading2: {
    fontSize: RFValue(20),
    color: "white",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  contentContainer: {
    flex: 0.6,
    margin: RFValue(5),
    borderRadius: RFValue(15),
    backgroundColor: "white",
    height: "100%",
    padding: RFValue(20),
  },
  contentText: {
    fontSize: RFValue(17),
    fontStyle: "italic",
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#efb141",
    paddingLeft: RFValue(50),
    paddingRight: RFValue(50),
    paddingTop: RFValue(20),
    paddingBottom: RFValue(20),
    borderRadius: RFValue(20),
  },
  buttonText: {
    fontSize: RFValue(25),
    fontStyle: "italic",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});
