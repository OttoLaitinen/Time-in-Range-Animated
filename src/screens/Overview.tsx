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

const animDurations = {
  cards: {info: 600, end: 600},
  tirBarPerBar: {opacity: 550, fill: 1350},
  circularProgress: {opacity: 1000, fill: 4000},
};

const InfoCardText =
  'Keeping Time in Range high lowers inflammation, oxiditive stress and improves longevity.';

function endingText(avgTiR: number) {
  if (avgTiR >= 66) {
    return `Congrats! Your Time in Range average last week was ${avgTiR}%. Keep this up!`;
  }
  if (avgTiR >= 33) {
    return `Good! Your Time in Range average last week was  ${avgTiR}%. Can you score higher?`;
  }

  return `Bummer! Your Time in Range average was only ${avgTiR}% last week. You can do better!`;
}

export default function Overview({weekData}: OverviewProps) {
  const avgTiR =
    Math.round(
      (weekData.reduce((pv, cv) => pv + cv.timeInRangeDecimal, 0) /
        weekData.length) *
        100,
    ) / 100;

  const infoCardAnimation = useRef(new Animated.Value(0)).current;
  const tirBarsFillAnimation = useRef(new Animated.Value(0)).current;
  const tirBarsOpacityAnimation = useRef(new Animated.Value(0)).current;
  const circularProgressEntryAnimation = useRef(new Animated.Value(0)).current;
  const animatedCircularProgress = useRef(new Animated.Value(0)).current;

  const endCardAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(infoCardAnimation, {
        toValue: 1,
        duration: animDurations.cards.info,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(tirBarsOpacityAnimation, {
        toValue: 1,
        duration: animDurations.tirBarPerBar.opacity * weekData.length,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(tirBarsFillAnimation, {
        toValue: 1,
        duration: animDurations.tirBarPerBar.fill * weekData.length,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(circularProgressEntryAnimation, {
        toValue: 1,
        duration: animDurations.circularProgress.opacity,
        useNativeDriver: true,
      }),
      Animated.timing(animatedCircularProgress, {
        toValue: avgTiR,
        duration: animDurations.circularProgress.fill,
        useNativeDriver: true,
      }),
      Animated.delay(100),
      Animated.timing(endCardAnimation, {
        toValue: 1,
        duration: animDurations.cards.end,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    infoCardAnimation,
    tirBarsOpacityAnimation,
    tirBarsFillAnimation,
    animatedCircularProgress,
    endCardAnimation,
    circularProgressEntryAnimation,
    avgTiR,
    weekData.length,
  ]);

  return (
    <Container>
      <Heading>Weekly report</Heading>
      <Spacer amount={16} axis="y" />

      <Card
        content={endingText(avgTiR * 100)}
        style={{
          opacity: endCardAnimation,
          transform: [
            {
              translateY: endCardAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-10, 0],
              }),
            },
          ],
        }}
      />
      <Spacer amount={24} axis="y" />

      <CircularProgress
        animatedProgress={animatedCircularProgress}
        entryAnimation={circularProgressEntryAnimation}
        countUpDurMs={animDurations.circularProgress.fill}
        percentageDecimal={avgTiR}
      />
      <Spacer amount={32} axis="y" />

      <BarCharts
        weekData={weekData}
        fillAnimation={tirBarsFillAnimation}
        opacityAnimation={tirBarsOpacityAnimation}
      />
      <Spacer amount={16} axis="y" />

      <Card
        title="Time in Range"
        content={InfoCardText}
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
