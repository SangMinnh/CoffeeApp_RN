import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, TextInput, FlatList, Button, StyleSheet, Dimensions, StatusBar, TouchableOpacity, } from 'react-native';
const W = Dimensions.get('window').width;
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Foods } from '../model/data';
import { Context as CartContext } from './FoodCartContext';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
//import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { block, color } from 'react-native-reanimated';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
}



const listCategory = [
    {
        id: 'All',
        // iconName: 'ios-restaurant',
        iconName: 'silverware-variant'
    },
    {
        id: 'Coffee',
        //iconName: 'ios-cafe',
        iconName: 'coffee-outline'

    },
    {
        id: 'Ice Cream',
        // iconName: 'ios-ice-cream',
        iconName: 'ice-cream'
    },
    {
        id: 'Yogurt',
        // iconName: 'ios-beer',
        iconName: 'food-variant'
    },
    {
        id: 'Cold Drink',
        //iconName: 'ios-wine',
        iconName: 'glass-cocktail'
    },
]

const Category = ({ item, onPress, styleBack, styleIcon }) => (
    <View style={styles.categoryStatusBox}>
        <TouchableOpacity onPress={onPress} style={[styles.categoryStatus, styleBack]}>
            <Icon name={item.iconName} color={styleIcon} size={35}></Icon>
        </TouchableOpacity>
        <Text style={styles.categoryTextStatus}>{item.id}</Text >
    </View>);

const FoodView = ({ item, index }) => {
    const { addToCart } = useContext(CartContext);
    const { colors } = useTheme();
    return (
        <TouchableOpacity style={[styles.foodViewBox, { backgroundColor: colors.card }]}>
            <View style={styles.foodImgDetail}>
                <View style={styles.foodImageBox} >
                    <Image style={styles.foodImage} source={require('../assets/matcha-latte.jpg')}
                        resizeMode="cover" />
                </View>
                <View style={styles.foodDetail}>
                    <View style={styles.foodDetailBox}>
                        <Text numberOfLines={2} style={[styles.nameText, { color: colors.text }]}>{item.title}</Text>
                        <Text style={[styles.nameCategory]}>{item.category}</Text>
                        <Text style={[styles.namePrice, { color: colors.text }]}>Price. ${item.price}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={[styles.addToCcart]} onPress={() => {
                addToCart(item.id, item.price, item.title)
                showMessage({
                    message: `${item.title} has been added to your cart.`,
                    type: "success",
                    icon: 'success',

                });
            }}>
                <Icon name='plus-circle-outline' color='#0aff0a' size={35}></Icon>
            </TouchableOpacity>
        </TouchableOpacity>)
}

const AllFoodsScreen = () => {

    const { colors } = useTheme();
    const [selectedCategoryId, setSelectedCategoryId] = useState('All');
    const [foodList, setFoodsList] = useState(Foods);
    const setFoodFilter = id => {
        if (id !== 'All') {
            setFoodsList([...Foods.filter(e => e.category === id)])
        }
        else setFoodsList(Foods)
        setSelectedCategoryId(id)
    }

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedCategoryId ? "#ff8500" : colors.card;
        const color = item.id === selectedCategoryId ? "#ffffff" : "#838383";
        return (
            <Category
                item={item}
                onPress={() => setFoodFilter(item.id)}
                styleBack={{ backgroundColor }}
                styleIcon={color}
            />
        );
    };
    const renderFoods = ({ item, index }) => {
        return (
            <FoodView
                item={item}
            />

        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlashMessage style={{ paddingTop: StatusBar.currentHeight }} position="bottom" />
            <FocusAwareStatusBar translucent={true} barStyle={colors.dark ? 'light-content' : 'dark-content'} backgroundColor={colors.dark ? '#ffa800' : '#ffa800'} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.sliderContainer}>
                <View style={styles.view1}>
                    <View style={[styles.textInputView, { backgroundColor: colors.card }]}>
                        <Icon style={styles.textInputViewIcon}
                            name="magnify"
                            color={colors.text}
                            size={28}
                        />
                        <TextInput placeholder="Search here..."
                            placeholderTextColor={colors.text}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none">

                        </TextInput>
                    </View>
                </View>

                <View style={styles.view2}>
                    <View style={[styles.view3, { backgroundColor: colors.background }]}>
                        <View style={styles.locationBox}>
                            <View style={{ marginTop: 5 }}>
                                <Feather name='map-pin' color={colors.text} size={35} ></Feather>
                            </View>

                            <View style={{ marginLeft: 11 }}>
                                <Text style={[styles.locationText1, { color: colors.text }]}>Trinh's House Coffee</Text>
                                <Text style={[styles.locationText2, , { color: colors.text }]}>Binh Tho, Thu Duc, HCM City</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <FlatList style={styles.listStaus}
                        data={listCategory}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedCategoryId}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                    </FlatList>
                </View>

                <View style={styles.filterResultBox}>
                    <View style={styles.resFilterTextBox}>
                        <Text style={[styles.resFilterText, { color: colors.text }]}>{selectedCategoryId}</Text>
                    </View>
                    <FlatList
                        data={foodList}
                        renderItem={renderFoods}

                        vertical
                        showsVerticalScrollIndicator={false}>
                    </FlatList>

                </View>

            </ScrollView>

        </SafeAreaView >
    );
};

export default AllFoodsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderContainer: {
        flex: 1,

    },
    view1: {
        backgroundColor: '#ffa800',
        borderBottomRightRadius: 50,
        height: 120,
        width: W,
        alignItems: 'center'
    },
    view2: {
        backgroundColor: '#ffa800',
        height: 110,
        width: W
    },
    view3: {
        //backgroundColor: '#f6f6f6',
        borderTopLeftRadius: 50,
        height: 110,
        width: W,
        justifyContent: 'center'
    },
    locationBox: {
        flexDirection: 'row',
        marginLeft: 38,
    },
    locationText1: {
        fontSize: 17,
        //fontWeight: 'bold',
        color: '#373737'
    },
    locationText2: {
        fontSize: 14,
        color: '#373737'
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
    categoryStatusBox: {
        marginLeft: 25
    },
    lol: {
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 3,
    },
    categoryStatus: {
        backgroundColor: '#ff7000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        borderRadius: 15,

    },
    categoryTextStatus: {
        fontSize: 14,
        marginTop: 5,
        alignSelf: 'center',
        color: '#838383'
    },
    listStaus: {

    },
    filterResultBox: {

    },
    resFilterTextBox: {
        marginHorizontal: 45,
        marginVertical: 15
    },
    resFilterText: {
        fontSize: 18,
        fontWeight: 'bold', color: '#373737'
    },
    foodViewBox: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginHorizontal: 25,
        marginBottom: 25,
        justifyContent: 'space-between',

    },
    foodImgDetail: {
        flexDirection: 'row',
        //backgroundColor: '#46465c',
        borderRadius: 15,
    },

    foodImageBox: {
        width: 115,
        height: 115,
        borderRadius: 15,
        padding: 10
    },
    foodDetail: {
        justifyContent: 'center',
        marginLeft: 15
    },
    foodDetailBox: {
    },
    foodImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 15
    },
    nameText: {
        fontSize: 16,
        color: '#373737',
        fontWeight: 'bold'
    },
    nameCategory: {
        fontSize: 14,
        paddingVertical: 3,
        color: '#979797'
    },
    namePrice: {
        fontSize: 16,
        color: '#373737'
    },
    addToCcart: {
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 15,
    }


});
