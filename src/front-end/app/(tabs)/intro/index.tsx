import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function ProfilePage() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Information");

  const [thoughts, setThoughts] = useState("");
  const [birthday, setBirthday] = useState("Pisces - Feb 20, 2004");
  const [location, setLocation] = useState("Taipei, Taiwan");
  const [education, setEducation] = useState("NCCU, Computer Science");

  // Handle cover upload
  const handleUploadCover = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
    }
  };

  // Handle profile image upload
  const handleUploadProfile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Tab content rendering
  const renderContent = () => {
    switch (activeTab) {
      case "Information":
        return (
          <View>
            <Text style={styles.sectionTitle}>Thoughts</Text>
            <TextInput
              style={styles.detailInput}
              placeholder="表達當下想法或感受……"
              multiline
              value={thoughts}
              onChangeText={setThoughts}
            />
            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.detailInput}
              value={birthday}
              onChangeText={setBirthday}
            />
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.detailInput}
              value={location}
              onChangeText={setLocation}
            />
            <Text style={styles.label}>Education</Text>
            <TextInput
              style={styles.detailInput}
              value={education}
              onChangeText={setEducation}
            />
          </View>
        );
      case "Interests":
        return (
          <View>
            <Text style={styles.sectionTitle}>Sports</Text>
            <Text style={styles.sectionTitle}>Games</Text>
            <Text style={styles.sectionTitle}>Music</Text>
          </View>
        );
      case "Post":
        return (
          <View>
            <Text style={styles.sectionTitle}>User Posts</Text>
          </View>
        );
      case "Contact":
        return (
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.detailInput}
              value="111703013@g.nccu.edu.tw"
              editable={false}
            />
            <Text style={styles.label}>Links</Text>
            <Text style={[styles.detailInput, styles.detailInput]}>
              https://userlink.com
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Cover Section */}
      <View style={styles.banner}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        ) : (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUploadCover}
          >
            <Text style={styles.uploadText}>Upload Cover</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* User Info Section */}
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={handleUploadProfile}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder} />
          )}
        </TouchableOpacity>
        <Text style={styles.userName}>RongRong Huang</Text>
        <Text style={styles.userID}>UserID:111703013</Text>
        <View style={styles.actionIcons}>
          <TouchableOpacity>
            <Ionicons name="add" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs Section */}
      <View style={styles.tabs}>
        {["Information", "Interests", "Post", "Contact"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Section */}
      <View style={styles.content}>{renderContent()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#FFA726",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  banner: {
    height: 150,
    backgroundColor: "#FFA726",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  uploadText: {
    color: "#FFA726",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  userID: {
    fontSize: 14,
    color: "#757575",
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    marginTop: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 20,
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#FFA726",
  },
  tabText: {
    fontSize: 14,
    color: "#757575",
  },
  activeTabText: {
    color: "#FFA726",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  detailInput: {
    fontSize: 14,
    marginVertical: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
