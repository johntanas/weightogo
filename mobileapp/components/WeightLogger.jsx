import { supabase } from '../lib/supabase';
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import {DatePickerIOS,FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from "../contexts/auth";

export default  function WeightLog() {
  const [weights, setWeight] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  async function fetchWeight() {
      setRefreshing(true);
      let { data } = await supabase.from('weightData').select('*');
      setRefreshing(false);
      setWeight(data);
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
            renderItem={({ item }) => <WeightItem weight={item} />}
            onRefresh={() => setRefreshing(true)}
            refreshing={refreshing}
          />
        <AddWeight/>
      </View>
  );
}
function AddWeight(){
  const { user } = useAuth();
  const [chosenDate, setChosenDate] = useState(new Date());
  const [weight, setWeight ] = useState(0);
  const onSubmit = async () => {
    console.log(user.id);
    const { error } = await supabase.from('weightData').upsert({ user_id: user.id,date:chosenDate,weight:weight});
    console.log(error)
  }
    return (
      <View>
        <DatePickerIOS date={chosenDate} onDateChange={setChosenDate} mode='date'/>
        <Text> Weight</Text>
        <TextInput onChangeText={(value) =>{setWeight(value)}}></TextInput>
        <Button onPress = {onSubmit}>Submit</Button>
      </View>
      )
}
function WeightItem({weight}) {
  return (
      <View>
        <Text> {weight.date}</Text>
        <Text> {weight.weight}</Text>
      </View>
  )
}
