import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { TabNavigationState, NavigationHelpers, Route } from '@react-navigation/native';
import { BottomTabDescriptorMap, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Feather from 'react-native-vector-icons/Feather'
import { Box, Theme } from './theme';
import { useTheme } from '@shopify/restyle';

interface Props {
    state:TabNavigationState;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<any,BottomTabNavigationEventMap>;
}

const MyTabbar = ({ state, descriptors, navigation }: Props) => {
   const focusedOptions = descriptors[state.routes[state.index].key].options;
   const theme  = useTheme<Theme>();

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route: Route<string>, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconColor = theme.colors.secondaryText

        if(isFocused) {
            iconColor = theme.colors.primaryText
        }
        if(label === "plus") {
            iconColor = theme.colors.whiteText
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={route.name}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Box  paddingVertical="l" justifyContent='center' alignItems="center" >
                <Box borderRadius={25}   backgroundColor={label =="plus" ? "primaryText": "mainBackground"}>
                    
                    <Feather style={{ padding: theme.spacing.s}} name={label.toString().toLowerCase()} size={24} color={ iconColor } />
                </Box>
            </Box>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabbar
