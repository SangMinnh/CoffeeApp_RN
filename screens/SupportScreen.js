import React from "react";
import { ImageBackground, Image, StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";

const image = { uri: "https://as2.ftcdn.net/jpg/03/66/20/27/500_F_366202711_pr7x2I2TO280Ro4Eh4knsdddercnDTbt.jpg" };

const SupportScreen = () => (
  <View style={styles.container}>
    <ImageBackground source={image}
      style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='trargba(255,0,0,0)nparent' translucent={true} />
      <View style={styles.overlay}>
        <Text style={[styles.textStyle, { paddingTop: 20 }]} >My Account</Text>
        <Image source={{ uri: 'https://thumbs.dreamstime.com/z/colorful-fast-food-seamless-pattern-junk-vector-repeating-background-textile-design-wrapping-paper-wallpaper-123091562.jpg' }}
          style={styles.avatarStyle} />
        <Text style={styles.textStyle} > Jenifer Lawrance</Text>
        <Text style={styles.textStyle} > +14155552671</Text>
      </View>
    </ImageBackground>

  </View>
);
export default SupportScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  overlay: {
    backgroundColor: 'rgba(255,0,0,0.3)',
  },
  avatarStyle: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textStyle: {
    marginTop: 10,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  balanceContainer: {
    padding: 10,
  }
});

