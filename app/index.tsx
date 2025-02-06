import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LottieView from 'lottie-react-native'
import { useState } from "react";
import supabase from "@/DBconfig/supabaseClient";
import { useRouter } from "expo-router";
export default function Index() {


  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const signIn = async() => {
    setLoading(true)
    const {error} = await supabase.auth.signInWithPassword({
      email : email,
      password: password
    })
    if(error) Alert.alert('Error signing In ',error.message)
      setLoading(false)
  }

  const signUp = async () => {
    setLoading(true)
    const {
      data: {session}, error} = await supabase.auth.signUp({
        email:email,
        password:password
      })

    if(error){
      Alert.alert('Error Signing up ', error.message)
      setLoading(false)
    }else{
      Alert.alert(' Sign up in progress. Please wait s we send you a confirmation email')
      if(!session){
        Alert.alert('Please check your email for account verification')
        setLoading(false)
      }
      setLoading(false)
    }
    
    
  }


  const logInsert = async () => {
    const {data,error} = await supabase
    .from('loginLogs')
    .insert({
      user_email: email
    })
    .select()
    .single()


    if(data) console.log('User data inserted into loginLogs:', data)
    if(error) console.log(error)

  }



  const login = async () => {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error){
      Alert.alert(error.message)
      setEmail("")
      setPassword("")
      setLoading(false)
    }else{
      Alert.alert("Login Successful")
      logInsert()
      setEmail("")
      setPassword("")
      setLoading(false)
      router.replace('/(auth)')
      
    }
  }

  const signup = async () => {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email,
      password
    })
    if(error){
      Alert.alert(error.message)
      setEmail("")
      setPassword("")
      setLoading(false)
    }else if(password !== confirmPassword){
      Alert.alert("Passwords do not match")
      setPassword("")
      setConfirmPassword("")
      setLoading(false)
    }
    else{
      Alert.alert("Signup Successful")
      setEmail("")
      setPassword("")
      setLoading(false)
      setIsLogin(true)
    }
  }
  if (loading) return (
    <View>
      <LottieView source={require("../assets/images/loadingAnimation.json")} autoPlay loop style={{width:"auto", height: 250, marginVertical: 5}} />
    </View>
  )


  return (
    
    <View style={styles.containor}>
      <LottieView 
        source={isLogin ? require("../assets/images/loginAnimation.json") : require("../assets/images/signupAnimation.json")} 
        autoPlay 
        loop
        style={{width:"auto", height: 250, marginVertical: 5}} />
      <Text style={styles.headerText}>{isLogin ? "SIGN IN" : "SIGN UP FOR A NEW ACCOUNT"}</Text>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        />
      
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          secureTextEntry={!showPassword}
        />
        {!isLogin && (
           <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.textInput}
            secureTextEntry={!showPassword}
        />
        )}
        
        <TouchableOpacity onPress={isLogin ? signIn : signUp}>
          <View style={styles.submitButton} >
            <Text style={{color: "white", fontWeight: "bold"}}>{isLogin ? "Sign In to Account" : "Sign Up For New Account"}</Text>
          </View>
        </TouchableOpacity>

       <TouchableOpacity onPress={() => {setIsLogin(!isLogin)}} style={{backgroundColor: "transparent", alignItems: "center",margin: 10}}>
         <Text style={{margin: 10}}>{isLogin ? "Don't have an account?" : "Already have an account?"} <Text style={styles.link}>{isLogin ? "Sign Up" : "Login"}</Text>
        </Text>
       </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  containor:{
    flex: 1,
    justifyContent: "center",
    
    
  },headerText:{
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
    textAlign:"center"
    
  },
  textInput:{
    borderColor: "#007bff",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  submitButton:{
    backgroundColor: "#007bff",
    margin: 10,
    borderRadius: 5,
    width: "auto",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  link:{
    color: "#007bff",
    marginLeft: 10
  }
})