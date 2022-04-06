import styled from '@emotion/native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SafeArea from './src/components/SafeArea';
import TextButton from './src/components/TextButton';
import Overview, {DayData} from './src/screens/Overview';

const data1: DayData[] = [
  {day: 'Monday', timeInRangeDecimal: 0.24},
  {day: 'Tuesday', timeInRangeDecimal: 0.74},
  {day: 'Wednesday', timeInRangeDecimal: 0.94},
  {day: 'Thursday', timeInRangeDecimal: 0.87},
  {day: 'Friday', timeInRangeDecimal: 0.65},
  {day: 'Saturday', timeInRangeDecimal: 0.76},
  {day: 'Sunday', timeInRangeDecimal: 0.98},
];

const data2: DayData[] = [
  {day: 'Monday', timeInRangeDecimal: 0.43},
  {day: 'Tuesday', timeInRangeDecimal: 0.35},
  {day: 'Wednesday', timeInRangeDecimal: 0.65},
  {day: 'Thursday', timeInRangeDecimal: 0.21},
  {day: 'Friday', timeInRangeDecimal: 0.12},
  {day: 'Saturday', timeInRangeDecimal: 0.23},
  {day: 'Sunday', timeInRangeDecimal: 0.42},
];

const data3: DayData[] = [
  {day: 'Monday', timeInRangeDecimal: 0.24},
  {day: 'Tuesday', timeInRangeDecimal: 0.74},
  {day: 'Wednesday', timeInRangeDecimal: 0.94},
  {day: 'Thursday', timeInRangeDecimal: 0.87},
  {day: 'Friday', timeInRangeDecimal: 0.65},
];

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: true}}
        />
        <Stack.Screen name="Overview1">
          {props => <Overview {...props} weekData={data1} />}
        </Stack.Screen>
        <Stack.Screen name="Overview2">
          {props => <Overview {...props} weekData={data2} />}
        </Stack.Screen>
        <Stack.Screen name="Overview3">
          {props => <Overview {...props} weekData={data3} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function Home() {
  const navigation = useNavigation();
  return (
    <SafeArea>
      <HomeContainer>
        <TextButton
          title="Overview 1"
          onPress={() => navigation.navigate('Overview1')}
        />
        <TextButton
          title="Overview 2"
          onPress={() => navigation.navigate('Overview2')}
        />
        <TextButton
          title="Overview 3"
          onPress={() => navigation.navigate('Overview3')}
        />
      </HomeContainer>
    </SafeArea>
  );
}

const HomeContainer = styled.View`
  display: flex;
  flex: 0.25;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
`;

export default App;
