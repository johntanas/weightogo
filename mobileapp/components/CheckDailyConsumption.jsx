import { View } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/auth";
import { Button, Text } from "react-native-paper";
import { useState } from "react";

export default function Consumption() {
    const { user } = useAuth();
    const date = new Date().toJSON();
    const [ list, setList ] = useState([]);

    async function getFoodLogs(){
        const {data, error} = await supabase.from("mealData").select().eq("user_id",user.id);
        if (error) {
            console.log(error.message);
            return;
        }
        setList(data.map(item => 
            item.inserted_at.slice(0,10)===date.slice(0,10)?item:null
        ));
        
    }
    const onSubmit = () =>{
        getFoodLogs();
    }
    
    return (
        <View>
            <Button onPress = {onSubmit}>Check</Button>
            {list.length>0?list.map(item => <Text>{item.title}, {item.calories}</Text>):<Text></Text>}
        </View>
    )
}