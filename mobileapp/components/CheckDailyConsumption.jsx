import { FlatList, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/auth";
import { Button, Text } from "react-native-paper";
import { useState , useEffect } from "react";
import PieChart from "./calorieChart";


export default function Consumption() {
    const { user } = useAuth();
    const date = new Date().toJSON();
    const [ list, setList ] = useState([]);
    const [ consumed, setConsumed ] = useState(0);
    const [ consumedCals, setConsumedCals ] = useState(0);
    const [cals, setCals] = useState(0);

    async function gettingMaintenanceCals() {
        const { data , error} = await supabase.from("rmrData").select().eq("user_id",user.id);
        if (error){
            console.log("Error occurred! Have you calculated your calories?")
            // change to appear on screen instead but next time.
            return;
        }
        else {setCals(data[0].maintenanceCals);}
    }

    async function getFoodLogs(){
        const {data, error} = await supabase.from("mealData").select().eq("user_id",user.id);
        if (error) {
            console.log(error.message);
            return;
        }
        else{
        setList(data.map(item => 
            item.inserted_at.slice(0,10)===date.slice(0,10)?item:null
        ));
        setConsumed(data.map(item => 
            item.inserted_at.slice(0,10)===date.slice(0,10)?parseInt(item.calories):null
        ));
        let filler = consumed.reduce((a,b) => a+b, 0)
        setConsumedCals(parseInt(filler));
        }
        
    }
    
    useEffect(() => {
        gettingMaintenanceCals();
        getFoodLogs();
    },[])

    const onPress= () =>{
        gettingMaintenanceCals();
        getFoodLogs();
    }
    
    // debug : does it appear when u add a new one after ur first initial render?
    const [ toggleListView, setToggle ]  = useState(false);

    const onToggle = () => {setToggle(!toggleListView);}

    return (
        <View style = {{alignItems : "center"}}>
            {cals !== 0?<Text>Your maintenance calories are : {cals}</Text>:<Text></Text>}
            <PieChart cals = {cals} consumed = {consumedCals} />
            <Text>You have consumed : {consumedCals} calories</Text>
            <Button onPress = {onPress}>Refresh</Button>
            <Button onPress = {onToggle}>See Food Logs for Today!</Button>
            {toggleListView?list.map(item => item!==null?<Text>{item.title}, {item.calories}</Text>:null):null}
            {/* {list.length>0?list.map(item => <Text> {item.title}, {item.calories}</Text>):<Text></Text>} */}
        </View>
    )
}