import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import { supabase } from '../lib/supabase';
export default function Cam() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [curImage, setCurImage] = useState(null);
  const [prediction,setPrediciton] = useState(null);
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
    const { data, error } = await supabase.storage.from('images').upload(`${new Date().getTime()}`,photo,{contentType: "jpg",});
    if (error == null){
      inference(data.path);
    }
  }
  onPictureSaved = photo => {
      setCurImage(photo);
      upload(photo);
  } 
  inference = photoid =>{
    const apiurl=process.env['INFER_URL']
    const baseurl=process.env['IMAGE_STORAGE_URL']
    fetch(apiurl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: baseurl+photoid,
      }),
    }).then(
      rep=> rep.json()
    ).then(
      json=> {
        console.log(json.prediction);
        setPrediciton(json.prediction);
      }
    )

  }
  return (
    <View style={styles.container}>
      <Text> Search using a photo!</Text>
      <Camera style={styles.camera} type={type} ref={(ref) => { this.camera = ref }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.takePicture}>
            <Text style={styles.text}>Take photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Text>{prediction}</Text>
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
