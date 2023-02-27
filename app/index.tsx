import {Button, useDooboo} from 'dooboo-ui';
import {Image, View} from 'react-native';
import type {ReactElement} from 'react';
import {useState} from 'react';

import {IC_MASK} from '../src/utils/Icons';
import {getString} from '../STRINGS';
import styled from '@emotion/native';
import {useRouter} from 'expo-router';
import {useAppContext} from '../src/providers/AppProvider';
import type {User} from '../src/types';
import {Heading1} from '../src/uis/Typography';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  margin-bottom: 35px;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ContentWrapper = styled.View``;

const ButtonWrapper = styled.View`
  width: 72%;
  gap: 12px;

  flex-direction: column;
`;

type Props = {};

export default function Intro({}: Props): ReactElement {
  let timer: any;

  const {
    setUser,
    state: {user},
  } = useAppContext();
  const router = useRouter();
  const {changeThemeType} = useDooboo();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onLogin = (): void => {
    setIsLoggingIn(true);

    timer = setTimeout(() => {
      const tempUser: User = {
        displayName: 'dooboolab',
        age: 30,
        job: 'developer',
      };

      setUser(tempUser);
      setIsLoggingIn(false);
      clearTimeout(timer);
    }, 1000);
  };

  return (
    <Container>
      <ContentWrapper>
        <Heading1
          style={{
            marginTop: 100,
          }}
        >
          {user ? user.displayName : ''}
        </Heading1>
        <Heading1>{user ? user.age : ''}</Heading1>
        <Heading1>{user ? user.job : ''}</Heading1>
      </ContentWrapper>
      <ButtonWrapper>
        <Button
          testID="btn-login"
          startElement={
            <View
              style={{
                position: 'absolute',
                left: 12,
              }}
            >
              <Image source={IC_MASK} style={{width: 24, height: 24}} />
            </View>
          }
          loading={isLoggingIn}
          onPress={() => onLogin()}
          text={getString('LOGIN')}
        />
        <Button
          testID="btn-navigate"
          onPress={() => router.push('/temp')}
          text={getString('NAVIGATE', {name: 'Temp'})}
        />
        <Button
          testID="btn-theme"
          onPress={(): void => changeThemeType()}
          text={getString('CHANGE_THEME')}
        />
      </ButtonWrapper>
    </Container>
  );
}
