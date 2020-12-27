import React, { useState } from 'react';
import { View, Text, Image, TextInput, FlatList, Button, StyleSheet, Dimensions, StatusBar, TouchableOpacity, } from 'react-native';
const W = Dimensions.get('window').width;
import { Foods } from '../model/data';

import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
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
        iconName: 'ios-restaurant',

    },
    {
        id: 'Coffee',
        iconName: 'ios-cafe',

    },
    {
        id: 'Ice Cream',
        iconName: 'ios-ice-cream',

    },
    {
        id: 'Yogurt',
        iconName: 'ios-beer',
    },
    {
        id: 'Cold Drink',
        iconName: 'ios-wine',
    },
]

const Category = ({ item, onPress, styleBack, styleIcon }) => (<View style={styles.categoryStatusBox}>
    <TouchableOpacity onPress={onPress} style={[styles.categoryStatus, styleBack]}>
        <Icon name={item.iconName} color={styleIcon} size={35}></Icon>
    </TouchableOpacity>
    <Text style={styles.categoryTextStatus}>{item.id}</Text >
</View>);

const FoodView = ({ item, index }) => (
    <View style={styles.foodViewBox}>
        <View style={styles.foodImgDetail}>
            <View style={styles.foodImageBox} >
                <Image style={styles.foodImage} source={require('../assets/matcha-latte.jpg')}
                    resizeMode="cover" />
            </View>
            <View style={styles.foodDetail}>
                <View style={styles.foodDetailBox}>
                    <Text numberOfLines={2} style={styles.nameText}>{item.title}</Text>
                    <Text style={styles.nameCategory}>{item.category}</Text>
                    <Text style={styles.namePrice}>Price. ${item.price}</Text>
                </View>
            </View>
        </View>

        <TouchableOpacity style={styles.addToCcart}>
            <Icon name='ios-add' color='#838383' size={40}></Icon>
        </TouchableOpacity>
    </View>
)

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
        const backgroundColor = item.id === selectedCategoryId ? "#ff8500" : "#ffffff";
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
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle={colors.dark ? 'light-content' : 'dark-content'} backgroundColor={colors.dark ? '#ffa800' : '#ffa800'} />
            <View style={styles.sliderContainer}>
                <View style={styles.view1}>
                    <View style={styles.textInputView}>
                        <Icon style={styles.textInputViewIcon}
                            name="ios-search"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput placeholder="Search here..."
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none">

                        </TextInput>
                    </View>
                </View>
                <View style={styles.view2}>
                    <View style={styles.view3}>
                        <View style={styles.locationBox}>
                            <View style={{ marginTop: 5 }}>
                                <FontAwesome name='map-marker' color='#838383' size={32} ></FontAwesome>
                            </View>

                            <View style={{ marginLeft: 11 }}>
                                <Text style={styles.locationText1}>Trinh's House Coffee</Text>
                                <Text style={styles.locationText2}>Binh Tho, Thu Duc, HCM City</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <FlatList style={styles.listStaus}
                        data={listCategory}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedCategoryId}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                    </FlatList>

                    <View style={styles.filterResultBox}>
                        <View style={styles.resFilterTextBox}>
                            <Text style={styles.resFilterText}>{selectedCategoryId}</Text>
                        </View>
                        <FlatList
                            data={foodList}
                            renderItem={renderFoods}

                            vertical
                            showsVerticalScrollIndicator={false}>
                        </FlatList>



                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default AllFoodsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderContainer: {
        flex: 1,
        alignItems: 'center'
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
        backgroundColor: '#f6f6f6',
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
        fontSize: 15,
        fontWeight: 'bold',
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
        height: 50,

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
    categoryStatus: {
        backgroundColor: '#ff7000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        borderRadius: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 3,
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
        marginHorizontal: 30,
        marginVertical: 15
    },
    resFilterText: {
        fontSize: 18,
        fontWeight: 'bold', color: '#373737'
    },
    foodViewBox: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginHorizontal: 25,
        marginBottom: 25,
        justifyContent: 'space-between',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    foodImgDetail: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    },

    foodImageBox: {
        width: 105,
        height: 105,
        borderRadius: 15
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
        color: '#838383'
    },
    namePrice: {
        fontSize: 16,
        color: '#373737'
    },
    addToCcart: {
        justifyContent: 'center',
        paddingRight: 15,
        borderRadius: 15,
    }


});
