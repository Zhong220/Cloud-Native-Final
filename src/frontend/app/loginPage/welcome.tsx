
  import React, { useState } from 'react';
  import {Text, View, TouchableOpacity, Image, requireNativeComponent, Pressable } from 'react-native';
  import styles from './style.ts';
  import { Router, Link } from "expo-router";


  export default function welcome() { 

    return (
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>GroupUp!</Text>
        <Text style={styles.subtitle}>Welcome back to GroupUp</Text>
        <Link href="../login">About</Link>

        <Image source={require("../../assets/icon.png")} style={styles.welcomeIcon}/>

        {/* Login Button */}
        <Link href="loginPage/login" asChild>
         <Pressable style={styles.loginButton }>
           <Text style={styles.loginButtonText}>Login</Text>
         </Pressable>
        </Link>
       
        {/* create account Button */}
        <Link href="loginPage/createAccount" asChild>
        <TouchableOpacity style={styles.createButton }>
          <Text style={styles.createButtonText}>Create an account</Text>
        </TouchableOpacity>
        </Link>
        
      </View>
    );
  }
  
