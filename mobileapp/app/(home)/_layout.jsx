import { Tabs } from "expo-router";

export default function HomeScreen() {
    
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Calculator" }} />
            <Tabs.Screen name="dataset" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}