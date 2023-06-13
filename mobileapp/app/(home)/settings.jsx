import { supabase } from "../../lib/supabase";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Consumption from "../../components/CheckDailyConsumption";



export default function SettingsPage(){
    return (
        <View alignItems = "center">
            <Consumption></Consumption>
            <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
        </View>  
    )
}
