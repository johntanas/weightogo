import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth";
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
export default function RootLayout() {
    return (
        <AutocompleteDropdownContextProvider>
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthProvider>
        </AutocompleteDropdownContextProvider>
    )
}