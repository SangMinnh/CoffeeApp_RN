import React, { useState } from 'react';
import { View, Text, Image, TextInput, FlatList, Button, StyleSheet, Dimensions, StatusBar, TouchableOpacity, SafeAreaView, } from 'react-native';
const W = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}

const BillView = ({ item, index }) => {
    return (
        <TouchableOpacity style={styles.billBox}>

            <View style={styles.numberBox}>
                <Text style={styles.tableNumberText}>55</Text>
            </View>
            <View style={styles.boxTotal}>
                <Text style={styles.textTotalBill}>Total Bill</Text>
                <Text style={styles.textTotalNumber}>$87</Text>
            </View>
            <View style={styles.boxTotal}>
                <Text style={styles.textStatus}>Status</Text>
                <Text style={styles.textStatusIs}>Unpaid</Text>
            </View>
        </TouchableOpacity>
    );
}

const AllBillsScreen = () => {

    const theme = useTheme();


    return (
        <View style={styles.container}>
            <SafeAreaView>
            <FocusAwareStatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.dark ? '#333333' : '#f6f6f6'} />
            <ScrollView>
                <BillView></BillView>
                <BillView></BillView>
                <BillView></BillView>
                <BillView></BillView>
                <BillView></BillView>
                <BillView></BillView>
                <BillView></BillView>
                <BillView></BillView>
                <BillView></BillView>
            </ScrollView>
            </SafeAreaView>
        </View>
    );
}
export default AllBillsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    billBox: {
        flexDirection: 'row',
        backgroundColor: '#f8d8e3',
        borderRadius: 15,
        marginHorizontal: 25,
        marginBottom: 25,
        padding: 10
    },
    numberBox: {
        width: W * 0.2,
        height: W * 0.2,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#d02860',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    tableNumberText: {
        alignSelf: 'center',
        fontSize: 35,
        color: '#d02860'
    },
    boxTotal: {
        justifyContent: 'center',
        marginHorizontal: 25
    },
    textTotalBill: {
        fontSize: 17,
        color: '#d02860',

    },
    textTotalNumber: {
        fontSize: 22,
        color: '#d02860',
        fontWeight: 'bold'
    },
    textStatus: {
        fontSize: 17,
        color: '#d02860',
    },
    textStatusIs: {
        fontSize: 22,
        color: '#d02860',
        fontWeight: 'bold'
    }


})