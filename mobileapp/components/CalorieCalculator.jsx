import { Button, Text, TextInput } from "react-native-paper";
import  { View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import { useState } from "react";


function MaintenanceCals({cals}){
    if (cals ===0){
        return (<Text></Text>);
    }
    return (
        <View>
            <Text>{cals}</Text>
        </View>)
}

export default function CalcDisplay(){

    const onSubmit =  async () => {
        const rmr = gender==="Male"?weight*9.99 + height*6.25 - 4.92*age -195:weight*9.99 + height*6/25 - 4.92*age -361;
        // i minus extra 200

        selectedCat.startsWith("0")?setMaintenanceCals(rmr*1.2):
        selectedCat.startsWith("1")?setMaintenanceCals(rmr*1.3-1.375):
        selectedCat.startsWith("3")?setMaintenanceCals(rmr*1.5-1.55):
        selectedCat.startsWith("5")?setMaintenanceCals(rmr*1.7):
        setMaintenanceCals(rmr*1.9);
    }

    const data = [
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
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [selectedCat, setSelectedCat] = useState("");
    const [gender, setGender] = useState("");
    const [maintenanceCals, setMaintenanceCals] = useState(0);
    return (
        <View>
            <Text>Your age</Text>
            <TextInput onChangeText={(text) => setAge(text)}></TextInput>
            <Text>Your weight in kilograms</Text>
            <TextInput onChangeText={(text) => setWeight(text)}></TextInput>
            <Text>Your height in centimeters</Text>
            <TextInput onChangeText={(text) => setHeight(text)}></TextInput>
            <Text>Your activity level</Text>
            <SelectList 
                setSelected={(val) => setSelectedCat(val)} 
                data={data} 
                save="value"
                label="Activity Levels" />
            <SelectList
                setSelected = {(val) => setGender(val)}
                data = {genders}
                save = "value"
                label = "Please select your gender"/>
            <Button onPress = {onSubmit}>Submit</Button>
            <MaintenanceCals cals = {maintenanceCals} />
        </View>
    )
}