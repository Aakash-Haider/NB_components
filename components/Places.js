import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    StatusBar,
    Text,
    Pressable,
    NativeModules,
    LayoutAnimation,
    TouchableOpacity,
    Animated,
    Dimensions,
    ImageBackground,
} from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const Places = () => {
    // const [gymHeight, setGymHeight] = React.useState(Default_Height);

    // const [homeHeight, sethomeHeight] = React.useState(Default_Height);

    // const [gymOpacity, setGymOpacity] = React.useState('rgba(256,256,256,0)');

    // const [homeOpacity, setHomeOpacity] = React.useState('rgba(256,256,256,0)');

    // const [gymBlur, setGymBlur] = React.useState(0);

    // const [homeBlur, setHomeBlur] = React.useState(0);

    const [gymActive, setGymActive] = React.useState(false);

    const [homeActive, setHomeActive] = React.useState(false);

    const gymHeight = React.useRef(new Animated.Value(400)).current;

    const homeHeight = React.useRef(new Animated.Value(400)).current;

    const gymOpacity = React.useRef(new Animated.Value(1)).current;

    const homeOpacity = React.useRef(new Animated.Value(1)).current;



    React.useEffect(() => {
        Animated.timing(gymHeight, {
            toValue: gymActive ? 1 : homeActive ? 0 : 0.5,
            duration: 500,
            useNativeDriver: false
        }).start();
        Animated.timing(homeHeight, {
            toValue: homeActive ? 1 : gymActive ? 0 : 0.5,
            duration: 500,
            useNativeDriver: false
        }).start();
        Animated.timing(gymOpacity, {
            toValue: gymActive ? 1 : 0,
            duration: 500,
            useNativeDriver: false
        }).start();
        Animated.timing(homeOpacity, {
            toValue: homeActive ? 1 : 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, [gymActive, homeActive]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    backgroundColor: '#000',
                    height: gymHeight.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [200, 300, 400],
                    })
                }}>
                <Pressable
                    style={{ ...styles.gymContainer, }}
                    onPress={() => { setGymActive(true); setHomeActive(false); }}
                >
                    <Animated.View style={{
                        ...styles.gymOverlayStyle,
                        height: '100%',
                        backgroundColor: `rgba(256,256,256,0.7)`,
                        opacity: gymOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        })
                    }}>
                        <Animated.Text style={{
                            ...styles.textStyle,
                            opacity: gymOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0],
                            })
                        }}>
                            Gym
                        </Animated.Text>
                    </Animated.View>
                    <ImageBackground
                        imageStyle={{
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10
                        }}
                        style={{ ...styles.gymContainer, }}
                        source={require('../assets/gym.png')} >
                        <Animated.Text style={{
                            ...styles.textStyle,
                            opacity: gymOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            })
                        }}>
                            Gym
                        </Animated.Text>
                    </ImageBackground>

                </Pressable>
            </Animated.View>



            <Animated.View
                style={{
                    backgroundColor: '#000',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 30,
                    borderBottomLeftRadius: 30,
                    height: homeHeight.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [200, 300, 400],
                    })
                }}>
                <Pressable
                    style={{ ...styles.homecontainer, }}
                    onPress={() => { setGymActive(false); setHomeActive(true); }}
                >
                    <Animated.View style={{
                        ...styles.homeOverlayStyle,
                        height: '100%',
                        backgroundColor: `rgba(256,256,256,0.7)`,
                        opacity: homeOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        })
                    }}>
                        <Animated.Text style={{
                            ...styles.textStyle,
                            opacity: homeHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0],
                            })
                        }}>
                            Home
                        </Animated.Text>
                    </Animated.View>
                    <ImageBackground
                        imageStyle={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 30,
                        }}
                        style={{ ...styles.homecontainer, }}
                        source={require('../assets/home.png')} >
                        <Animated.Text style={{
                            ...styles.textStyle,
                            opacity: homeHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            })
                        }}>
                            Home
                        </Animated.Text>
                    </ImageBackground>

                </Pressable>
            </Animated.View>
            {/* <Pressable
                style={{ ...styles.gymContainer, height: gymHeight }}
                onPress={() => { onPress('gym') }}
            >
                <Animated.View style={{
                    ...styles.gymOverlayStyle,
                    height: gymHeight, backgroundColor: gymOpacity,
                }} >
                    <Text style={styles.textStyle}>
                        Gym
                    </Text>
                </Animated.View>
                <Animated.Image
                    blurRadius={gymBlur}
                    style={{ ...styles.gymContainer, height: gymHeight }}
                    source={require('../assets/gym.png')} />
            </Pressable>

            <Pressable style={{ ...styles.homecontainer, height: homeHeight }}
                onPress={() => { onPress('home') }}
            >
                <Animated.View style={{ ...styles.homeOverlayStyle, height: homeHeight, backgroundColor: homeOpacity }} >
                    <Text style={styles.textStyle}>
                        Home
                    </Text>
                </Animated.View>
                <Animated.Image
                    blurRadius={homeBlur}
                    style={{ ...styles.homecontainer, height: homeHeight }}
                    source={require('../assets/home.png')} />

            </Pressable> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        backgroundColor: '#000',
        marginHorizontal: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    homecontainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        marginVertical: 2,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    gymContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    gymOverlayStyle: {
        zIndex: 100,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center', alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
    },
    homeOverlayStyle: {
        zIndex: 100,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center', alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25
    },
    textStyle: {
        fontSize: 30,
        fontWeight: '700',
        color: '#F7F7F7',
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: {
            height: 0,
            width: 0
        }
    }
});

export default Places;
