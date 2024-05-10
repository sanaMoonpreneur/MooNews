import { View, Text, ImageBackground,Image } from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeInDown,FadeOut,ZoomIn } from "react-native-reanimated";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreens() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    
    FranklinGothic:require('../fonts/FranklinGothic.ttf'),
    FranklinGothicCondensed:require('../fonts/FranklinGothicCondensed.ttf'),
    FranklinGothicItalic:require('../fonts/FranklinGothicITALIC.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    setTimeout(() => {
      navigation.navigate("Welcome"); // Navigate to HomeTab
    }, 2000); // 2 seconds delay
  });

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{backgroundColor:'black'}}
      // source={require("../../assets/images/welcome/reporter.jpg")}
      className="flex-1 justify-center items-center" 
    >
      {/* <LinearGradient
        colors={[  "#CEFFD3",'#c8c0ff','#BFECFF','#F2F7BD','#fac47d']}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      /> */}
      
      <Animated.View entering={ZoomIn.delay(100).springify()} className="flex items-center">
       
      <Text style={{fontFamily:'FranklinGothic',fontSize:50,color:'white',marginTop:10}}>Daily News</Text>  

                
      </Animated.View>
     
              
    
     
    </View>
  );
}
