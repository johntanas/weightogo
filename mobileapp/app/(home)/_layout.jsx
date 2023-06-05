import { Tabs } from "expo-router";

export default function HomeScreen() {
    
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name = "calculator" options = {{title : "Calorie Calculator"}} />
            <Tabs.Screen name="calorieCounter" />
            <Tabs.Screen name = "settings" />
        </Tabs>
    );
}