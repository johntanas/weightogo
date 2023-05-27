import {View } from 'react-native';
import CalcDisplay from '../../components/CalorieCalculator';
import { Button } from 'react-native-paper';
export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CalcDisplay />
            <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
        </View>
    );
}