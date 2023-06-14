import React, { memo, useCallback, useState } from 'react'
import { Text} from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { supabase } from '../lib/supabase';
import FoodAdd from './FoodAdd';
import { Button } from 'react-native-paper';
import { useAuth } from '../contexts/auth';

export default function FoodSearch() {
    return (
        <RemoteDataSetExample />
    );
}

const RemoteDataSetExample = memo(() => {
    const [loading, setLoading] = useState(false)
    const [remoteDataSet, setRemoteDataSet] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const { user } = useAuth();

    const getSuggestions = useCallback(async q => {
        console.log('getSuggestions', q)
        if (typeof q !== 'string' || q.length < 3) {
            setRemoteDataSet(null)
            return
        }
        setLoading(true)
        const {data} = await supabase.from('foodData').select().ilike('name',"%"+q+"%")
        const suggestions=data.map(item => ({
            id: item.id,
            title: item.name,
            calories :item.calories
        }))
        //console.log('suggestions', suggestions)
        setRemoteDataSet(suggestions)
        setLoading(false)
    }, [])
    
    async function addToLogs() {
        const { error } = await supabase.from("mealData").insert({user_id : user.id, title : selectedItem.title, calories : selectedItem.calories});
        if (error) {
            console.log(error.message);
            return;
        }
        
        setSelectedItem(null);
    }
    const onSubmit = () => {
        addToLogs();
    }

    return (
        <>
        <AutocompleteDropdown
            dataSet={remoteDataSet}
            closeOnBlur={false}
            useFilter={false}
            clearOnFocus={false}
            textInputProps={{
            placeholder: 'Search it!'
            }}
            onSelectItem={setSelectedItem}
            loading={loading}
            onChangeText={getSuggestions}
            suggestionsListTextStyle={{
                color: '#8f3c96'
            }}
            EmptyResultComponent={<FoodAdd />}
        />
        <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
        <Button onPress = {onSubmit}>Submit</Button>
        </>
    )
})