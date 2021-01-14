import React, { useState, useContext } from 'react'
import { VirtualizedList, View, Text, Image, StyleSheet, Dimensions, StatusBar, Platform, TouchableOpacity, FlatList, DatePickerAndroid } from 'react-native'
const W = Dimensions.get('window').width;
import { FoodsCart } from '../model/data';

import { useIsFocused } from '@react-navigation/native';
import { TextInput, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-share';
import { Context as CartContext } from './FoodCartContext';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { color } from 'react-native-reanimated';




function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}


export default function CartScreen() {

    const { state, deleteItem } = useContext(CartContext);

    const CartItem = ({ item, index }) => {
        const { colors } = useTheme()
        const [itemState, setItemState] = useState(() => {
            return item;
        })
        function handleAmount(type) {
            //console.log("----FoodCartNow-------", foodCartNow)
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

            const newCartItemList = [...cartItemList];
            newCartItemList.splice(index, 1);
            setFoodCartNow({ ...foodCartNow, totalPrice: total, listItem: newCartItemList });
            setCartItemList(newCartItemList);

            deleteItem(itemState.id)

        }


        return (
            <View style={[styles.foodViewBox, { backgroundColor: colors.card }]}>
                <View style={[styles.foodImgDetail, { backgroundColor: colors.card }]}>
                    <View style={styles.foodImageBox} >
                        <Image style={styles.foodImage} source={require('../assets/matcha-latte.jpg')}
                            resizeMode="cover" />
                    </View>
                </View>
                <View style={styles.DetailBox}>
                    <View style={styles.foodDetail}>

                        <Text numberOfLines={2} style={[styles.nameText, { color: colors.text }]}>{itemState.title}</Text>
                        <Text style={[styles.priceText, { color: colors.text }]}>Price. ${itemState.price}</Text>
                        <View style={[styles.amountBox, { backgroundColor: colors.background }]}>
                            <TouchableOpacity onPress={() => handleAmount('remove')}>
                                <Icon name='ios-remove' color='#838383' size={26}></Icon>
                            </TouchableOpacity>

                            <View style={{ alignSelf: 'center', alignContent: 'center', width: 30 }}>
                                <Text style={{ alignSelf: 'center', alignContent: 'center', fontSize: 16, color: colors.text }}>{itemState.amount}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleAmount('add')}>
                                <Icon name='ios-add' color='#838383' size={26}></Icon>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>
                <View style={styles.edit}>
                    <TouchableOpacity onPress={() => handleDelete()}>
                        <Icon name='ios-close' color='#FF6347' size={30} ></Icon>
                    </TouchableOpacity>

                </View>


            </View >)
    }

    const theme = useTheme();
    //const { state } = useContext(CartContext);
    const { colors } = useTheme();
    const [foodCartNow, setFoodCartNow] = useState(() => {
        let total = 0;
        for (item of state) {
            total += item.price * item.amount;
        }
        return { ...FoodsCart, totalPrice: total }
    });
    const [cartItemList, setCartItemList] = useState(state);
    const renderCartItem = ({ item, index }) => {
        return (
            <CartItem item={item} index={index}
            />
        );
    };



    function handleConfirmOrder() {
        // FoodsCart = { ...foodCartNow };
        console.log(foodCartNow);
    }
    const bs = React.useRef(null);
    const fall = new Animated.Value(1);
    const renderInner = () => {
        return (
            <View style={styles.Total}>
                <View style={styles.Total1}>
                    <Text style={[styles.TotalText1, { color: colors.text }]}>Item Total</Text>
                    <Text style={[styles.TotalText1, { color: colors.text }]}>${foodCartNow.totalPrice}</Text>
                </View>
                <View style={styles.Total1}>
                    <Text style={[styles.TotalText1, { color: colors.text }]}>Discount</Text>
                    <Text style={[styles.TotalText1, { color: colors.text }]}>$0</Text>
                </View>
                <View style={styles.Total1}>
                    <Text style={[styles.TotalText2, { color: colors.text }]}>Total</Text>
                    <Text style={[styles.TotalText2, { color: colors.text }]}>${foodCartNow.totalPrice}</Text>
                </View>
                <TouchableOpacity style={[styles.confirmBtn, { backgroundColor: colors.card }]}>
                    <Text style={[styles.confirmText, { color: colors.text }]}>Confirm Order</Text>
                </TouchableOpacity>
            </View>)
    };
    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.dark ? '#333333' : '#f6f6f6'} />
            <BottomSheet
                ref={bs}
                snapPoints={[200, 40]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <ScrollView >
                <View>
                    <Text style={[styles.textOderList, { color: colors.text }]}>Order List</Text>
                    <FlatList
                        data={cartItemList}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.id}
                        //getItemCount={getItemCount}
                        vertical
                        showsVerticalScrollIndicator={false}>
                    </FlatList>
                </View>


            </ScrollView>
            <View style={{ width: W, height: 40 }} />



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
    textOderList: {
        fontSize: 18,
        marginVertical: 10,
        color: '#373737',
        //fontWeight: 'bold',
        marginLeft: 25

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
        // paddingHorizontal: 15,

        marginRight: 15
    },
    priceText: {
        fontSize: 15,
        marginLeft: 5,
        alignContent: 'center',
        color: '#373737'
    },
    Total: {
        backgroundColor: '#ffa800',
    },
    Total1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,

    },
    TotalText1: {
        fontSize: 14,
        marginLeft: 5,
        //color: '#373737'
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
        marginHorizontal: 24,
        backgroundColor: '#ffffff',
        height: 52,
        justifyContent: "center"
    },
    confirmText: {
        fontSize: 18,
        color: '#373737',
        alignSelf: 'center',
        //fontWeight: 'bold'
    },
    header: {
        backgroundColor: '#FFa800',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 60,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },


});
