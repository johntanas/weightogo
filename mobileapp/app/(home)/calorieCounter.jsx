import FoodSearch from "../../components/foodSearch";
import FoodAdd from "../../components/FoodAdd";
import {View,StyleSheet} from "react-native";
import Cam from "../../components/FoodCamera.jsx"
export default function DataScreen(){
    return(
        <View >
            <FoodSearch />
            <Cam />
        </View>
    )
}