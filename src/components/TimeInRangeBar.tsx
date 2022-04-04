import React, {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {CountUp} from 'use-count-up';

import {Animated} from 'react-native';

import Spacer from '../components/Spacer';

interface Props {
  weekDay: string;
  percentageDecimal: number;
  animDurMs?: number;
}

export default function TimeInRangeBar({
  weekDay,
  percentageDecimal,
  animDurMs = 2000,
}: Props) {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const percentage = percentageDecimal * 100;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: percentageDecimal,
      duration: animDurMs,
      useNativeDriver: false,
    }).start();
  }, [animatedProgress, percentageDecimal, animDurMs]);

  const growingHeight = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  console.log(animatedProgress);

  return (
    <Container>
      <PercentageText>
        <CountUp isCounting end={percentage} duration={animDurMs / 1000} />
      </PercentageText>
      <Spacer amount={8} axis="y" />
      <BarContainer>
        <Bar percentage={percentage} style={{height: growingHeight}} />
      </BarContainer>

      <Spacer amount={8} />

      <WeekDayText>{weekDay}</WeekDayText>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const BarContainer = styled.View`
  height: 175px;
  display: flex;
  justify-content: flex-end;
  border-radius: 1000px;
  background-color: #f1f1f3;
  overflow: hidden;
`;

const Bar = styled(Animated.View)<{percentage: number}>`
  width: 24px;
  background-color: ${p =>
    p.percentage >= 75
      ? '#09C09D'
      : p.percentage >= 25
      ? '#3295FE'
      : '#fe3e32'};
`;
const PercentageText = styled.Text`
  font-size: 16px;
  font-family: 'Karla-Regular';
  font-weight: bold;
  color: #66666f;
`;
const WeekDayText = styled.Text`
  font-size: 16px;
  font-family: 'Karla-Regular';
  color: #66666f;
  text-transform: capitalize;
`;
