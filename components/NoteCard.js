import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { notesStore } from '../src/NotesStore';
import firestore from '@react-native-firebase/firestore'

const NoteCard = ({note}) => {
    console.log(note)
    return (
        <View style={styles.noteItemView}>
            <Text style={styles.noteItemTitle}>{note.title}</Text>
            <Text styles={styles.noteDate}>{note.date}</Text>
            <Text style={styles.noteItemText}>{note.content}</Text>
            <Text style={styles.noteItemDeleteIcon}  
                onPress={() => { 
                    notesStore.deleteNote(note.id) 
                    firestore()
                    .collection('notesCollection')
                    .doc(note.id)
                    .delete()
                    .then(() => {
                        console.log('Note deleted!');
                    });
                }}> 
                X
            </Text>
        </View>
    )
} 

const styles = StyleSheet.create({

    noteDate: {
        fontSize: 4,
    },

    noteItemView: {
        flexDirection: 'column',
        padding: 15,
        backgroundColor: '#CFCEED',
        borderBottomWidth: 1,
        borderColor: "#eeee",
        marginTop: 10,
    },

    noteItemText: {
        fontSize: 15,
        margin: 10,
    },

    noteItemTitle: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    
    noteItemDeleteIcon: {
        fontSize: 18,
        textAlign: 'center',
        color: 'red'
    }
})

export default NoteCard
