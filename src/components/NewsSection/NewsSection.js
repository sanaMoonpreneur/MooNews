import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {Grayscale} from 'react-native-color-matrix-image-filters'


export default function NewsSection({ newsProps }) {
  const navigation = useNavigation();
  const [urlList, setUrlList] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);



  // Function to format the date
  function formatDate(isoDate) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  // Hook to set the URL list
  useEffect(() => {
    const urls = newsProps.map((item) => item.url);
    setUrlList(urls);
  }, [newsProps]);

  // Function to handle click on an item
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Function to toggle bookmark and save article
  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Check if the article is already in the bookmarked list
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        // If the article is not bookmarked, add it to the bookmarked list
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        // If the article is already bookmarked, remove it from the list
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };

  // Effect to load saved articles from AsyncStorage when the component mounts
  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];

          // Check if each URL in 'urlList' exists in the bookmarked list
          const isArticleBookmarkedList = urlList.map((url) =>
            savedArticlesArray.some((savedArticle) => savedArticle.url === url)
          );

          // Set the bookmark status for all items based on the loaded data
          setBookmarkStatus(isArticleBookmarkedList);
        } catch (error) {
          console.log("Error Loading Saved Articles", error);
        }
      };

      loadSavedArticles();
    }, [navigation, urlList]) // Include 'navigation' in the dependencies array if needed
  );

  // Component to render each item in the list
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{height:200,borderBottomWidth:1, borderColor:'gray'}}
        className="space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View style={{margin:10}}>
        <View className=" justify-start flex-row w-[100%]shadow-sm" >
          {/* Image */}
          <View className="items-start justify-start w-[45%]" style={{margin:5,}}>
            <Image
              source={{
                uri:
                  item.urlToImage ||
                  "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
              style={{ width: hp(20), height: hp(20),borderRadius:10}}
              resizeMode="cover"
             
            />
          </View>

          {/* Content */}

          <View className="w-[45%] justify-start space-y-1" style={{marginTop:7,marginLeft:10}}>
           

            {/* Title */}
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white "
              style={{
                fontSize: hp(2.8),
                fontFamily: "FranklinGothic",
              }}
            >
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </Text>
             {/* Author */}
             <Text className="text-xs text-gray-500 dark:text-neutral-300" style={{
               fontSize: hp(1.7),
               fontFamily: "FranklinGothic",
             }}>
             {item?.author?.length > 20
               ? item.author.slice(0, 20) + "..."
               : item.author}
           </Text>

            {/* Date */}
            <Text className="text-xs text-gray-400 dark:text-neutral-300" style={{
                fontSize: hp(1.7),
                fontFamily: "FranklinGothic",
              }}>
              {formatDate(item.publishedAt)}
            </Text>

            </View>
          

          {/* Bookmark */}
          <View className="w-[5%] justify-end" >
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              <BookmarkSquareIcon
                color={bookmarkStatus[index] ? "#white" : "black"}
              />
            </TouchableOpacity>
          </View>

          
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="space-y-2 " >
      {/* Header */}

      <FlatList
        initialNumToRender={10}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

// useEffect(() => {

//   const loadSavedArticles = async () => {
//     try {
//       const savedArticles = await AsyncStorage.getItem("savedArticles");
//       const savedArticlesArray = savedArticles
//         ? JSON.parse(savedArticles)
//         : [];

//       // Check if each URL in 'urlList' exists in the bookmarked list
//       const isArticleBookmarkedList = urlList.map((url) =>
//         savedArticlesArray.some((savedArticle) => savedArticle.url === url)
//       );

//       // Set the bookmark status for all items based on the loaded data
//       setBookmarkStatus(isArticleBookmarkedList);
//       console.log("Check if the current article is in bookmarks");
//     } catch (error) {
//       console.log("Error Loading Saved Articles", error);
//     }
//   };

//   loadSavedArticles();
// }, [urlList]);

// contentContainerStyle={{
//         paddingBottom: hp(110),
//       }}
