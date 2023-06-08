import { supabase } from '../lib/supabase';
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import {  FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';

export default  function WeightLog() {
  const [weights, setWeight] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
        <AddWeight/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
              data={weights}
              renderItem={({ item }) => <WeightItem weight={item} />}
              onRefresh={() => setRefreshing(true)}
              refreshing={refreshing}
            />
        </View>
      </View>
  );
}
function AddWeight(){
    return <View style={{justifyContent: 'center' }}>
      <Text>Date: </Text>
      <TextInput />
    </View>
}
function WeightItem({weight}) {
  return (
      <View>

      </View>
  )
}
