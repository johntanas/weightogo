import Svg, {Circle} from "react-native-svg";
import { View , StyleSheet } from "react-native";

export default function PieChart({cals,consumed}){
    const size = 200;
    const strokeWidth = 20;
    const center = size/2;
    const radius = (size-strokeWidth)/2;
    const circumference = 2 * Math.PI * radius;

    const ratio = (cals-consumed)/cals;
    let offset = ratio*circumference;

    if (consumed > cals) {offset = 0;}
    
    return (
        <View style = {[{width : size, height : size}, styles.rotate]}>
            <Svg viewBox={`0 0 ${size} ${size}`}>
                <Circle 
                cx = {center}
                cy = {center}
                r = {radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                stroke="green"/>
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    rotate : {
        transform : [{rotateZ : "-90deg"}]
    }
})

