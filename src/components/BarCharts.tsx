import React from 'react';
import styled from '@emotion/native';

import {Animated, FlatList} from 'react-native';

import Spacer from '../components/Spacer';
import TimeInRangeBar from './TimeInRangeBar';
import {DayData} from '../screens/Overview';

interface Props {
  weekData: DayData[];
  opacityAnimation: Animated.Value;
  fillAnimation: Animated.Value;
}

function interpolateThroughBars(
  value: Animated.Value,
  index: number,
  totalBars: number,
) {
  return value.interpolate({
    inputRange: [index / totalBars, (index + 1) / totalBars],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
}

const BarCharts = ({weekData, fillAnimation, opacityAnimation}: Props) => {
  const totalBars = weekData.length;
  return (
    <Container>
      <FlatList
        horizontal
        data={weekData}
        keyExtractor={item => {
          const todo = item as DayData;
          return todo.day;
        }}
        renderItem={({item, index}) => {
          const day = item as DayData;
          return (
            <TimeInRangeBar
              weekDay={day.day.substring(0, 2)}
              percentageDecimal={day.timeInRangeDecimal}
              barFillAnimation={interpolateThroughBars(
                fillAnimation,
                index,
                totalBars,
              )}
              opacityAnimation={interpolateThroughBars(
                opacityAnimation,
                index,
                totalBars,
              )}
            />
          );
        }}
        ItemSeparatorComponent={() => <Spacer amount={24} axis="x" />}
        scrollEnabled={false}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default BarCharts;
