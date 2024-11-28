import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from 'lottie-react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";


export default function Index() {


  const pages = [
    {id: 1,  icon: "car-outline" ,title: "Add Vehicles ", route: "addVehicle"},
    {id: 2,  icon: "clipboard-outline" ,title: "See Logs", route: "seeLogs"},
    {id: 3,  icon: "car" ,title: "See Available Cars", route: "currentVehicle"},
  ]

  const router = useRouter()


  type MenuItem = {
    id: number,
    icon: string,
    title: string,
    route: any
  }





  //rendering the page links 
 const MenuItem: ({ icon, title, route }: MenuItem) => JSX.Element = ({ icon, title, route }) =>(
    <TouchableOpacity style={styles.menuItem} onPress={() => router.push(route)}>
      <View style={styles.menuItemContent}>
        <Ionicons name={icon as any} size={24} color="blue" style={styles.menuIcon} />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSec}>
        <LottieView style={styles.lottieImage} source={require("../animations/hello.json")} autoPlay loop />
        <Text style={styles.headerText}>WELCOME ADMIN</Text>
      </View>
      <View style={styles.bodySec}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 30 }}>CHOOSE WHAT YOU WANT TO EDIT</Text>
        <View style={styles.menuContainer}>
           {pages.map((page) => (
             <MenuItem key={page.id} icon={page.icon} title={page.title} route={page.route} id={page.id} />
           ))}
          </View>
        
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
  },
  headerSec:{
    flex:1,
    display:"flex",
    flexDirection:"row",
  },
  lottieImage:{
    width:"auto",
    height:"auto",
    flex:3
  },
  headerText:{
    fontSize: 28,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    color:"white",
    flex:2
  },
  bodySec:{
    flex:2,
    backgroundColor:"white",
    borderTopLeftRadius:"20%",
    borderTopRightRadius:"-20%",
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 40,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 10,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#1F2937',
  },
})
