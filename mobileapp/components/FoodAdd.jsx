import { View} from "react-native";
import {useState } from 'react'
import {Text, TextInput } from "react-native-paper";
import { useAuth } from "../contexts/auth";
import { Button } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import NumericInput from 'react-native-numeric-input'
export default function FoodAdd(){
    const { user } = useAuth();
    const [foodcalories,setCalories] = useState(null)
    const [foodname,setFoodname] = useState("")
    async function addToLogs() {
        const { error } = await supabase.from("mealData").insert({user_id : user.id, title : foodname, calories : foodcalories});
        if (error) {
            console.log(error.message);
            return;
        }
    }
    async function addToDatabase() {
        const { error } = await supabase.from("foodData").insert({user_id : user.id, name : foodname, calories : foodcalories});
        if (error) {
            console.log(error.message);
            return;
        }
    }
    const onSubmit = () => {
        addToLogs();
        addToDatabase();
    }
    return (
        <View>
            <TextInput placeholder="Add your own food!" onChangeText={val=>setFoodname(val)}/>
            <Text> calories </Text>
            <NumericInput onChange={(val)=> setCalories(val)}/>
            <Button onPress = {onSubmit}>Submit</Button>
        </View>
    )
}