/*
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  
  
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId:
      '726224001651-q8de0ih59kpvcnn5vaiii98vgmm31mjm.apps.googleusercontent.com', 
    offlineAccess: true, 
    hostedDomain: '',
    forceCodeForRefreshToken: true,
    accountName: '',
    // iosClientId:
    //   '여기에 ios URL 스키마..(중요)여기선 똑바로쓰기...com이 제일 뒤로',
    googleServicePlistPath: '',
    openIdRealm: '',
    profileImageSize: 120,
  });
  
  
  
  function IntroPage({navigation}: IntroPageScreenProps) {
    const dispatch = useAppDispatch();
    const toSignIn = useCallback(() => {
      navigation.navigate('SignIn');
    }, [navigation]);
    const toSignUp = useCallback(() => {
      navigation.navigate('SignUp');
    }, [navigation]);
    const signInGoogle = async () => {
      console.log('google');
      try {
           //이 두줄로 소셜로그인 완료하고, 구글의 user정보 획득
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('userInfo', userInfo);
  
        // /auth/authorize로 로그인 시도해서 성공하면 가입한 아이디니 바로 메인, 아니면 추가입력으로
        const API_URL =
          Platform.OS === 'ios'
            ? 'http://localhost:8000'
            : 'http://10.0.2.2:8000';
        console.log(API_URL);
        console.log('http:', Config.HTTP_SECRET_KEY);
  
        const response = await axios.post(
          `${API_URL}/auth/authorize`,
          {email: `google_${userInfo.user.id}@xxxxxxx.com`},
          // TODO: HTTP_SECRET_KEY설정 필요
          {headers: {'SECRET-KEY': Config.HTTP_SECRET_KEY || ''}},
        );
        console.log(response.data.accessToken);
        dispatch(
          //요 친구들이 다 action.payload에 저장
          userSlice.actions.setUser({
            email: response.data.email,
            accessToken: response.data.accessToken,
          }),
        );
        // 받은 accessToken을 스토리지에 저장
        await EncryptedStorage.setItem('accessToken', response.data.accessToken);
        
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };
  
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Logo />
          </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              margin: 5,
            }}>
            <Text>습관만들고 일기쓰면서,</Text>
            <Text
              style={{
                color: '#6562F5',
                fontWeight: 'bold',
              }}>
              {' '}
              용돈벌어요!
            </Text>
          </View>
          <View
            style={{
              margin: 30,
            }}>
            <LogoImgage />
          </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              margin: 5,
            }}>
            <Pressable
              style={{
                borderRadius: 35,
                backgroundColor: '#FBE74D',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
                margin: 8,
              }}
              onPress={() => {
                console.log('click');
              }}>
              <KakaoIcon />
            </Pressable>
            <Pressable
              style={{
                borderRadius: 35,
                backgroundColor: '#f3f3f3',
                padding: 15,
                margin: 8,
              }}
              onPress={signInGoogle}>
              <GoogleIcon />
            </Pressable>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
            }}>
            <Text>또는</Text>
          </View>
          <Pressable
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#6562F5',
              borderRadius: 20,
              margin: 10,
              padding: 10,
            }}
            onPress={toSignIn}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              이메일로 로그인
            </Text>
          </Pressable>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text>OO서비스가 처음이라면, </Text>
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={toSignUp}>
              <Text
                style={{
                  color: '#6562F5',
                  fontWeight: 'bold',
                }}>
                회원가입
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
  
  export default IntroPage;
  */
 
// 클라이언트 아이디 : 726224001651-q8de0ih59kpvcnn5vaiii98vgmm31mjm.apps.googleusercontent.com
// 클라이언트 비밀번호 : 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