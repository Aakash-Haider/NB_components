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
} from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const Default_Height = Dimensions.get('window').height / 3;

const Places = () => {
    const [gymHeight, setGymHeight] = React.useState(Default_Height);

    const [homeHeight, sethomeHeight] = React.useState(Default_Height);

    const movex = React.useRef(Animated.Value(0));

    const [gymOpacity, setGymOpacity] = React.useState('rgba(256,256,256,0)');

    const [homeOpacity, setHomeOpacity] = React.useState('rgba(256,256,256,0)');

    const [gymBlur, setGymBlur] = React.useState(0);

    const [homeBlur, setHomeBlur] = React.useState(0);



    function onPress(tab) {
        LayoutAnimation.linear();

        if (tab === 'gym') {
            setGymHeight(Default_Height * 1.5);
            setGymOpacity('rgba(256,256,256,0.1)');
            sethomeHeight(Default_Height / 2);
            setHomeOpacity('rgba(256,256,256,0.6)');
            setHomeBlur(3);
            setGymBlur(0);
        }
        else if (tab === 'home') {
            sethomeHeight(Default_Height * 1.5);
            setGymOpacity('rgba(256,256,256,0.6)');
            setGymHeight(Default_Height / 2);
            setHomeOpacity('rgba(256,256,256,0.1)');
            setGymBlur(3);
            setHomeBlur(0);
        }

    }

    return (
        <View style={styles.container}>
            <Pressable
                style={{ ...styles.gymContainer, height: gymHeight }}
                onPress={() => { onPress('gym') }}
            >
                <Animated.View style={{
                    ...styles.gymOverlayStyle,
                    height: gymHeight, backgroundColor: gymOpacity,
                    transform: [{
                        translateX: movex
                    }]

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

            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    homecontainer: {
        width: '100%',
        height: '50%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    gymContainer: {
        width: '100%',
        height: '50%',
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
