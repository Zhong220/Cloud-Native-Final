import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
// import EmojiBoard from 'react-native-emoji-board'; // Make sure to install this package


const userId = 1; // Example user ID

const chatrooms = [
  {
    id: 1,
    room_id: 1,
    name: "Chatroom 1",
    description: "Chatroom 1 description",
    messages: [
      { id: 1, user_id: 1, text: "Hello from user 1" },
      { id: 2, user_id: 2, text: "Hello from user 2" }
    ]
  },
  {
    id: 2,
    room_id: 2,
    name: "Chatroom 2",
    description: "Chatroom 2 description",
    messages: [
      { id: 3, user_id: 1, text: "Hi from user 1" },
      { id: 4, user_id: 3, text: "Hi from user 3" }
    ]
  },
  {
    id: 3,
    room_id: 3,
    name: "Chatroom 3",
    description: "Chatroom 3 description",
    messages: []
  }
];

export default function ChatroomDetails() {
  const { room_id } = useLocalSearchParams();
  const router = useRouter();

  const darkmode = true;
  const [message, setMessage] = useState("");
  const [chatroomMessages, setChatroomMessages] = useState(chatrooms.find(room => room.room_id === parseInt(room_id as string))?.messages || []);

  const chatroom = chatrooms.find(room => room.room_id === parseInt(room_id as string));

  if (!chatroom) {
    return (
      <NotFoundChatroom />
    );
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatroomMessages.length + 1,
        user_id: userId,
        text: message.trim()
      };
      setChatroomMessages([...chatroomMessages, newMessage]);
      setMessage("");
    }
  };

  // const [showEmojiBoard, setShowEmojiBoard] = useState(false);
  // const toggleEmojiBoard = () => {
  //   setShowEmojiBoard(!showEmojiBoard);
  // };

  // const addEmoji = (emoji: { code: string}) => {
  //   setMessage(message + emoji.code);
  //   setShowEmojiBoard(false);
  // };
  
  return (
    <View style={styles.container}>
      {/* Topbar */}
      <View style={styles.topbar}>
        {/* Chatroom title */}
        <Text style={styles.topbarTitle}>{chatroom.name}</Text>
        
        {/* Back button */}
        <TouchableOpacity 
          onPress={ () => router.navigate("/(tabs)/chatrooms") } 
          style={{ marginRight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ marginRight: 15 }}>
            <FontAwesome5 name="arrow-left" size={22} color="black" />
          </View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{"Back"}</Text>
        </TouchableOpacity>

        {/* Split Bill Button */}
        <TouchableOpacity 
          onPress={ () => router.navigate("/(tabs)/splitbill") } 
          style={{ marginRight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', right: 0, position: 'absolute' }}
        >
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{"Split-bill"}</Text>
          <View style={{ marginLeft: 15 }}>
            <FontAwesome5 name="money-bill-alt" size={22} color="black" />
          </View>
        </TouchableOpacity>

      </View>

      {/* Chatroom messages */}
      <View style={[styles.chatBackground, {backgroundColor: darkmode ? "#4F4C4A" : "#F6F6F6",} ]}>
        <View style={{ borderRadius: 10, marginBottom: 10 }}/>
        <FlatList
          data={chatroomMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.messageContainer, item.user_id === userId ? styles.userMessage : styles.otherMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      {/* Input field and send button */}
      <View style={[styles.inputContainer, {backgroundColor: darkmode ? "#4F4C4A" : "#F6F6F6",} ]}>
        <TextInput
          style={[styles.input, {backgroundColor: darkmode ? "#4F4C4A" : "#F6F6F6", color: darkmode ? "#fff" : "#000"}]}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          onKeyPress={(e) => {
            // if (e.nativeEvent.key === 'Enter' && !e.shiftKey) {
            if (e.nativeEvent.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            } 
            // else if (e.nativeEvent.key === 'Enter' && e.shiftKey) {
            //   setMessage((prevMessage) => prevMessage + '\n');
            // }
          }}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>

        {/* Emoji board */}
        {/* <View style={styles.inputContainer}>
          <TouchableOpacity onPress={toggleEmojiBoard} style={styles.emojiButton}>
            <FontAwesome5 name="smile" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
          />
        </View>
        {showEmojiBoard && <EmojiBoard showBoard={showEmojiBoard} onClick={addEmoji} />}
         */}
      </View>
    </View>
  );
}

const NotFoundChatroom = () => {
  const router = useRouter();
  const darkmode = true;
  return (
    <View style={styles.container}>
      {/* a stylish Not Found Page with Orange and Black and a cute icon */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: darkmode ? "#4F4C4A" : "#F6F6F6" }}>
        {/* A message */}
        {/* A Figure of a cute cat */}
        <FontAwesome5 name="cat" size={100} color="#FF8F3B" />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color:"white" }}>Oops...! Chatroom not found</Text>
        
        <TouchableOpacity onPress={ () => router.navigate("/(tabs)/chatrooms") }
          style={{ marginTop: 20, padding: 10, backgroundColor: '#FF8F3B', borderRadius: 10 }}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  chatBackground: {
    color: '#f0f0f0', 
    padding: 12, 
    flex: 1 
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    // backgroundColor: '#DCF8C6', // Light green
    backgroundColor: '#FFF0D3',
    borderWidth:1,
    borderColor:'#fbc9a3',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
  },
  topbar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBlockColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: '#f0f0f0',
  },
  topbarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emojiButton: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});