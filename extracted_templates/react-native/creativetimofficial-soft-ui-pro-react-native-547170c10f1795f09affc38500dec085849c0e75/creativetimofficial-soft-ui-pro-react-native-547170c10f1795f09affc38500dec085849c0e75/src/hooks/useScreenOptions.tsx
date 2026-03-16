import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import { useData } from './useData';
import { useTranslation } from './useTranslation';

import Image from '../components/Image';
import Text from '../components/Text';
import useTheme from '../hooks/useTheme';
import Button from '../components/Button';
import Block from '../components/Block';

// Define type-safe routes
type RootStackParamList = {
  Screens: {
    screen: 'Notifications' | 'Shopping' | 'Settings' | 'Profile' | 'Home';
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  const { t } = useTranslation();
  const { user, basket } = useData();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { icons, colors, gradients, sizes } = useTheme();

  const menu = {
    headerStyle: { elevation: 0 },
    headerTitleAlign: 'left',
    headerTitleContainerStyle: { marginLeft: -sizes.s },
    headerLeftContainerStyle: { paddingLeft: sizes.s },
    headerRightContainerStyle: { paddingRight: sizes.s },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({ children }: any) => <Text p>{children}</Text>,
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={icons.menu} radius={0} color={colors.icon} />
      </Button>
    ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}>
        <TouchableOpacity
          style={{ marginRight: sizes.sm }}
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'Notifications',
            })
          }
        >
          <Image source={icons.bell} radius={0} color={colors.icon} />
          <Block
            flex={0}
            right={0}
            width={sizes.s}
            height={sizes.s}
            radius={sizes.xs}
            position="absolute"
            gradient={gradients?.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'Shopping',
            })
          }
        >
          <Image source={icons.basket} radius={0} color={colors.icon} />
          <Block
            flex={0}
            padding={0}
            justify="center"
            position="absolute"
            top={-sizes.s}
            right={-sizes.s}
            width={sizes.sm}
            height={sizes.sm}
            radius={sizes.sm / 2}
            gradient={gradients?.primary}
          >
            <Text white center bold size={10} lineHeight={10} paddingTop={3}>
              {basket?.items?.length}
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    ),
  };

  const options = {
    stack: menu,
    components: {
      ...menu,
      headerTitle: () => (
        <Text p white>
          {t('navigation.components')}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    notifications: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'Settings',
            })
          }
        >
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
            transform={[{ rotate: '180deg' }]}
          />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => {
            navigation.navigate('Screens', {
              screen: 'Home',
            });
          }}
        >
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
            transform={[{ rotate: '180deg' }]}
          />
        </Button>
      ),
    },
    profile: {
      ...menu,
      headerRight: () => (
        <Block row flex={0} align="center" marginRight={sizes.padding}>
          <TouchableOpacity
            style={{ marginRight: sizes.sm }}
            onPress={() =>
              navigation.navigate('Screens', {
                screen: 'Notifications',
              })
            }
          >
            <Image source={icons.bell} radius={0} color={colors.icon} />
            <Block
              flex={0}
              right={0}
              width={sizes.s}
              height={sizes.s}
              radius={sizes.xs}
              position="absolute"
              gradient={gradients?.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Screens', {
                screen: 'Profile',
              })
            }
          >
            <Image
              radius={6}
              width={24}
              height={24}
              source={{ uri: user.avatar }}
            />
          </TouchableOpacity>
        </Block>
      ),
    },
  };

  return options;
};
