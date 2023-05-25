import {View } from 'react-native';
import CalcDisplay from '../../components/CalorieCalculator';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CalcDisplay />
        </View>
    );
}