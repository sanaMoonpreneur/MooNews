import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View
      
      className="flex-1" style={{backgroundColor:'#CEFFD3',justifyContent:'space-between'}}
    >
      {/* <LinearGradient
        colors={[ "#ffcc00", "#8a2be2"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      /> */}
      {/* <Image style={{height:200,width:200, borderRadius:100,marginTop:"1%" , position:'absolute'}} source={{uri:'https://moonpreneur.com/blog/wp-content/uploads/2020/05/cropped-fevicon_3.png'}}></Image> */}
     <View>
      <View className="  max-w-[85%]  space-y-2 " style={{justifyContent:'flex-start',marginTop:100,marginLeft:15}}>
        <Text
          className=" text-4xl shadow-2xl text-black tracking-wider"
          style={{
            fontSize: wp(10),
            fontFamily: "FranklinGothic",
            
          }}
        >
          Latest articale </Text>
          <View style={{flexDirection:'row'}}>
          <Text className=" text-4xl shadow-2xl text-black tracking-wider"
          style={{
            fontSize: wp(10),
            fontFamily: "FranklinGothic",
            
          }}>with</Text>
          <View style={{backgroundColor:'#F7E277',alignItems:'center',width:125,borderWidth:1,shadowColor:'black',shadowOffset:{width:6,height:5},shadowOpacity:5,paddingHorizontal:5,marginLeft:10}}>
          <Text className=" text-4xl shadow-2xl text-black tracking-wider"
          style={{
            fontSize: wp(10),
            fontFamily: "FranklinGothic",
            
          }}>better</Text></View>
          <Text className=" text-4xl shadow-2xl text-black tracking-wider"
          style={{
            fontSize: wp(10),
            fontFamily: "FranklinGothic",
            
          }}> news
        </Text>
        </View>
        </View>
       
        <Text
          className="font-bold text-black  max-w-[95%] leading-12 tracking-wider "
          style={{
            fontSize: wp(4.5),
            fontFamily: 'FranklinGothic',
            marginTop:30,
            marginLeft:15
          }}
        >
          Discover the best news with our seamless 
        </Text>
        <Text
          className="font-bold text-black  max-w-[85%] leading-12 tracking-wider "
          style={{
            fontSize: wp(4.5),
            fontFamily: 'FranklinGothic',
            marginTop:10,
            marginLeft:15
          }}
        >
        onboarding experience.
        </Text>
        
      <TouchableOpacity style={{flexDirection:"row", justifyContent:'space-between',marginTop:40,backgroundColor:'#F7E277',width:180,borderWidth:1,shadowColor:'black',shadowOffset:{width:6,height:5},shadowOpacity:5,paddingHorizontal:5,marginLeft:10}}
        // className="bg-white rounded-full p-4 items-center w-[90%] mt-8 mb-4" 
        onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text className=" text-4xl shadow-2xl text-black tracking-wider"
          style={{
            fontSize: wp(5),
            fontFamily: "FranklinGothic",
            marginLeft:13
          }}>Get Started</Text>
          <View style={{borderLeftWidth:1,height:40,paddingTop:5,alignItems:'center'}}> 
          <Ionicons name="arrow-forward" size={30} color="black" />
          </View>
      </TouchableOpacity>
      </View>
      <View style={{alignItems:'flex-end'}}>
      <Image style={{height:500,width:350}} source={require('../constants/file.png')}></Image>
      </View>
    </View>
  );
}
