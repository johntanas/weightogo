import React, { memo, useCallback, useState } from 'react'
import { Text} from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { supabase } from '../lib/supabase';
import FoodAdd from './FoodAdd';
export default function FoodSearch() {
    return (
        <RemoteDataSetExample />
    );
}

const RemoteDataSetExample = memo(() => {
    const [loading, setLoading] = useState(false)
    const [remoteDataSet, setRemoteDataSet] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)

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
            calories :item.Calories
        }))
        //console.log('suggestions', suggestions)
        setRemoteDataSet(suggestions)
        setLoading(false)
    }, [])

    return (
        <>
        <AutocompleteDropdown
            dataSet={remoteDataSet}
            closeOnBlur={false}
            useFilter={false}
            clearOnFocus={false}
            textInputProps={{
            placeholder: 'Start typing est...'
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
        </>
    )
})