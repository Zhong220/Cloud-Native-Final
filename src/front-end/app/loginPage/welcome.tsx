import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  requireNativeComponent,
  Pressable,
} from "react-native";
// import styles from './style.ts';
import styles from "./style";
import { Router, Link } from "expo-router";
import { useRouter } from "expo-router";

<<<<<<< HEAD
  import React, { useState, useEffect } from 'react';
  import {Text, View, TouchableOpacity, Image, requireNativeComponent, Pressable } from 'react-native';
  // import styles from './style.ts';
  import styles from './style';
  import { Router, Link } from "expo-router";
  import { useRouter } from "expo-router";
=======
export default function Welcome() {
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  // const frontendRouter = useRouter();
  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = localStorage.getItem("jwtToken");
  //     if (token) {
  //       console.log("Token exists");
  //       frontendRouter.navigate("/(tabs)/home");
  //     }
  //   };
  //   checkToken();
  // }, [isMounted]);
  return (
    <View style={styles.container}>
      {/* Title */}
>>>>>>> 6af023f9c8cc41183caa3e326963f9a121bf1478

      <Image
        source={require("../../assets/images/image.png")}
        style={styles.welcomeIcon}
      />
      <Text style={styles.title}>
        <Text style={{ color: "black" }}>Welcome to </Text>
        <Text style={{ color: "orange" }}>GroupUp!</Text>
      </Text>
      {/* Login Button */}
      <Link href="/loginPage/login" asChild>
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </Link>

<<<<<<< HEAD
  export default function Welcome() { 
    // const [isMounted, setIsMounted] = useState(false);
    // useEffect(() => {
    //   setIsMounted(true);
    // }, []); 
    // const frontendRouter = useRouter();
    // useEffect(() => {
    //   const checkToken = async () => {
    //     const token = localStorage.getItem("jwtToken");
    //     if (token) {
    //       console.log("Token exists");
    //       frontendRouter.navigate("/(tabs)/home");
    //     }
    //   };
    //   checkToken();
    // }, [isMounted]);
    return (
      <View style={styles.container}>
        {/* Title */}
        

        <Image source={require("../../assets/images/image.png")} style={styles.welcomeIcon}/>
        <Text style={styles.title}>
          <Text style={{ color: 'black' }}>Welcome to </Text>
          <Text style={{ color: 'orange' }}>GroupUp!</Text>
        </Text>
        {/* Login Button */}
        <Link href="/loginPage/login" asChild>
         <Pressable style={styles.loginButton }>
           <Text style={styles.loginButtonText}>Login</Text>
         </Pressable>
        </Link>
       
        {/* create account Button */}
        <Link href="/loginPage/createAccount" asChild>
        <TouchableOpacity style={styles.createButton }>
=======
      {/* create account Button */}
      <Link href="/loginPage/createAccount" asChild>
        <TouchableOpacity style={styles.createButton}>
>>>>>>> 6af023f9c8cc41183caa3e326963f9a121bf1478
          <Text style={styles.createButtonText}>Create an account</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
