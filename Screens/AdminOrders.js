import { Pressable, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import globalStyles from "../Globals/globalStyles";
import { FlatList } from "react-native-gesture-handler";
import { collection, addDoc, getDocs, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import * as Device from 'expo-device';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const AdminOrders = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [sarasaviGirls, setSarasaviGirls] = useState(false);
  const [newSarasavi, setNewSarasavi] = useState(false);
  const [nilaweli, setNilaweli] = useState(false);
  const [marbel, setMarbel] = useState(false);
  const [boysHostel, setBoysHostel] = useState(true);
  const [searchFirst, setSearchFirst] = useState(false);

  const [search, setSearch] = useState("");

  const [sarasaviGirlsList, setSarasaviGirlsList] = useState([]);
  const [newSarasaviList, setNewSarasaviList] = useState([]);
  const [nilaweliList, setNilaweliList] = useState([]);
  const [marbelList, setMarbelList] = useState([]);
  const [boysHostelList, setBoysHostelList] = useState([]);

  
  const [searchResults, setSearchResults] = useState([]);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const dataList = [
    { name: "Fried Rice", activeStatus: "pending", quantity: "2", totalPrice: "400", address: "Nilaweli Hostel" },
    { name: "Fried Rice", activeStatus: "pending", quantity: "2", totalPrice: "400", address: "Nilaweli Hostel" },
    { name: "Fried Rice", activeStatus: "pending", quantity: "2", totalPrice: "400", address: "Nilaweli Hostel" },
  ];

  useEffect(() => {
    var t = false;
    var sarasaviGirlsListSize = sarasaviGirlsList.length;
    var newSarasaviListSize = newSarasaviList.length;
    var nilaweliListSize = nilaweliList.length;
    var marbelListSize = marbelList.length;
    var boysHostelListSize = marbelList.length;
    
    const q = query(collection(db, "orders"),where("status","==","Pending"));
    const user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if(doc.data().hostel=="Sarasavi Girls"){
          var t = true;
          for (let i = 0; i < sarasaviGirlsListSize; i++) {
            if (sarasaviGirlsList[i].orderId == doc.data().orderId) {
              t = false;
              break;
            }
          }
          if (t) {
            setSarasaviGirlsList((prev) => [...prev, doc.data()]);
          }
          console.log(doc.data().orderId);
        }
        else if(doc.data().hostel=="New Sarasavi Girls"){
          var t = true;
          for (let i = 0; i < newSarasaviListSize; i++) {
            if (newSarasaviList[i].orderId == doc.data().orderId) {
              t = false;
              break;
            }
          }
          if (t) {
            setNewSarasaviList((prev) => [...prev, doc.data()]);
          }
        }
        else if(doc.data().hostel=="Nilaweli Boys"){
          var t = true;
          for (let i = 0; i < nilaweliListSize; i++) {
            if (nilaweliList[i].orderId == doc.data().orderId) {
              t = false;
              break;
            }
          }
          if (t) {
            setNilaweliList((prev) => [...prev, doc.data()]);
          }
        }
        else if(doc.data().hostel=="Marbel Girls"){
          var t = true;
          for (let i = 0; i < marbelListSize; i++) {
            if (marbelList[i].orderId == doc.data().orderId) {
              t = false;
              break;
            }
          }
          if (t) {
            setMarbelList((prev) => [...prev, doc.data()]);
          }
        }
        else if(doc.data().hostel=="Boys Hostel"){
          var t = true;
          for (let i = 0; i < boysHostelListSize; i++) {
            if (boysHostelList[i].orderId == doc.data().orderId) {
              t = false;
              break;
            }
          }
          if (t) {
            setBoysHostelList((prev) => [...prev, doc.data()]);
          }
        }
      });
    });
  }, []);

  const onDelivered = () => {
    registerForPushNotificationsAsync().then(token => console.log(token)).catch(err=>console.log(err));

    // This listener is fired whenever a notification is received while the app is foregrounded
    
  };

  const OnBtnClick = (btn) => {
    switch (btn) {
      case "boys":
        setBoysHostel(true);
        setSarasaviGirls(false);
        setMarbel(false);
        setNilaweli(false);
        setNewSarasavi(false);
        setSearchFirst(false);
        break;
      case "sarasavi":
        setSarasaviGirls(true);
        setBoysHostel(false);
        setMarbel(false);
        setNilaweli(false);
        setNewSarasavi(false);
        setSearchFirst(false);
        break;
      case "newSarasavi":
        setNewSarasavi(true);
        setSarasaviGirls(false);
        setBoysHostel(false);
        setMarbel(false);
        setNilaweli(false);
        setSearchFirst(false);
        break;
      case "marbel":
        setMarbel(true);
        setSarasaviGirls(false);
        setNewSarasavi(false);
        setBoysHostel(false);
        setNilaweli(false);
        setSearchFirst(false);
        break;
      case "nilaweli":
        setNilaweli(true);
        setSarasaviGirls(false);
        setNewSarasavi(false);
        setBoysHostel(false);
        setMarbel(false);
        setSearchFirst(false);
        break;
    }
  };

  const onSearchPress = (ss) => {
    setSearchResults([]);
    setSearchFirst(true);
    if(boysHostel){
      //setSearchResults([...boysHostelList])
      for(let i=0;i<boysHostelList.length;i++){
        if(boysHostelList[i].userName==ss){
          setSearchResults([boysHostelList[i]]);
          break;
        }
      }
    }
    else if(sarasaviGirls){
      for(let i=0;i<sarasaviGirlsList.length;i++){
        if(sarasaviGirlsList[i].userName==ss){
          setSearchResults([sarasaviGirlsList[i]]);
          break;
        }
      }
    }
    else if(nilaweli){
      for(let i=0;i<nilaweliList.length;i++){
        if(nilaweliList[i].userName==ss){
          setSearchResults([nilaweliList[i]]);
          console.log(global.searchList);
          break;
        }
      }

    }
    else if(marbel){
      for(let i=0;i<marbelList.length;i++){
        if(marbelList[i].userName==ss){
          setSearchResults([marbelList[i]]);
          break;
        }
      }
    }
    else if(newSarasavi){
      for(let i=0;i<newSarasaviList.length;i++){
        if(newSarasaviList[i].userName==ss){
          setSearchResults([newSarasaviList[i]]);
          break;
        }
      }
    }

  };

  const sendPushNotification=async(expoPushToken) =>{
    // const message = {
    //   to: expoPushToken,
    //   sound: 'default',
    //   title: 'Original Title',
    //   body: 'And here is the body!',
    //   data: { someData: 'goes here' },
    // };
  
    // await fetch('https://exp.host/--/api/v2/push/send', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Accept-encoding': 'gzip, deflate',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(message),
    // });
  }
  
  const registerForPushNotificationsAsync=async()=> {
    let token;
    const {status}=await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if(status!='granted'){
      const {status}=await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if(status!='granted'){
      alert('Fail to get the push token');
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync());
    return token;
    // let token;
    // if (Device.isDevice) {
    //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //   let finalStatus = existingStatus;
    //   if (existingStatus !== 'granted') {
    //     const { status } = await Notifications.requestPermissionsAsync();
    //     finalStatus = status;
    //   }
    //   if (finalStatus !== 'granted') {
    //     alert('Failed to get push token for push notification!');
    //     return;
    //   }
    //   token = (await Notifications.getExpoPushTokenAsync()).data;
    //   console.log(token);
    // } else {
    //   alert('Must use physical device for Push Notifications');
    // }
  
    // if (Platform.OS === 'android') {
    //   Notifications.setNotificationChannelAsync('default', {
    //     name: 'default',
    //     importance: Notifications.AndroidImportance.MAX,
    //     vibrationPattern: [0, 250, 250, 250],
    //     lightColor: '#FF231F7C',
    //   });
    // }
  
    //return token;
  }
 
  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Orders To Deliver</Text>
      </View>
      <View style={styles2.hostelBtnContainer}>
        <Pressable style={boysHostel ? [styles2.hostelBtn, styles2.active] : [styles2.hostelBtn]} onPress={() => OnBtnClick("boys")}>
          <Text style={styles2.btnContent}>Boys Hostel</Text>
        </Pressable>
        <Pressable style={!sarasaviGirls ? styles2.hostelBtn : [styles2.hostelBtn, styles2.active]} onPress={() => OnBtnClick("sarasavi")}>
          <Text style={styles2.btnContent}>Sarasavi Girls</Text>
        </Pressable>
        <Pressable style={!newSarasavi ? styles2.hostelBtn : [styles2.hostelBtn, styles2.active]} onPress={() => OnBtnClick("newSarasavi")}>
          <Text style={styles2.btnContent}>New Sarasavi Girls</Text>
        </Pressable>
        <Pressable style={!nilaweli ? styles2.hostelBtn : [styles2.hostelBtn, styles2.active]} onPress={() => OnBtnClick("nilaweli")}>
          <Text style={styles2.btnContent}>Nilaweli Boys</Text>
        </Pressable>
        <Pressable style={!marbel ? styles2.hostelBtn : [styles2.hostelBtn, styles2.active]} onPress={() => OnBtnClick("marbel")}>
          <Text style={styles2.btnContent}>Marbel Girls</Text>
        </Pressable>
      </View>
      <View style={styles2.notificationBtn}>
        <Text style={styles2.notificationcontent}>Send Notification</Text>
      </View>
      <View style={styles2.searchItems}>
        <TextInput placeholder="Search Order" style={styles2.search} onChangeText={(val)=>setSearch(val)}/>
        <Pressable onPress={()=>onSearchPress(search)} style={styles2.searchBtn}>
          <Text style={styles2.searchBtnContent}>Search</Text>
        </Pressable>
      </View>
      <View style={styles.itemListContainer}>
        <FlatList
          data={searchFirst?searchResults:(boysHostel?boysHostelList:(sarasaviGirls?sarasaviGirlsList:(newSarasavi?newSarasaviList:(nilaweli?nilaweliList:marbelList))))}
          
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemTitle}>
                <Text style={styles.itemTitleContent}>{item.itemName}</Text>
              </View>
              <View style={styles.quantityPriceContainer}>
                <Text style={styles.quantity}>UserName: {item.userName}</Text>
              </View>
              <View style={styles.quantityPriceContainer}>
                <Text style={styles.quantity}>Order Id: {item.orderId}</Text>
              </View>
              <View style={styles.quantityPriceContainer}>
                <Text style={styles.quantity}>Qty:{item.quantity}</Text>
                <Text style={styles.price}>Rs. {item.total}/-</Text>
              </View>
              <View style={styles.addressContainer}>
                <View style={styles.address}>
                  <Text style={styles.addressContent}>Hostel: {item.hostel}</Text>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={onDelivered} style={styles.btn}>
                  <Text style={styles.btnText}>Mark As Delivered</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AdminOrders;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  titleContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    width: "100%",
    fontSize: 28,
    color: "coral",
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
  },

  itemListContainer: {
    flex: 1,
    marginTop: 20,
  },

  itemContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#bfbfbf",
    marginBottom: 20,
    padding: 20,
  },

  itemTitle: {
    width: "100%",
    marginBottom: 3,
  },

  itemTitleContent: {
    width: "100%",
    fontSize: 24,
    fontWeight: "800",
    color: "coral",
  },

  quantityPriceContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  quantity: {
    fontSize: 18,
    color: "#bfbfbf",
  },

  price: {
    fontSize: 24,
  },

  addressContainer: {
    width: "100%",
    marginBottom: 10,
  },

  addressContent: {
    fontSize: 18,
    fontWeight: "800",
    color: "#bfbfbf",
  },

  btnContainer: {
    width: "100%",
  },

  btn: {
    width: "100%",
    height: 50,
    backgroundColor: "coral",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});

const styles2 = StyleSheet.create({
  hostelBtnContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  hostelBtn: {
    width: 112,
    height: 50,
    backgroundColor: "#BFBFBF",
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  btnContent: {
    textAlign: "center",
    color: "white",
  },

  active: {
    backgroundColor: "coral",
  },

  notificationBtn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "coral",
    borderRadius: 8,
  },

  notificationcontent: {
    fontWeight: "800",
    color: "white",
    width: "100%",
    textAlign: "center",
  },

  searchItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  search: {
    flex: 1,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 10,
    borderRadius: 8,
    borderColor: "#bfbfbf",
    borderWidth: 1,
  },

  searchBtn: {
    width: 100,
    height: 50,
    alignItems: "center",
    backgroundColor: "#bfbfbf",
    justifyContent: "center",
    borderRadius: 8,
  },

  searchBtnContent: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
});
