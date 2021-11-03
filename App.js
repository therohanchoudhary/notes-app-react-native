import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NoteList from './components/NoteList'
import AddNote from './components/AddNote'
import FullSizeNote from './components/FullSizeNote'

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Notes" component={NoteList} options={{headerShown: false}}/>
            <Stack.Screen name="Add Note" component={AddNote} />
            <Stack.Screen name="Note Screen" component={FullSizeNote}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
