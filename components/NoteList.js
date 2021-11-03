import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet, Button, ScrollView, TouchableOpacity} from 'react-native'
import Header from './Header'
import NoteCard from './NoteCard'
import { notesStore } from '../src/NotesStore';
import { observer } from 'mobx-react'
import firestore from '@react-native-firebase/firestore'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const NoteList = observer(({navigation}) => {

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
      firestore()
      .collection('notesCollection')
      .get()
      .then(querySnapshot => {
          querySnapshot.forEach(note => {

              const curNote = note.data()
              const date = curNote.date.toDate().toDateString()
              const time = curNote.date.toDate().toLocaleTimeString()

              const dateString = `${date} ${time}`
              notesStore.addNote({
                id: curNote.id, 
                date: dateString,
                title: curNote.title, 
                content: curNote.content
              })
          });
      })      
     notesStore.sortNote()
  };

    
    return (
        <View>
          <ScrollView>
        
            <Header title = "Notes App"/> 
            <Text style={styles.addText} onPress={() => navigation.navigate('Add Note')}> Add Note +</Text>
            {
              notesStore.notes.map(item => (
                <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Note Screen', {
                  note: item
                })}>
                  <NoteCard note={item}  />
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
    )
  }
)


const styles = StyleSheet.create({
    addText: {
      alignSelf: 'center',
      height: 60,
      justifyContent: 'center',
      paddingTop: 20,
    },

    boxx: {
      height: 200,
    },
    container: {
      flex: 1,
    }
    
})

export default NoteList
