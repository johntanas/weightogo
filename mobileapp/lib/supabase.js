import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'

const projectUrl = "https://nzuhiipfehwxwmcgsgah.supabase.co"
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dWhpaXBmZWh3eHdtY2dzZ2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4MDc5ODAsImV4cCI6MjAwMDM4Mzk4MH0.w-yxLViUAATJ-DXH1I_PFZQ1fytbZqv6tO3kDF65Q1I"

export const supabase = createClient(projectUrl, projectKey, {
    auth: {
        storage: AsyncStorage,
    }
});