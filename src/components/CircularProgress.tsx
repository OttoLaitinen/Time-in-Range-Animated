import React, {useState} from 'react';
import styled from '@emotion/native';
import Svg, {Circle} from 'react-native-svg';
import {Animated, Dimensions} from 'react-native';

import {CountUp} from 'use-count-up';

const width = Dimensions.get('window').width;
const size = width - 220;
const sizeHalfed = size / 2;
const strokeWidth = 28;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  animatedProgress: Animated.Value;
  entryAnimation: Animated.Value;
  percentageDecimal: number;
  countUpDurMs?: number;
}

export default function CircularProgress({
  animatedProgress,
  entryAnimation,
  percentageDecimal,
  countUpDurMs = 1000,
}: Props) {
  const [isCounting, setIsCounting] = useState(false);

  animatedProgress.addListener(s => {
    s.value > 0 && setIsCounting(true);
  });

  const a = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-Math.PI * 2, 0],
  });

  const strokeColor = animatedProgress.interpolate({
    inputRange: [0, 0.5, 0.75],
    outputRange: ['rgb(254, 62, 50)', 'rgb(50, 149, 254)', 'rgb(9, 192, 157)'],
    extrapolate: 'clamp',
  });

  const percentage = percentageDecimal * 100;

  const strokeDashoffset = Animated.multiply(a, radius);

  return (
    <Container
      style={{
        opacity: entryAnimation,
      }}>
      <Svg height={size} width={size}>
        <Circle
          stroke="#f1f1f3"
          fill="none"
          cx={sizeHalfed}
          cy={sizeHalfed}
          r={radius}
          {...{strokeWidth}}
        />
        <AnimatedCircle
          stroke={strokeColor}
          fill="none"
          cx={sizeHalfed}
          cy={sizeHalfed}
          originX={sizeHalfed}
          originY={sizeHalfed}
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          rotation={-90}
          {...{strokeWidth, strokeDashoffset}}
        />
      </Svg>
      <PercentageView>
        <PercentageText>
          <CountUp
            isCounting={isCounting}
            end={percentage}
            duration={countUpDurMs / 1000}
          />
          %
        </PercentageText>
        <Note>avg.</Note>
      </PercentageView>
    </Container>
  );
}

const Container = styled(Animated.View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const PercentageView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
`;

const PercentageText = styled.Text`
  font-size: 48px;
  font-family: 'Karla-Regular';
  font-weight: bold;
  color: #2a2727;
  letter-spacing: 1px;
`;

const Note = styled.Text`
  font-size: 16px;
  font-family: 'Karla-Regular';
  color: #66666f;
  letter-spacing: 1px;
`;
