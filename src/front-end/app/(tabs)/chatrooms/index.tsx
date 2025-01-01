import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

interface ChatroomProps {
  id: number;
  room_id: number;
  name: string;
}

const chatrooms: ChatroomProps[] = [
  {
    id: 1,
    room_id: 1,
    name: "Chatroom 1",
<<<<<<< Updated upstream
=======
    description: "Chatroom 1 description",
>>>>>>> Stashed changes
  },
  {
    id: 2,
    room_id: 2,
    name: "Chatroom 2",
<<<<<<< Updated upstream
=======
    description: "Chatroom 2 description",
>>>>>>> Stashed changes
  },
  {
    id: 3,
    room_id: 3,
    name: "Chatroom 3",
<<<<<<< Updated upstream
=======
    description: "Chatroom 3 description",
>>>>>>> Stashed changes
  },
  {
    id: 4,
    room_id: 4,
    name: "Chatroom 4",
<<<<<<< Updated upstream
=======
    description: "Chatroom 4 description",
>>>>>>> Stashed changes
  },
];

export default function Chatrooms() {
  const router = useRouter();

  const handlePress = (room_id: number) => {
    router.push(`./chatrooms/${room_id}`);
  };

  return (
    <View style={styles.container}>
      {/* Topbar */}
      <View style={styles.topbar}>
        <Text style={styles.topbarTitle}>{"Groups"}</Text>
        {/* <TouchableOpacity onPress={ () => router.navigate("/(tabs)/chatrooms") } style={{ marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 15 }}>
            <FontAwesome5 name="arrow-left" size={24} color="black" />
          </View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{"Back"}</Text>
        </TouchableOpacity>   */}
      </View>

      <FlatList
        data={chatrooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatroom}
            onPress={() => handlePress(item.room_id)}
          >
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "#fff",
  },
  chatroom: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  topbar: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    padding: 15,
    borderBlockColor: "black",
    borderBottomWidth: 1,
    backgroundColor: "#f0f0f0",
  },
  topbarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
});
