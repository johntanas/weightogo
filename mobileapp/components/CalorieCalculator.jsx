import { Button, Text, TextInput } from "react-native-paper";
import  { View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from "../contexts/auth";
import NumericInput from 'react-native-numeric-input'

export default function CalcDisplay(){
    const [maintenanceCals, setMaintenanceCals] = useState(0);
    const { user } = useAuth();
    useEffect(()=>
    {
        supabase.from('rmrData').select('*').then(response => {
            if (response.data.length!=0){
                setData(response.data[0])
                console.log(data.maintenanceCals)
                setMaintenanceCals(data.maintenanceCals)
            }
        })
    },[]
    )
    const [data,setData] = useState({age:0,weight:0,height:0,selectedCat:"",gender:""});
    const insertRmrData = async (data) => {
        const { error } = await supabase.from('rmrData').upsert({ user_id: user.id,...data})
    }
    const calculateCalories= () =>{
        if ((data.age>0) && data.weight && data.gender && data.height && data.selectedCat &&data.weight){
            const rmr = (data.gender=="Male")?data.weight*9.99 + data.height*6.25 - 4.92*data.age -50: data.weight*9.99 + data.height*6.25 - 4.92*data.age -216;
            data.selectedCat[0]==0?setMaintenanceCals(rmr*1.2):
            data.selectedCat[0]==1?setMaintenanceCals(rmr*1.3-1.375):
            data.selectedCat[0]==3?setMaintenanceCals(rmr*1.5-1.55):
            data.selectedCat[0]==5?setMaintenanceCals(rmr*1.7):setMaintenanceCals(rmr*1.9);
            data.maintenanceCals=maintenanceCals;
        }
    }
    const onSubmit =  () => {
        calculateCalories();
        insertRmrData(data);
    }

    const activityLevel = [
        {
            key : "1",
            value : "0-1 days a week",
        },
        {
            key : "2",
            value : "1-3 days a week"
        },
        {
            key : "3",
            value : "3-4 days a week"
        },
        {
            key : "4",
            value : "5-7 days a week"
        },
        {
            key : "5",
            value : "Multiple intense activities a day"
        }
    ]
    const genders = [
        {
            key : "1",
            value : "Male",
        },
        {
            key : "2",
            value : "Female"
        }
    ]

    return (
        <View>
            <Text>Your age</Text>
            <NumericInput placeholder={data.age} onChange={(age) => setData(prevState => ({...prevState,age:age}))}></NumericInput>
            <Text>Your weight in kilograms</Text>
            <NumericInput placeholder={data.weight} onChange={(weight) => setData(prevState => ({...prevState,weight:weight}))}></NumericInput>
            <Text>Your height in centimeters</Text>
            <NumericInput placeholder={data.height} onChange={(height) => setData(prevState => ({...prevState,height:height}))}></NumericInput>
            <Text>Your activity level</Text>
            <SelectList 
                placeholder={data.selectedCat}
                setSelected={(val) => setData(prevState => ({...prevState,selectedCat:val}))} 
                data={activityLevel} 
                save="value"
                label="Activity Levels" />
            <Text>Gender</Text>
            <SelectList
                placeholder={data.gender}
                setSelected = {(val) => setData(prevState => ({...prevState,gender:val}))}
                data = {genders}
                save = "value"
                label = "Please select your gender"/>
            <Button onPress = {onSubmit}>Submit</Button>
            <View style = {{flexDirection: "row"}}>
                {maintenanceCals !== 0 && <Text>Your Maintenance Cals are : {maintenanceCals}</Text>}
            </View>
            
        </View>
    )
}