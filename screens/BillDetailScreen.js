import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Context as BillsContext } from './AllBillsContext';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}


const BillDetailScreen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const theme = useTheme();
    const id = route.params.id;
    const { state } = useContext(BillsContext);
    const bill = state.find(selectedBill => selectedBill.idCart === id);
    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.dark ? '#161622' : '#f6f6f6'} />
            <Text>{bill.idCart}</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </SafeAreaView>
    );
};

export default BillDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
