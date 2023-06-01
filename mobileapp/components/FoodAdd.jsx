import { View , Text } from "react-native";
import { TextInput } from "react-native-paper";
import { useAuth } from "../contexts/auth";

export default function FoodAdd(){
    return (
        <View>
            <TextInput placeholder="Add your own food!"/>
        </View>
    )
}