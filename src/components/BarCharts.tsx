import React, {useEffect, useRef} from 'react';
import styled from '@emotion/native';

import {Animated, View, FlatList} from 'react-native';

import Spacer from '../components/Spacer';
import TimeInRangeBar from './TimeInRangeBar';
import {DayData} from '../screens/Overview';

interface Props {
  weekData: DayData[];
}

export default function BarCharts({weekData}: Props) {
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
            />
          );
        }}
        ItemSeparatorComponent={() => <Spacer amount={24} axis="x" />}
        scrollEnabled={false}
      />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
