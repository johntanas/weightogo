import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useEffect, useState } from "react";

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
        console.log(data[0].maintenanceCals);
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
    

    return (
        <View style = {{justifyContent : "space-between"}}>
            <DisplayCalories cals = {cals}></DisplayCalories>
            <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
        </View>  
    )
}
