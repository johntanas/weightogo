import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import PieChart from "../../components/calorieChart";
import Consumption from "../../components/CheckDailyConsumption";

function DisplayCalories({cals}){
    if (cals !== 0 ) return (
        <View>
            <Text>Your maintenance calories are : {cals}</Text>
        </View>
    )
}

export default function SettingsPage(){
    const {user} = useAuth();
    const [cals, setCals] = useState(0);

    async function gettingMaintenanceCals() {
        const { data , error} = await supabase.from("rmrData").select().eq("user_id",user.id);
        if (error){
            console.log("Error occurred! Have you calculated your calories?")
            // change to appear on screen instead but next time.
            return;
        }
        else {setCals(data[0].maintenanceCals);}
        console.log(cals);
        return;
    }
    
    useEffect(() => {
        gettingMaintenanceCals();
    },[])
    
    // to fill the consumed with the calorie counter but need the food app to work
    return (
        <View alignItems = "center">
            <DisplayCalories cals = {cals}></DisplayCalories>
            <PieChart cals={cals} consumed = {300}/>
            <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
            <Consumption></Consumption>
        </View>  
    )
}
