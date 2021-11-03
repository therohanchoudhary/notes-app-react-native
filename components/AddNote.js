import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { notesStore } from '../src/NotesStore'
import firestore from '@react-native-firebase/firestore'

const AddNote = ({navigation}) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const onChangeContent = textValue => setContent(textValue)
  const onChangeTitle = textValue => setTitle(textValue)

  function dateToString() {

    const date = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()

    return date + '/' + month + '/' + year + " " + hour + ":" + minute + ":" + second
  }

  return (
    <View style={styles.container}>
    <ScrollView>
        <TextInput
          label="Title"
          placeholder="Add Title..."
          style={styles.inputTitle}
          onChangeText={onChangeTitle}
          value={title}
          multiline
        />
        <TextInput
          label="Note"
          placeholder="Add Note..."
          style={styles.inputContent}
          onChangeText={onChangeContent}
          value={content}
          multiline
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if(content.length===0 || title.length===0) {
              Alert.alert('You need to complete both title and content.')
            }
            else {
              
              var dateCur = dateToString()
              var noteId = `${Math.random()+notesStore.notes.length}` 

              notesStore.addNote({title: title, content: content, id: noteId, date: `${dateCur}`})

              firestore()
              .collection('notesCollection')
              .doc(noteId)
              .set({
                title: title,
                content: content,
                id: noteId,
                date: new Date(),
              })
              .then(() => {
                  console.log('User added!');
              })

              navigation.navigate('Notes')
              setContent('')
              setTitle('')
            }
          }}>
          <Text style={styles.btnText}> + Add Note </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  btn: {
    backgroundColor: 'blue',
    margin: 5,
    padding: 9,
  },

  container : {
    padding: 25,
  },

  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  
  input: {
    height: 60,
    margin: 5,
    padding: 8,
  }
  
  
})

export default AddNote