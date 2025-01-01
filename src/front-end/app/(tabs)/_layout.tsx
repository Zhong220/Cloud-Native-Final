import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link, Tabs, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native'
;

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const textStyles = colorScheme === 'dark' ? styles.darkText : styles.lightText
  const iconColor = colorScheme === 'dark' ? 'white' : 'black'
  const tabbarStyles =
    colorScheme === 'dark' ? styles.darkTabbar : styles.lightTabbar

  // Disable all the tabs on the web
  
  return (
    <>
      {/* <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          tabBarStyle: {
            borderColor: 'gray',
            borderTopWidth: 1,
            shadowColor: 'black', // Shadow color
            shadowOpacity: 0.25, // Shadow opacity (0.0 to 1.0)
            shadowOffset: { width: 0, height: 2 }, // Shadow offset (width, height)
            shadowRadius: 4, // Shadow blur radius
            elevation: 5, // Android shadow elevation (works on Android API level 21 and above)
            alignItems: 'center',
            justifyContent: 'center',
          },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="home"
          options={{
            href: "/(tabs)/home",
            tabBarStyle: tabbarStyles,

            //tabBar label
            tabBarLabel: '首頁',
            tabBarLabelStyle: textStyles,
            //icon
            tabBarIcon: () => <TabBarIcon name="home" color={iconColor} />,
          }}
        />
        <Tabs.Screen
          name="chatrooms"
          options={{
            href: "/(tabs)/chatrooms",
            tabBarStyle: tabbarStyles,
            //tabBar label
            tabBarLabel: '群組',
            tabBarLabelStyle: textStyles,
            //icon
            tabBarIcon: () => <TabBarIcon name="rocketchat" color={iconColor} />,
          }}
        />
        <Tabs.Screen
          name="splitbill"
          options={{
            href: "/(tabs)/splitbill",
            tabBarStyle: tabbarStyles,

            //tabBar label
            tabBarLabel: '分帳',
            tabBarLabelStyle: textStyles,
            //icon
            tabBarIcon: () => <TabBarIcon name="money-bill-alt" color={iconColor} />,
          }}
        />
      </Tabs> */}
      <Stack  screenOptions={{ headerShown: false }} />
    </>
  );
}

const styles = StyleSheet.create({
  lightText: {
    color: '#000',
    fontSize: 16,
  },
  darkText: {
    color: '#fff',
    fontSize: 16,
  },
  lightTabbar: {
    height: 80,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 6,
    shadowRadius: 2,
  },
  darkTabbar: {
    height: 80,
    backgroundColor: '#232323',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 6,
    shadowRadius: 2,
  },
})
