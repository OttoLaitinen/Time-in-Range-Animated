import React from 'react';
import styled from '@emotion/native';
import Spacer from '../components/Spacer';
import {Animated, ViewStyle} from 'react-native';

interface Props {
  title?: string;
  content: string;
  style?: Animated.AnimatedProps<ViewStyle>;
}

export default function Card({title, content, style}: Props) {
  return (
    <Container style={style}>
      {title && (
        <>
          <Title>{title}</Title>
          <Spacer amount={8} axis="y" />
        </>
      )}
      <Content>{content}</Content>
    </Container>
  );
}

const Container = styled(Animated.View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-radius: 8px;
  padding: 8px 16px 16px 16px;
  elevation: 5;
  background-color: white;
  shadow-offset: 0px 2px;
  shadow-radius: 6px;
  shadow-opacity: 0.3;
  shadow-color: #000;
`;

const Title = styled.Text`
  font-size: 16px;
  font-family: 'Karla-Regular';
  font-weight: bold;
  color: #66666f;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Content = styled.Text`
  font-size: 16px;
  font-family: 'Karla-Regular';
  color: #2a2727;
  letter-spacing: 1px;
  line-height: 24px;
`;
