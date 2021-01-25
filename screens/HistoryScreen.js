import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
const W = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { Context as BillsContext } from './AllBillsContext';
import FlashMessage from "react-native-flash-message";
import axios from 'axios';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const HistoryScreen = ({ navigation }) => {
  const { state, getAllBills } = useContext(BillsContext)
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false)
  const onRefresh = React.useCallback(() => {
    setIsLoading(true)
    axios.get('https://uitmobile.herokuapp.com/api/foodscart/get')
      .then(function (response) {
        const his = response.data.filter(item => item.status === 'Paid');
        getAllBills(his)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        setIsLoading(false)
      });



    // const listener = navigation.addListener('didFocus', () => {
    //     getAllBills();
    // });

    // return () => {
    //     listener.remove();
    // };
  }, [isLoading]);
  const { colors } = useTheme();
  const BillView = ({ item, index, onPress }) => {
    const { colors } = useTheme();
    const theme = useTheme();
    return (
      <TouchableOpacity style={[styles.billBox, { backgroundColor: theme.dark ? colors.card : '#f8d8e3' }]}
        onPress={onPress}>

        <View style={[styles.numberBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.tableNumberText, { color: colors.text }]}>{item.table}</Text>
        </View>
        <View style={styles.boxTotal}>
          <Text style={[styles.textTotalBill, { color: colors.text }]}>Total</Text>
          <Text style={[styles.textTotalNumber, , { color: colors.text }]}>${item.totalprice}</Text>
        </View>
        <View style={styles.boxTotal}>
          <Text style={[styles.textStatus, { color: colors.text }]}>Status</Text>
          <Text style={[styles.textStatusIs, , { color: colors.text }]}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.dark ? '#161622' : '#f6f6f6'} />
      <FlatList style={{ marginTop: 10 }}
        data={state}
        onRefresh={onRefresh}
        refreshing={isLoading}
        keyExtractor={bill => bill.idCart}
        renderItem={({ item, index }) => {
          return (
            <BillView item={item} index={index} onPress={() => {
              navigation.navigate('BillDetailScreen', {
                screen: 'BillDetailScreen',
                id: item.idCart
              })
            }} />
          );
        }}
      />

      <FlashMessage position="bottom" />
    </SafeAreaView>
  );
};


export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  billBox: {
    flexDirection: 'row',
    backgroundColor: '#f8d8e3',
    borderRadius: 15,
    marginHorizontal: 30,
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
    marginLeft: 30
  },
  textTotalBill: {
    fontSize: 17,
    color: '#d02860',

  },
  textTotalNumber: {
    fontSize: 20,
    color: '#d02860',
    fontWeight: 'bold'
  },
  textStatus: {
    fontSize: 17,
    color: '#d02860',
  },
  textStatusIs: {
    fontSize: 20,
    color: '#d02860',
    fontWeight: 'bold'
  },
  filterTouch: {
    width: 100,
    height: 50,
    backgroundColor: '#2d2d37',
    //borderBottomWidth: 3,
    borderRadius: 5,
    marginHorizontal: 2
  }
});
