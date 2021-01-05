import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, StatusBar, Platform, TouchableOpacity, FlatList, DatePickerAndroid } from 'react-native'
const W = Dimensions.get('window').width;
import { FoodsCart } from '../model/data';

import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-share';






function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}


export default function CartScreen() {

    const CartItem = ({ item, index }) => {
        const [itemState, setItemState] = useState(() => {
            return item;
        })
        function handleAmount(type) {
            console.log("----FoodCartNow-------", foodCartNow)
            if (type === 'remove') {
                let aamount = itemState.amount - 1;
                let total = foodCartNow.totalPrice - itemState.price;
                if (aamount != 0) {
                    const newCartItemList = [...cartItemList];
                    newCartItemList.splice(index, 1, { ...itemState, amount: aamount });
                    setFoodCartNow({ ...foodCartNow, totalPrice: total, listItem: newCartItemList });
                    setCartItemList(newCartItemList);
                    console.log("----NewCartItemList: ", newCartItemList)
                }
                else handleDelete();

            }
            else {
                let aamount = itemState.amount + 1;
                let total = foodCartNow.totalPrice + itemState.price;
                const newCartItemList = [...cartItemList];
                newCartItemList.splice(index, 1, { ...itemState, amount: aamount });
                setFoodCartNow({ ...foodCartNow, totalPrice: total, listItem: newCartItemList });
                setCartItemList(newCartItemList);
                console.log("----NewCartItemList: ", newCartItemList)

            }
            //console.log("------FoodCartNow after add or remove-------", foodCartNow)
        }

        function handleDelete() {
            // console.log("----FoodCartNow-------", foodCartNow)
            let total = foodCartNow.totalPrice - itemState.price * itemState.amount;
            // const index = cartItemList.findIndex(x => x.id === item.id);
            //if (index < 0) return;
            const newCartItemList = [...cartItemList];
            newCartItemList.splice(index, 1);
            setFoodCartNow({ ...foodCartNow, totalPrice: total, listItem: newCartItemList });
            setCartItemList(newCartItemList);
            // console.log("------FoodCartNow after delete", foodCartNow)
        }


        return (
            <View style={styles.foodViewBox}>
                <View style={styles.foodImgDetail}>
                    <View style={styles.foodImageBox} >
                        <Image style={styles.foodImage} source={require('../assets/matcha-latte.jpg')}
                            resizeMode="cover" />
                    </View>
                </View>
                <View style={styles.DetailBox}>
                    <View style={styles.foodDetail}>

                        <Text numberOfLines={2} style={styles.nameText}>{itemState.title}</Text>
                        <Text style={styles.priceText}>Price. ${itemState.price}</Text>
                        <View style={styles.amountBox}>
                            <TouchableOpacity onPress={() => handleAmount('remove')}>
                                <Icon name='ios-remove' color='#838383' size={26}></Icon>
                            </TouchableOpacity>

                            <View style={{ alignSelf: 'center', alignContent: 'center', width: 30 }}>
                                <Text style={{ alignSelf: 'center', alignContent: 'center', fontSize: 16, }}>{itemState.amount}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleAmount('add')}>
                                <Icon name='ios-add' color='#838383' size={26}></Icon>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>
                <View style={styles.edit}>
                    <TouchableOpacity onPress={() => handleDelete()}>
                        <Icon name='ios-trash' color='#FF6347' size={30} ></Icon>
                    </TouchableOpacity>

                </View>


            </View >)
    }

    const { colors } = useTheme();
    const [foodCartNow, setFoodCartNow] = useState(() => {
        let total = 0;
        for (item of FoodsCart.listItem) {
            total += item.price * item.amount;
        }
        return { ...FoodsCart, totalPrice: total }
    });
    const [cartItemList, setCartItemList] = useState(FoodsCart.listItem);
    const renderCartItem = ({ item, index }) => {
        return (
            <CartItem item={item} index={index}
            />

        );
    };


    function handleConfirmOrder() {
        // FoodsCart = { ...foodCartNow };
        console.log(FoodsCart);
    }
    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle={colors.dark ? 'light-content' : 'dark-content'} backgroundColor={colors.dark ? '#ffa800' : '#ffa800'} />
            <ScrollView style={{ paddingTop: 25 }}>
                <View>
                    <FlatList
                        data={cartItemList}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.id}
                        vertical
                        showsVerticalScrollIndicator={false}>
                    </FlatList>
                </View>


            </ScrollView>
            <View style={styles.Total}>
                <View style={styles.Total1}>
                    <Text style={styles.TotalText1}>Item Total</Text>
                    <Text style={styles.TotalText1}>${foodCartNow.totalPrice}</Text>
                </View>
                <View style={styles.Total1}>
                    <Text style={styles.TotalText1}>Discount</Text>
                    <Text style={styles.TotalText1}>$0</Text>
                </View>
                <View style={styles.Total1}>
                    <Text style={styles.TotalText2}>Total</Text>
                    <Text style={styles.TotalText2}>${foodCartNow.totalPrice}</Text>
                </View>
                <TouchableOpacity style={styles.confirmBtn} onPress={() => handleConfirmOrder()}>
                    <Text style={styles.confirmText}>Confirm Order</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    foodViewBox: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginHorizontal: 20,
        marginBottom: 25,


    },
    foodImgDetail: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    },

    foodImageBox: {
        width: 115,
        height: 115,
        borderRadius: 15,
        padding: 10
    },
    foodDetail: {
        justifyContent: 'space-evenly',
        marginLeft: 10,
    },


    foodImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 15
    },
    nameText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#373737',
        fontWeight: 'bold'

    },
    nameCategory: {
        fontSize: 14,
        paddingVertical: 3,
        color: '#838383'
    },
    namePrice: {
        fontSize: 16,
        color: '#373737'
    },
    amountBox: {
        flexDirection: 'row',
        width: 130,
        backgroundColor: '#f6f6f6',
        justifyContent: 'space-around',
        padding: 2,
        borderRadius: 15
    },
    DetailBox: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',

        width: W - 190

    },
    edit: {
        justifyContent: 'space-evenly',
        marginRight: 10,

    },
    priceText: {
        fontSize: 15,
        marginLeft: 5,
        alignContent: 'center',
        color: '#373737'
    },
    Total: {

        paddingTop: 25,
        backgroundColor: '#ffa800',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },
    Total1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,

    },
    TotalText1: {
        fontSize: 14,
        marginLeft: 5,
        color: '#373737'
    },
    TotalText2: {
        fontSize: 20,
        marginLeft: 2,
        color: '#373737',
        fontWeight: 'bold'

    },
    confirmBtn: {
        borderRadius: 20,
        marginVertical: 20,
        marginHorizontal: 20,
        backgroundColor: '#ffffff',
        height: 50,
        justifyContent: "center"
    },
    confirmText: {
        fontSize: 16,
        color: '#373737',
        alignSelf: 'center',
        fontWeight: 'bold'
    }


});
