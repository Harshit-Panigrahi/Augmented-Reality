import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";

import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { Camera } from "expo-camera";
import Filter1 from "./filter1";
import Filter2 from "./filter2";
import Filter3 from "./filter3";

let data = [
  {
    id: 1,
    image: require("../assets/Frapp-01.png"),
  },
  {
    id: 2,
    image: require("../assets/Frapp-02.png"),
  },
  {
    id: 3,
    image: require("../assets/Frapp-03.png"),
  },
  {
    id: 4,
    image: require("../assets/Frapp-04.png"),
  },
  {
    id: 5,
    image: require("../assets/Frapp-05.png"),
  },
  {
    id: 6,
    image: require("../assets/Frapp-06.png"),
  },
  {
    id: 7,
    image: require("../assets/Frapp-07.png"),
  },
  {
    id: 8,
    image: require("../assets/Frapp-08.png"),
  },
  {
    id: 9,
    image: require("../assets/Frapp-09.png"),
  },
  {
    id: 10,
    image: require("../assets/Frapp-10.png"),
  },
];

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
    };
    this.onCameraPermission = this.onCameraPermission.bind(this);
    this.onFacesDetected = this.onFacesDetected.bind(this);
    this.onFaceDetectionError = this.onFaceDetectionError.bind(this);
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
  }

  onCameraPermission({ status }) {
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onFacesDetected({ faces }) {
    this.setState({ faces: faces });
  }

  onFaceDetectionError(error) {
    console.log(error);
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No access to camera</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.headingContainer}>
          <Text style={styles.titleText1}>FRAPP</Text>
        </View>
        <View style={styles.cameraStyle}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
          {this.state.faces.map((face) => {
            if (this.state.currentFilter === "filter1") {
              return <Filter1 key={face.faceID} face={face} />;
            } else if (this.state.currentFilter === "filter2") {
              return <Filter2 key={face.faceID} face={face} />;
            } else if (this.state.currentFilter === "filter3") {
              return <Filter3 key={face.faceID} face={face} />;
            }
          })}
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