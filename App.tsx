import styled from '@emotion/native';
import React from 'react';
import {StatusBar} from 'react-native';
import Overview, {DayData} from './src/screens/Overview';

const data: DayData[] = [
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

const App = () => {
  return (
    <StyledSafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <Overview weekData={data} />
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export default App;
