import styled from '@emotion/native';
import React from 'react';
import {StatusBar} from 'react-native';

interface Props {
  children: React.ReactNode;
}

const SafeArea: React.FC<Props> = ({children}) => {
  return (
    <StyledSafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {children}
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

export default SafeArea;
