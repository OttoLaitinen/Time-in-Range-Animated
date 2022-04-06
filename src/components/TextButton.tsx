import styled from '@emotion/native';
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

const TextButton = ({
  onPress,
  title,
}: TouchableOpacityProps & {title: string}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BackButtonText>{title}</BackButtonText>
    </TouchableOpacity>
  );
};

const BackButtonText = styled.Text`
  font-size: 18px;
  font-family: 'Karla-Regular';
  font-weight: bold;
  color: #66666f;
  letter-spacing: 1px;
`;

export default TextButton;
