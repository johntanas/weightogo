import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import { supabase } from '../lib/supabase';
import flip from '../assets/flipCamera.png';
import shutter from '../assets/icon_shutterbutton.png';
export default function Cam() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [curImage, setCurImage] = useState(null);
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    
  }
  takePicture = () => {
    if (this.camera) {
        this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };
  upload= async (photo) => {
    const { data, error } = await supabase.storage.from('images').upload(`${new Date().getTime()}`,photo);
    console.log(error);
    console.log(data)
  }
  onPictureSaved = photo => {
      setCurImage(photo);
      upload(photo);
  } 
  inference = photoUrl =>{
    
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => { this.camera = ref }} pictureSize='128,128'>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.takePicture}>
            <Text style={styles.text}>Take photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
  },
  buttonContainer: {  
    marginTop:128,
    backgroundColor: 'transparent',
    flexDirection:'row',
    alignItems:'flex-end',
    display:'flex',
  },
  camera:{
    flex:'auto',
  },
  button: {
    alignItems: 'center',
    display:'flex',
    flex:1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
