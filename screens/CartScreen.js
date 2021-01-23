import React, { useState, useContext } from 'react'
import { VirtualizedList, Modal, View, Text, Image, StyleSheet, Dimensions, StatusBar, Platform, TouchableOpacity, FlatList, DatePickerAndroid, SafeAreaView } from 'react-native'
const W = Dimensions.get('window').width;
import { FoodsCart } from '../model/data';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { TextInput, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-share';
import { Context as CartContext } from './FoodCartContext';
import { Context as BillsContext } from './AllBillsContext';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { color } from 'react-native-reanimated';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

import Feather from 'react-native-vector-icons/Feather';


function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}


export default function CartScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const { state, deleteItem, handleItemAmount, clearCart } = useContext(CartContext);
    const { addNewBill } = useContext(BillsContext);

    const uuidv4 = () => {
        return 'xxx-xxx-4xx-yxx-xxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function handleConfirm() {
        const id = uuidv4();
        addNewBill(foodCartNow, state, id, () => {
            clearCart()
            navigation.pop()
            showMessage({
                message: `Awesome! New Bill has been Added!`,
                type: "success",
                icon: 'success'
            });

        })
    }
    const CartItem = ({ item, index }) => {
        const { colors } = useTheme()
        const [itemState, setItemState] = useState(() => {
            return item;
        })



        function handleNowAmount(type) {
            //console.log("----FoodCartNow-------", foodCartNow)
            if (type === 'remove') {
                let aamount = itemState.amount - 1;
                let total = foodCartNow.totalprice - itemState.price;
                if (aamount != 0) {
                    const newCartItemList = [...cartItemList];
                    newCartItemList.splice(index, 1, { ...itemState, amount: aamount });
                    setFoodCartNow({ ...foodCartNow, totalprice: total });
                    setCartItemList(newCartItemList);
                    handleItemAmount(newCartItemList);
                    console.log("----NewCartItemList: ", newCartItemList)

                }
                else {
                    handleDelete();
                    navigation.pop();
                    showMessage({
                        message: `Your Food Cart is Empty now!`,
                        type: "info",
                        icon: 'warning'
                    });
                }

            }
            else {
                let aamount = itemState.amount + 1;
                let total = foodCartNow.totalprice + itemState.price;
                const newCartItemList = [...cartItemList];
                newCartItemList.splice(index, 1, { ...itemState, amount: aamount });
                setFoodCartNow({ ...foodCartNow, totalprice: total });
                setCartItemList(newCartItemList);
                handleItemAmount(newCartItemList);
                console.log("----NewCartItemList: ", newCartItemList)

            }
            //console.log("------FoodCartNow after add or remove-------", foodCartNow)

        }
        function handleDelete() {

            deleteItem(item.id, () => {
                showMessage({
                    message: `${item.title} has been removed from your cart.`,
                    type: "danger",
                    icon: 'danger'
                });
            })
            const total = foodCartNow.totalprice - itemState.price * itemState.amount;
            const newCartItemList = [...state];
            newCartItemList.splice(index, 1);
            setFoodCartNow({ ...foodCartNow, totalprice: total });
            setCartItemList(newCartItemList);
            if (total === 0) {
                navigation.pop();
                showMessage({
                    message: `Your Food Cart is Empty now!`,
                    type: "info",
                    icon: 'warning'
                });
            }
            //console.log("----FoodCartNow-------", foodCartNow)
        }


        return (
            <View style={[styles.foodViewBox, { backgroundColor: colors.card }]}>
                <View style={[styles.foodImgDetail, { backgroundColor: colors.card }]}>
                    <View style={styles.foodImageBox} >
                        <Image style={styles.foodImage} source={{ uri: `${itemState.image}` }}
                            resizeMode="cover" />
                    </View>
                </View>
                <View style={styles.DetailBox}>
                    <View style={styles.foodDetail}>

                        <Text numberOfLines={2} style={[styles.nameText, { color: colors.text }]}>{itemState.title}</Text>
                        <Text style={[styles.priceText, { color: colors.text }]}>Price. ${itemState.price}</Text>
                        <View style={[styles.amountBox, { backgroundColor: colors.background }]}>
                            <TouchableOpacity onPress={() => handleNowAmount('remove')}>
                                <Icon name='ios-remove' color='#838383' size={26}></Icon>
                            </TouchableOpacity>

                            <View style={{ alignSelf: 'center', alignContent: 'center', width: 30 }}>
                                <Text style={{ alignSelf: 'center', alignContent: 'center', fontSize: 16, color: colors.text }}>{itemState.amount}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleNowAmount('add')}>
                                <Icon name='ios-add' color='#838383' size={26}></Icon>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>
                <View style={styles.edit}>
                    <TouchableOpacity onPress={() => {
                        handleDelete()
                    }}>
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
        return { totalprice: total, table: 16 }
    });
    const [cartItemList, setCartItemList] = useState(state);
    const renderCartItem = ({ item, index }) => {
        return (
            <CartItem item={item} index={index}
            />
        );
    };

    //const { addNewBill } = useContext(BillsContext);

    // function handleConfirmOrder() {
    //     const d = new Date();
    //     const n = d.toLocaleString();
    //     const id = Math.floor(Math.random() * 995888888562);
    //     console.log('cccccccccccccccccccccccccccccccc', id)
    //     setFoodCartNow({ ...foodCartNow, time: n, idcart: id, status: 'Processing' })

    //     setTimeout(() => {
    //         console.log('Bill Detail', foodCartNow);
    //         console.log('state', state);
    //         addNewBill(foodCartNow, state)
    //     }, 2000)

    // }

    // const addNewBill = () => {
    //     return async (foodCartNow, state) => {
    //         try {
    //             await axios.post('https://uitmobile.herokuapp.com/api/foodscart/post', { ...foodCartNow });
    //             state.forEach(element => {
    //                 axios.post('https://uitmobile.herokuapp.com/api/foodscartdetail/post',
    //                     {
    //                         idfcdetail: Math.floor(Math.random() * 995),
    //                         idfoodscart: foodCartNow.idcart,
    //                         idfood: element.id,
    //                         amount: element.amount,
    //                         size: element.size
    //                     });
    //             });
    //         }
    //         catch (e) {
    //             console.log(e)
    //         }
    //         // if (callback) {
    //         //     callback();
    //         // }
    //     };
    // };


    const bs = React.useRef(null);
    const fall = new Animated.Value(1);
    const renderInner = () => {

        return (
            <View style={styles.Total}>
                <View style={styles.Total1}>
                    <Text style={[styles.TotalText1, { color: colors.text }]}>Item Total</Text>
                    <Text style={[styles.TotalText1, { color: colors.text }]}>${foodCartNow.totalprice}</Text>
                </View>
                <View style={styles.Total1}>
                    <Text style={[styles.TotalText1, { color: colors.text }]}>Discount</Text>
                    <Text style={[styles.TotalText1, { color: colors.text }]}>$0</Text>
                </View>
                <View style={styles.Total1}>
                    <Text style={[styles.TotalText2, { color: colors.text }]}>Total</Text>
                    <Text style={[styles.TotalText2, { color: colors.text }]}>${foodCartNow.totalprice}</Text>
                </View>
                <TouchableOpacity style={[styles.confirmBtn, { backgroundColor: colors.card }]}
                    onPress={() => { handleConfirm() }}>
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
    const [table, setTable] = useState('');
    return (
        <SafeAreaView style={styles.container}>

            <FocusAwareStatusBar translucent={true} barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.dark ? '#161622' : '#f6f6f6'} />
            <BottomSheet
                ref={bs}
                snapPoints={[200, 40]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <View>

                {/* <View style={[styles.textInputView, { backgroundColor: colors.card }]}>
                    <Text style={[styles.textInput, {
                        color: colors.text
                    }]}>Dilivery to Table: </Text>
                    <TextInput placeholder=''
                        placeholderTextColor={colors.text}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none">

                    </TextInput>
                </View> */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}


                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { backgroundColor: colors.card }]}>
                            {/* <Text style={styles.modalText}>Dilivery to Table</Text> */}
                            <TextInput keyboardType="number-pad"
                                value={table}
                                onChangeText={table => setTable(table)}
                                onEndEditing={() => {
                                    setModalVisible(!modalVisible);
                                    setFoodCartNow({ ...foodCartNow, table: Number(table) })
                                    // console.log(typeof (Number(table)))
                                    //console.log('ssssssssxxxss', foodCartNow)
                                }}
                                placeholder="Table" style={{ width: 100, fontSize: 25, }}></TextInput>
                            {/* <TouchableOpacity
                                style={{ ...styles.openButton, width: 130, borderRadius: 25, justifyContent: 'center', height: 50, backgroundColor: '#ffa800' }}
                                onPress={() => {

                                   
                                    console.log('ssssssssss', foodCartNow)

                                }}
                            >
                                <Text style={styles.textStyle}>CONFIRM</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </Modal>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text style={[styles.textOderList, { color: colors.text, }]}>Order List</Text>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true);
                    }} style={{ justifyContent: 'center', paddingHorizontal: 10, marginRight: 25 }}>
                        <Feather name="sliders"
                            color={colors.text}
                            size={28} />
                    </TouchableOpacity>

                </View>


                <FlatList style={{ marginBottom: 80 }}
                    data={cartItemList}
                    renderItem={renderCartItem}
                    keyExtractor={item => item.id}
                    //getItemCount={getItemCount}
                    vertical
                    showsVerticalScrollIndicator={false}>
                </FlatList>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInputView: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#ffffff',
        marginHorizontal: 25,
        borderRadius: 15,
        height: 55,

    },
    textInputViewIcon: {
        alignSelf: 'center',
        marginHorizontal: 15
    },
    textInput: {
        flex: 1,
        paddingLeft: 0,
        fontFamily: 'Poppins',
        color: '#373737',
        fontSize: 16,
        textAlignVertical: 'center'

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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: W * 0.6,
        //height: 200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',

    }
});
