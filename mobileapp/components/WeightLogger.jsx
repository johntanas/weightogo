import { supabase } from '../lib/supabase';
import { DataTable, TextInput } from 'react-native-paper';
import { View ,useState } from 'react-native';


export default  function WeightLog() {
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title Datetime>Date</DataTable.Title>
          <DataTable.Title numeric>Weight</DataTable.Title>
          <DataTable.Title numeric>Height</DataTable.Title>
        </DataTable.Header>
        <WeightAdd />
      </DataTable>
    </View>
  );
}
export function WeightAdd(){
  return (
    <TextInput />
  )
}
