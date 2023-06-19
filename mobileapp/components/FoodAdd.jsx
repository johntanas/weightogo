import { View} from "react-native";
import {useState } from 'react'
import {Text, TextInput } from "react-native-paper";
import { useAuth } from "../contexts/auth";
import { Button } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import NumericInput from 'react-native-numeric-input'
export default function FoodAdd(){
    const { user } = useAuth();
    const [calories,setCalories] = useState(0)
    const [name,setName] = useState("")
    async function addToLogs() {
        const { error } = await supabase.from("mealData").insert({user_id : user.id, title : selectedItem.title, calories : selectedItem.calories});
        if (error) {
            console.log(error.message);
            return;
        }
        
        setSelectedItem(null);
    }
    const onSubmit = () => {
        addToLogs();
    }
    return (
        <View>
            <TextInput placeholder="Add your own food!"/>
            <Text> calories </Text>
            <NumericInput/>
            <Button onPress = {onSubmit}>Submit</Button>
        </View>
    )
}