import { Tabs } from "expo-router";

export default function HomeScreen() {
    
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Todos" }} />
            <Tabs.Screen name="dataset" />
            <Tabs.Screen name="calculator" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}