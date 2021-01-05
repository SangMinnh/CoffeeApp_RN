import React, { useState } from 'react';
import { View, Text, Image, TextInput, FlatList, Button, StyleSheet, Dimensions, StatusBar, TouchableOpacity, } from 'react-native';
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

const AllBillsScreen = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle={colors.dark ? 'light-content' : 'dark-content'} backgroundColor={colors.dark ? '#d02860' : '#d02860'} />
        </View>
    );
}
export default AllBillsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})