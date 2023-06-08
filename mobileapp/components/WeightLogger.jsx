import { supabase } from '../lib/supabase';
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import {StyleSheet,FlatList, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { memo,useEffect, useState } from 'react';
import { useAuth } from "../contexts/auth";

export default  function WeightLog() {
  const [weights, setWeights] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  async function fetchWeight() {
      setRefreshing(true);
      let { data } = await supabase.from('weightdata').select('*');
      setRefreshing(false);
      data.sort((a,b)=> a.date>b.date ? 1 : a.date==b.date ?0 :-1);
      setWeights(data);
  }

  useEffect(() => {
    fetchWeight();
  }, []);

  useEffect(() => {
      if (refreshing) {
        fetchWeight();
        setRefreshing(false);
      }
  }, [refreshing]);
  return (
      <View>
        <FlatList
          data={weights}
          initialNumToRender={10}
          renderItem={({ item }) => <WeightItem weight={item} stateChanger={setRefreshing} />}
          onRefresh={() => setRefreshing(true)}
          refreshing={refreshing}
        />
        <AddWeight stateChanger={setRefreshing}/>
      </View>
  );
}
function AddWeight({stateChanger}){
  const { user } = useAuth();
  const [chosenDate, setChosenDate] = useState(new Date());
  const [weight, setWeight ] = useState(0);
  const onSubmit = async () => {
    const floatWeight=parseFloat(weight)
    const { error } = await supabase.from('weightdata').upsert({ user_id: user.id,date:chosenDate,weight:floatWeight},options={onConflict:"user_id,date"});
    console.log(error)
    stateChanger(true);
  }
    return (
      <View>
        <View style={styles.dateContainer}>
          <Text> Date:</Text>
          <DateTimePicker value={chosenDate} onChange={(event, date) =>setChosenDate(date)} mode='date'/>
          <Text> Weight:</Text>
          <TextInput keyboardType ='numbers-and-punctuation'  onChangeText={(value) =>{setWeight(value)}}></TextInput>
        </View>
        <Button onPress = {onSubmit}>Submit</Button>
      </View>
      )
}
function WeightItem({weight,stateChanger}) {
  const [updateWeight, setUpdateWeight ] = useState(weight.weight.toString());
  const onUpdate = async () => {
    const floatWeight=parseFloat(updateWeight)
    console.log("Updated "+weight.id)
    const { error } = await supabase
    .from('weightdata')
    .update({'weight':floatWeight})
    .eq('id', weight.id)
    console.log(error)
  }
  const onSubmit = async () => {
    const { error } = await supabase
    .from('weightdata')
    .delete()
    .eq('id', weight.id)
    stateChanger(true);
  }
  return (
      <View style={styles.dateContainer}>
        <Text>{weight.date}</Text>
        <TextInput  keyboardType ='numbers-and-punctuation' placeholder={updateWeight} onChangeText={(value) =>{setUpdateWeight(value)}} onEndEditing={onUpdate}></TextInput>
        <Button onPress = {onSubmit}>Delete</Button>
      </View>
  )
}

const styles = StyleSheet.create({
  dateContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});