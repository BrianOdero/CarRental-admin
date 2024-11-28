import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

import data from '@/server/db.json'

type Data = {
  name: string,
  logo: string,
  price: string,
  carType: string,
  carModel: string,
  carPass: string,
  personLogo: string,
  topSpeed: string,
  showroom: any
}

const CurrentVehicle = () => {

  const router = useRouter()

  const renderItem : ListRenderItem<Data> = ({item}) => {
    return (
        <TouchableOpacity>
            <View style={styles.vehicleCard}>
                <View >
                    <Image source={item.logo as any} alt={item.name} style={styles.vehicleImage} resizeMode="contain"/>
                    <View style={styles.vehiclePricingView}>
                        <Text style={styles.vehicleName}>{item.name}</Text>
                        <Text style={{color: "green",textAlign:"right", margin: 10,marginHorizontal: 20}}>{item.price}</Text>
                    </View>
                </View>
                <View style={styles.vehicleData}>
                    <View style={{display: "flex", flexDirection: "row", flex: 1,margin: 5,justifyContent: "space-evenly"}}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Ionicons name={item.carType as any} size={20} color="black" style={{marginRight: 10}}/>
                            <Text>{item.carModel}</Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Ionicons name={item.personLogo as any} size={20} color="black" style={{marginRight: 10}}/>
                            <Text>{item.carPass}</Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <Ionicons name={item.carType as any} size={20} color="black" style={{marginRight: 10}}/>
                            <Text>{item.carModel}</Text>
                        </View>
                    </View>
                
                </View>
            </View>
        </TouchableOpacity>
    )
};

  return (
    <View>
       <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name.toString()}
        showsVerticalScrollIndicator={false}/>
    </View>
  )
}

export default CurrentVehicle

const styles = StyleSheet.create({
  containor:{
      backgroundColor: "white"
  },
  header:{
      fontSize: 28,
      fontWeight: "bold",
      fontFamily:"serif",
      margin: 10
  },
  inputContainer:{
      display: "flex",
      flexDirection: "row",
      width: "auto",
      alignItems: "center",
      height: 50,
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 10,
      margin: 10

  },
  textInput: {
      height: 40,
      width: "85%",
      margin: 10, 
  },
  brandImage:{
      height: 30,
      width: 30,
      margin: 10
  },
  brandTags:{
      margin: 10, 
      display: "flex", 
      flexDirection: "row", 
      alignItems: "center", 
      borderWidth: 1,
      padding: 5,
      borderRadius: 10,
      
  },
  vehicleCard:{
      boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 6px rgba(0, 0, 0, 0.40)",
      margin: 10,
      padding: 10,
      borderRadius: 20,
      

  },
  vehicleName:{
      textAlign: "left",
      fontSize: 16,
      fontFamily: "serif",
      fontWeight: "bold",
      margin: 10,
      marginHorizontal: 15
  },
  vehicleImage:{
      height: 150,
      width: "auto"
  },
  vehiclePricingView:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 10
  },
  vehicleData:{
      display: "flex",
      flexDirection: "row",
  }
})