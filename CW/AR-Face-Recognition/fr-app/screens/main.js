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
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCamPermissions: null,
      faces: [],
    };
  }
  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.onCamPermission);
  }
  onCamPermission = (status) => {
    this.setState({
      hasCamPermissions: status.status === "granted",
    });
  };
  onFaceDetect = (faces) => {
    this.setState({
      faces: faces
    })
  }
  onFaceDetectError = (err) => {
    console.log(err);
  }
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
                mode: FaceDetector.Constants.mode.fast,
                detectLandmarks: FaceDetector.Constants.Landmarks.all,
                runClassifications: FaceDetector.Constants.Classifications.all,
              }}
              onFacesDetected={this.onFaceDetect}
              onFacesDetectionError={this.onFaceDetectError}
            />
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
