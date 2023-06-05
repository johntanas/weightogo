import FoodSearch from "../../components/foodSearch";
import FoodAdd from "../../components/FoodAdd";
import {View} from "react-native";

export default function DataScreen(){
    return(
        <View>
            <FoodSearch />
            <FoodAdd />
        </View>
    )
}