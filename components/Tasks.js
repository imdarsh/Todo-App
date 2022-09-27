import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
    return (
        <View style={styles.items}>
            <View style={styles.itemsLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
            </View>
            <Text style={styles.itemsText}>{props.text}</Text>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    items : {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemsLeft : {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: 5,
    },
    itemsText : {
        maxWidth: '80%',
    },
    square : {
        width : 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
    },
    circular : {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth : 2,
        borderRadius: 5,
    }
});

export default Task;
