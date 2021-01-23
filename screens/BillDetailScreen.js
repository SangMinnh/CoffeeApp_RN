import React, { useContext } from 'react';
const W = Dimensions.get('window').width;
import { View, Text, Button, StyleSheet, StatusBar, SafeAreaView, FlatList, Dimensions, } from 'react-native';
import { Context as BillsContext } from './AllBillsContext';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { showMessage, hideMessage } from "react-native-flash-message";

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
    const d = new Date();
    const n = d.toLocaleString();
    const renderItem = ({ item }) => {
        return (
            <View style={[styles.headerDetail]}>
                <View style={[styles.textHeader, { flexDirection: 'row' }]}>
                    <Text style={[styles.textHeader, { color: colors.text }]}>  {item.amount}  </Text>
                    <Text style={[styles.textHeader, { marginLeft: 25, color: colors.text }]}>{item.title}</Text>
                </View >

                <Text style={[styles.textHeader, { color: colors.text }]}>${item.price}  </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.dark ? '#161622' : '#f6f6f6'} />

            <ScrollView>
                {/* <View style={styles.billHeader}>
                    <View style={styles.headerLine}>
                        <Text style={[styles.textHeader, { color: colors.text, fontWeight: 'bold' }]}>Bill ID:  </Text>
                        <Text style={[styles.textHeader, { color: colors.text }]}>{bill.idCart}</Text>
                    </View>
                    <View style={styles.headerLine}>
                        <Text style={[styles.textHeader, { color: colors.text, fontWeight: 'bold' }]}>Table:  </Text>
                        <Text style={[styles.textHeader, { color: colors.text }]}>#{bill.table}</Text>
                    </View>
                    <View style={styles.headerLine}>
                        <Text style={[styles.textHeader, { color: colors.text, fontWeight: 'bold' }]}>Time:  </Text>
                        <Text style={[styles.textHeader, { color: colors.text }]}>{n}</Text>
                    </View>
                </View> */}
                <View style={[styles.boxDetail, { backgroundColor: theme.dark ? colors.card : '#f8d8e3' }]}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 28, marginVertical: 20, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={[styles.textHeader, { color: colors.text, fontWeight: 'bold' }]}>Bill ID:  </Text>
                            <Text style={[styles.textHeader, { color: colors.text, fontWeight: 'bold' }]}>Table:  </Text>
                            <Text style={[styles.textHeader, { color: colors.text, fontWeight: 'bold' }]}>Time:  </Text>
                        </View>
                        <View>
                            <Text style={[styles.textHeader, { color: colors.text }]}>{bill.idCart}</Text>
                            <Text style={[styles.textHeader, { color: colors.text }]}>#{bill.table}</Text>
                            <Text style={[styles.textHeader, { color: colors.text }]}>{bill.time}</Text>
                        </View>
                    </View>
                    <View style={[styles.headerDetail, { paddingTop: 10 }]}>
                        <View style={[styles.textHeader, { flexDirection: 'row' }]}>
                            <Text style={[styles.textHeader, { color: colors.text, fontWeight: 'bold' }]}>Qty</Text>
                            <Text style={[styles.textHeader, { marginLeft: 25, color: colors.text, fontWeight: 'bold' }]}>Item</Text>
                        </View >

                        <Text style={[styles.textHeader, { color: colors.text, fontWeight: 'bold' }]}>Price</Text>
                    </View>
                    <FlatList style={{ paddingTop: 10 }}
                        vertical
                        showsHorizontalScrollIndicator={false}
                        data={bill.listItem}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />

                    <View style={styles.Line}>
                        <View style={{

                            width: 20, height: 40, backgroundColor: colors.background, borderTopRightRadius: 50, borderBottomRightRadius: 50
                        }} />
                        <View style={{
                            alignSelf: 'center',
                            width: W - 60,
                            borderStyle: 'dashed',
                            borderWidth: 3,
                            borderColor: colors.background
                        }}>
                        </View>
                        <View style={{
                            width: 20, height: 40, backgroundColor: colors.background, borderTopLeftRadius: 50, borderBottomLeftRadius: 50
                        }} />
                    </View>


                    <View>
                        <View style={[styles.Total1]}>
                            <Text style={[styles.TotalText1, { color: colors.text }]}>Item Total</Text>
                            <Text style={[styles.TotalText1, { color: colors.text }]}>${bill.totalprice}  </Text>
                        </View>
                        <View style={styles.Total1}>
                            <Text style={[styles.TotalText1, { color: colors.text }]}>Discount</Text>
                            <Text style={[styles.TotalText1, { color: colors.text }]}>$0  </Text>
                        </View>
                        <View style={[styles.Total1, { paddingVertical: 10 }]}>
                            <Text style={[styles.TotalText2, { color: colors.text, fontWeight: 'normal' }]}>Total</Text>
                            <Text style={[styles.TotalText2, { color: colors.text }]}>${bill.totalprice} </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.payTouch}
                        onPress={() => {
                            navigation.pop();
                            showMessage({
                                message: `Awesome! Payment Successful!`,
                                type: "success",
                                icon: 'success'
                            });
                        }}>
                        <Text style={styles.payText}>CONFIRM PAYMENT</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
};

export default BillDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    billHeader: {
        padding: 25,
    },
    headerLine: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    Line: {
        flexDirection: 'row',
        display: 'flex',
        paddingVertical: 20,

        justifyContent: 'space-between'
    },
    textHeader: {
        fontSize: 20
    },
    headerDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        width: W - 20
    },
    boxDetail: {
        marginHorizontal: 10,
        marginTop: 15,
        paddingVertical: 20,
        borderRadius: 20,
        flexDirection: 'column'
    },
    Total1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,

    },
    TotalText1: {
        fontSize: 18,

        //color: '#373737'
    },
    TotalText2: {
        fontSize: 26,
        marginLeft: 2,
        color: '#373737',
        fontWeight: 'bold'
    },
    payTouch: {
        marginBottom: 10,
        marginTop: 20,
        height: 60,
        width: W * 0.7,
        borderRadius: 25,
        backgroundColor: '#d02860',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    payText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
    }

});
