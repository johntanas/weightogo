import { View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
    return (
        <View>
            <CalcDisplay />
            <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
        </View>
    )
}