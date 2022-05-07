import React from "react";
import {
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import Filter1 from "./filter";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCamPermissions: null,
      faces: [],
    };
    this.getCamPermission = this.getCamPermission.bind(this);
    this.onFaceDetect = this.onFaceDetect.bind(this);
    this.onFaceDetectError = this.onFaceDetectError.bind(this);
  }
  componentDidMount() {
    this.getCamPermission()
  }
  async getCamPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({
      hasCamPermissions: status.status === "granted",
    });
  }
  onFaceDetect(faces) {
    this.setState({
      faces: faces,
    });
  };
  onFaceDetectError(err) {
    console.log(err);
  };
  render() {
    if (this.state.hasCamPermissions == null) {
      return <View></View>;
    }
    if (!this.state.hasCamPermissions) {
      return (
        <View>
          <Text>Camera Permission Denied</Text>
        </View>
      );
    }
    console.log(this.state.faces);
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.headingContainer}>
            <Text style={styles.titleText}>Face Recognition App</Text>
          </View>
          <View style={styles.cameraStyle}>
            <Camera
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
              return <Filter1 key={face.faceID} face={face} />;
            })}
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
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: { fontSize: 30 },
  cameraStyle: { flex: 0.65 },
  filterContainer: {},
  actionContainer: {},
});
