import React from "react";
import {
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Filter1 from "./filter";
import Filter2 from "./filter2";

let data = [
  {
    "id": 1,
    "image": require("../assets/Frapp-02.png"),
  },
  {
    "id": 2,
    "image": require("../assets/Frapp-03.png"),
  },
];

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCamPermissions: true,
      faces: [],
      currentFilter: "filter1",
    };
    this.getCamPermission = this.getCamPermission.bind(this);
    this.onFaceDetect = this.onFaceDetect.bind(this);
    this.onFaceDetectError = this.onFaceDetectError.bind(this);
  }
  componentDidMount() {
    this.getCamPermission();
  }
  async getCamPermission () {
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({
      hasCamPermissions: status.status === "granted",
    });
  }
  onFaceDetect(faces) {
    this.setState({
      faces: faces,
    });
  }
  onFaceDetectError(err) {
    console.log(err);
  }
  render() {
    console.log(this.state.hasCamPermissions)
    if (this.state.hasCamPermissions === null) {
      return <View>Text</View>;
    }
    /* if (this.state.hasCamPermissions === false) {
      return (
        <View>
          <Text>Camera Permission Denied</Text>
        </View>
      );
    } */
    return (
      console.log("success"),
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea}> 
          <View style={styles.headingContainer}>
            <Text style={styles.titleText1}>Face Recognition App</Text>
          </View>
          <View style={styles.cameraStyle}>
            {/* <Camera
              style={{ flex: 1 }}
              type={Camera.Constants.Type.front}
              faceDetectorSettings={{
                mode: FaceDetector.FaceDetectorMode.fast,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                runClassifications:
                  FaceDetector.FaceDetectorClassifications.all,
              }}
              onFacesDetected={this.onFaceDetect}
              onFacesDetectionError={this.onFaceDetectError}
            />

            {this.state.faces.map((face) => {
              if (this.state.currentFilter === "filter1") {
                return <Filter1 key={face.faceID} face={face} />;
              } else if (this.state.currentFilter === "filter2") {
                return <Filter2 key={face.faceID} face={face} />;
              }
            })} */}
          </View>
          <View style={styles.framesContainer}>
            <ScrollView
              style={{ flexDirection: "row" }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {data.map((filterData) => {
                return (
                  <TouchableOpacity
                    style={styles.filterImageContainer}
                    key={`filter${filterData.id}`}
                    onPress={() => {
                      this.setState({
                        currentFilter: `filter${filterData.id}`,
                      });
                    }}
                  >
                    <Image
                      source={filterData.image}
                      style={{ height: 30, width: 70 }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6278e4",
  },
  titleText1: {
    fontSize: 30,
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
    textShadowRadius: 1,
  },
  cameraStyle: { flex: 0.65 },
  framesContainer: {
    flex: 0.2,
    paddingLeft: RFValue(20),
    paddingRight: RFValue(20),
    paddingTop: RFValue(30),
    backgroundColor: "#6278e4",
  },
  filterImageContainer: {
    height: RFPercentage(8),
    width: RFPercentage(15),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4e7f8",
    borderRadius: 30,
    marginRight: 20,
  },
});
