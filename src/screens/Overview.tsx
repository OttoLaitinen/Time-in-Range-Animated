import React, {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {Animated, Easing} from 'react-native';

import Spacer from '../components/Spacer';
import Card from '../components/Card';
import CircularProgress from '../components/CircularProgress';
import BarCharts from '../components/BarCharts';

export type DayData = {
  day: string;
  timeInRangeDecimal: number;
};

interface OverviewProps {
  weekData: DayData[];
}

const animatedCircularProgressDuration = 4000;
const cardAnimationDuration = 800;
const InfoCardPlaceholderText =
  'Keeping Time in Range high lowers inflammation, oxiditive stress and improves longevity.';

export default function Overview({weekData}: OverviewProps) {
  const avgTiR =
    Math.round(
      (weekData.reduce((pv, cv) => pv + cv.timeInRangeDecimal, 0) / 7) * 100,
    ) / 100;

  const endPlaceholderText = `Congrats! You were able to average ${
    avgTiR * 100
  }% of your Time in Range!`;

  const infoCardAnimation = useRef(new Animated.Value(0)).current;
  const circularProgressEntry = useRef(new Animated.Value(0)).current;
  const animatedCircularProgress = useRef(new Animated.Value(0)).current;

  const endCardAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(infoCardAnimation, {
        toValue: 1,
        duration: cardAnimationDuration,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(circularProgressEntry, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animatedCircularProgress, {
        toValue: avgTiR,
        duration: animatedCircularProgressDuration,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(endCardAnimation, {
        toValue: 1,
        duration: cardAnimationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    infoCardAnimation,
    animatedCircularProgress,
    endCardAnimation,
    circularProgressEntry,
    avgTiR,
  ]);

  return (
    <Container>
      <Heading>Weekly report</Heading>
      <Spacer amount={16} axis="y" />

      <CircularProgress
        animatedProgress={animatedCircularProgress}
        entryAnimation={circularProgressEntry}
        countUpDurMs={animatedCircularProgressDuration}
        percentageDecimal={avgTiR}
      />
      <Spacer amount={24} axis="y" />

      <Card
        content={endPlaceholderText}
        style={{
          opacity: endCardAnimation,
          transform: [
            {
              translateX: endCardAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-25, 0],
              }),
            },
          ],
        }}
      />
      <Spacer amount={48} axis="y" />

      <BarCharts weekData={weekData} />

      <Spacer amount={16} axis="y" />

      <Card
        title="Time in Range"
        content={InfoCardPlaceholderText}
        style={{
          opacity: infoCardAnimation,
          transform: [
            {
              translateY: infoCardAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [25, 0],
              }),
            },
          ],
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  padding: 0px 16px 0 16px;
  background-color: white;
`;

const Heading = styled.Text`
  font-size: 20px;
  font-family: 'Karla-Regular';
  font-weight: bold;
  color: #66666f;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
