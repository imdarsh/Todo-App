import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      let tsk = await AsyncStorage.getItem('tasks');
      setTaskItems(JSON.parse(tsk));
    } 

    fetchdata()
  },[]);

  const handleAdd = () => {
    Keyboard.dismiss();
    AsyncStorage.setItem('tasks',JSON.stringify([...taskItems,task]))    
    setTaskItems([...taskItems, task]);
    setTask(null);

  }

  const completedTask = (index) => {
    let copyitems = [...taskItems];
    copyitems.splice(index, 1);
    setTaskItems(copyitems);
    AsyncStorage.setItem('tasks',JSON.stringify(copyitems))
  }
 
  return (
    <>
    <View style={styles.container}>
      <View style={styles.tasksWrapper}> 
        <Text style={styles.sectionTitle}>TaskList</Text>
      </View>
      <View style={styles.items}>
        {taskItems.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => completedTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
           )
        })}
      </View>
    </View>

    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
      <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={(task) => setTask(task)} />
      <TouchableOpacity onPress={() => handleAdd()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper : {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  writeTaskWrapper : {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    width: 300,
    marginLeft: 10,

  },
  addWrapper : {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginRight: 20
  }
});
