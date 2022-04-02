import styled from '@emotion/native';
import React from 'react';
import {StatusBar, Text} from 'react-native';

const App = () => {
  return (
    <StyledSafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <Text>Sofia on Sofia</Text>
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: salmon;
  flex: 1;
`;

export default App;
