import { useState } from "react";
import { View , Text } from "react-native";
import { TextInput } from "react-native-paper";
import { useAuth } from "../contexts/auth";
import { SelectList } from "react-native-dropdown-select-list";

function AddMeal(){
    const [ foodItem , setFoodItem ] = useState("");
    const [ calories, setCalories ] = useState(0);
    const { user } = useAuth();

    const mealTimings = [
        {
            key : "1",
            value : "Breakfast"
        },
        {
            key : "2",
            value : "Lunch"
        },
        {
            key : "3",
            value : "Dinner"
        },
        {
            key : "4",
            value : "Snack"
        }
    ]
    return (
        <View style = {{flexDirection : "row"}}>
            <Text>Please Input Food item</Text>
            <TextInput onChangeText = {(text) => setFoodItem(text)}></TextInput>
            <Text>Please Input Calorie level</Text>
            <TextInput onChangeText = {(text) => setCalories(parseInt(text))}></TextInput>
            <SelectList 
                setSelected = {(val) = setTiming(val)}
                data = {mealTimings}
                save = "value"
                label = "Please input Timing"/>
        </View>
    )
}

// not completed yet.
