import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { notesStore } from '../src/NotesStore'
import firestore from '@react-native-firebase/firestore'


const FullSizeNote = ({route,navigation}) => {

    const { note } = route.params

    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const onChangeContent = textValue => setContent(textValue)
    const onChangeTitle = textValue => setTitle(textValue)
    
    console.log(note)
    return (
        <View>
             <ScrollView>
             <TextInput 
                style = {styles.input}
                onChangeText={onChangeTitle}
                value={title}
                multiline
            />
            <TextInput
                style = {styles.input}
                onChangeText={onChangeContent}
                value={content}
                multiline
            />
            <Text onPress={() => {
                notesStore.updateNote({title: title, content: content, date: note.date, id: note.id})
                firestore()
                .collection('notesCollection')
                .doc(note.id)
                .update({
                    'title': title,
                    'content': content
                });
                navigation.goBack()
            }} style={styles.updateButton}> Update </Text>
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 0.5,
        padding: 20,
        margin: 10,
    },

    updateButton: {
        margin: 10,
    }
})

export default FullSizeNote
