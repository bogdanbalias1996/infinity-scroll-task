import React from 'react';
import {Button, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {navigationRef} from '../RootNavigation';
import Stubs from '../stubs/Stubs';
import Lists from '../stubs/Lists';
import CreateListModal from '../stubs/CreateListModal';

import store from '../store/store';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={({navigation}) => ({
        headerRight: () => (
          <Button
            onPress={() => navigation.push('Stubs')}
            title="Stubs"
            testID="StubsBtn"
          />
        ),
      })}>
      {() => <View />}
    </Stack.Screen>
    <Stack.Screen name="Stubs" component={Stubs} />
    <Stack.Screen
      name="Lists"
      component={Lists}
      options={({navigation}) => ({
        title: 'My Lists',
        headerRight: () => (
          <Button
            onPress={() => navigation.push('CreateListModal')}
            title="Add"
            testID="AddBtn"
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              screenOptions={() => ({
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                presentation: 'modal',
                ...TransitionPresets.ModalPresentationIOS,
              })}>
              <Stack.Screen name="Root" component={RootStack} />
              <Stack.Screen
                name="CreateListModal"
                component={CreateListModal}
                options={{
                  title: 'Create list',
                  headerShown: true,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
