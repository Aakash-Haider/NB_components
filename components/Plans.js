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
import Modal from "react-native-modal";
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const Plans = () => {

    const [plan1Active, setPlan1Active] = React.useState(false);

    const [showModal, setShowModal] = React.useState(false);

    const [plan2Active, setPlan2Active] = React.useState(false);

    const plan1Height = React.useRef(new Animated.Value(400)).current;

    const plan2Height = React.useRef(new Animated.Value(400)).current;

    const plan1Opacity = React.useRef(new Animated.Value(1)).current;

    const plan2Opacity = React.useRef(new Animated.Value(1)).current;

    const Dumbell = React.memo(props => {
        return (
            <BlurGradient
                style={styles.dumbell}
                colorA={'rgba(256,256,256,0.1)'}
                colorB={'rgba(256,256,256,0.1)'}
                onPress={() => { setShowModal(true) }}
            >
                <View >
                    {/* <Image source={{
                        uri: 'https://unsplash.com/photos/hrOXaenH640'
                    }} /> */}
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                        }} source={require('../assets/darkDumbell.png')} />
                </View>

            </BlurGradient>);
    });

    React.useEffect(() => {
        Animated.timing(plan1Height, {
            toValue: plan1Active ? 1 : plan2Active ? 0 : 0.5,
            duration: 500,
            useNativeDriver: false
        }).start();
        Animated.timing(plan2Height, {
            toValue: plan2Active ? 1 : plan1Active ? 0 : 0.5,
            duration: 500,
            useNativeDriver: false
        }).start();
        Animated.timing(plan1Opacity, {
            toValue: plan1Active ? 1 : 0,
            duration: 500,
            useNativeDriver: false
        }).start();
        Animated.timing(plan2Opacity, {
            toValue: plan2Active ? 1 : 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }, [plan1Active, plan2Active]);



    const BlurGradient = (props) => {
        return (

            <BlurView
                blurType="light"
                blurAmount={10}
                style={props.style}
            >
                <Pressable onPress={props.onPress}>
                    <LinearGradient
                        colors={[props.colorA, props.colorB]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        useAngle
                        angle={110}
                        style={{ ...styles.card, ...props.extraStyles }}
                    >
                        {props.children}
                    </LinearGradient>
                </Pressable>
            </BlurView>
        )
    }



    return (
        <View style={styles.container}>
            <Modal
                isVisible={showModal}
                animationInTiming={1000}
                animationOutTiming={500}
                hasBackdrop={true}
                animationIn={'zoomInRight'}
                animationOut={'zoomOutRight'}
                coverScreen={false}
            >
                <View style={{
                    flex: 1,
                    zIndex: 102,
                    backgroundColor: '#1A1D21',
                    borderRadius: 30,
                    padding: 20,
                }}>

                    <BlurGradient
                        style={styles.closeButton}
                        colorA={'rgba(0,0,0,0.5)'}
                        colorB={'rgba(0,0,0,0.5)'}
                        onPress={() => { setShowModal(false) }}
                        extraStyles={{ borderRadius: 20 }}
                    >
                        <Image source={require('../assets/close.png')} />
                    </BlurGradient>
                    <View >
                        <Text style={styles.modalHeader}>
                            Sport equipment
                        </Text>
                        <Text style={styles.modalText}>
                            Program without an inventory
                            are designed for 3 months.
                        </Text>
                        <Text style={styles.modalText}>
                            After that you will need to choose one
                            of the three remaining plans.
                        </Text>

                    </View>

                    <View style={styles.imagesRow}>
                        <ImageBackground style={{ width: 150, height: 140 }} source={require('../assets/barbell.png')} >
                            <BlurGradient
                                style={{
                                    width: undefined,
                                    borderRadius: 10,
                                    marginTop: 20,
                                    bottom: 10,
                                    left: 10,
                                    position: 'absolute',
                                }}
                                colorA={'rgba(0,0,0,0.4)'}
                                colorB={'rgba(0,0,0,0.4)'}
                                extraStyles={{ height: undefined, width: undefined, borderRadius: 5 }}
                            >
                                <Text style={{
                                    ...styles.equipmentsText,
                                }}>
                                    Barbell
                                </Text>
                            </BlurGradient>
                        </ImageBackground>
                        <ImageBackground style={{ width: 150, height: 140 }} source={require('../assets/horizontlBar.png')} >
                            <BlurGradient
                                style={{
                                    width: undefined,
                                    borderRadius: 10,
                                    marginTop: 20,
                                    bottom: 10,
                                    left: 10,
                                    position: 'absolute',
                                }}
                                colorA={'rgba(0,0,0,0.4)'}
                                colorB={'rgba(0,0,0,0.4)'}
                                extraStyles={{ height: undefined, width: undefined, borderRadius: 5 }}
                            >
                                <Text style={{
                                    ...styles.equipmentsText,
                                }}>
                                    Horizontal bar
                                </Text>
                            </BlurGradient>
                        </ImageBackground>


                    </View>

                    <View style={styles.imagesRow}>
                        <ImageBackground style={{ width: 150, height: 140 }} source={require('../assets/dumbbells.png')} >
                            <BlurGradient
                                style={{
                                    width: undefined,
                                    borderRadius: 10,
                                    marginTop: 20,
                                    bottom: 10,
                                    left: 10,
                                    position: 'absolute',
                                }}
                                colorA={'rgba(0,0,0,0.4)'}
                                colorB={'rgba(0,0,0,0.4)'}
                                extraStyles={{ height: undefined, width: undefined, borderRadius: 5 }}
                            >
                                <Text style={{
                                    ...styles.equipmentsText,
                                }}>
                                    Dumbbells
                                </Text>
                            </BlurGradient>
                        </ImageBackground>
                        <ImageBackground style={{ width: 150, height: 140, }} source={require('../assets/sloppingBench.png')} >
                            <BlurGradient
                                style={{
                                    width: undefined,
                                    borderRadius: 10,
                                    marginTop: 20,
                                    bottom: 10,
                                    left: 10,
                                    position: 'absolute',
                                }}
                                colorA={'rgba(0,0,0,0.4)'}
                                colorB={'rgba(0,0,0,0.4)'}
                                extraStyles={{ height: undefined, width: undefined, borderRadius: 5 }}
                            >
                                <Text style={{
                                    ...styles.equipmentsText,
                                }}>
                                    Sloping bench
                                </Text>
                            </BlurGradient>
                        </ImageBackground>
                    </View>


                </View>
            </Modal>

            <BlurGradient
                style={styles.dumbell}
                colorA={'rgba(256,256,256,0.1)'}
                colorB={'rgba(256,256,256,0.1)'}
                onPress={() => { setShowModal(true) }}
            >
                <View >
                    {/* <Image source={{
                        uri: 'https://unsplash.com/photos/hrOXaenH640'
                    }} /> */}
                    <Image
                        resizeMode={'cover'}
                        style={{
                            width: 20,
                            height: 20,
                        }} source={require('../assets/darkDumbell.png')} />
                </View>

            </BlurGradient>

            <Animated.View
                style={{
                    backgroundColor: '#000',
                    height: plan1Height.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [200, 300, 400],
                    })
                }}>
                <Pressable
                    style={{ ...styles.plan1Container, }}
                    onPress={() => { setPlan1Active(true); setPlan2Active(false); }}
                >
                    <Animated.View style={{
                        ...styles.plan1OverlayStyle,
                        height: '100%',
                        backgroundColor: `rgba(256,256,256,0.7)`,
                        opacity: plan1Opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        })
                    }}>
                        <Animated.Text style={{
                            ...styles.textStyle,
                            opacity: plan1Opacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0],
                            })
                        }}>
                            {`Three times \n per week`}
                        </Animated.Text>
                        <BlurGradient
                            style={{
                                borderRadius: 10, marginTop: 20,

                            }}
                            colorA={'rgba(0,0,0,0.3)'}
                            colorB={'rgba(0,0,0,0.3)'}
                            extraStyles={{ height: undefined, width: undefined, borderRadius: 10 }}
                        >
                            <Animated.Text style={{
                                ...styles.workoutTimeStyle,

                            }}>
                                Workout 90 minutes
                            </Animated.Text>
                        </BlurGradient>
                    </Animated.View>
                    <ImageBackground
                        imageStyle={{
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10
                        }}
                        style={{ ...styles.plan1Container, }}
                        source={require('../assets/gym.png')} >
                        <Animated.Text style={{
                            ...styles.textStyle,
                            opacity: plan1Opacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            })
                        }}>
                            {`Three times \n per week`}
                        </Animated.Text>
                        <BlurGradient
                            style={{
                                borderRadius: 10, marginTop: 20,
                            }}
                            colorA={'rgba(0,0,0,0.3)'}
                            colorB={'rgba(0,0,0,0.3)'}
                            extraStyles={{ height: undefined, width: undefined, borderRadius: 10 }}
                        >
                            <Animated.Text style={{
                                ...styles.workoutTimeStyle,

                            }}>
                                Workout 90 minutes
                            </Animated.Text>
                        </BlurGradient>

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
                    height: plan2Height.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [200, 300, 400],
                    })
                }}>
                <Pressable
                    style={{ ...styles.plan2container, }}
                    onPress={() => { setPlan1Active(false); setPlan2Active(true); }}
                >
                    <Animated.View style={{
                        ...styles.plan2OverlayStyle,
                        height: '100%',
                        backgroundColor: `rgba(256,256,256,0.7)`,
                        opacity: plan2Opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        })
                    }}>
                        <Animated.Text style={{
                            ...styles.textStyle,
                            opacity: plan2Height.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0],
                            })
                        }}>
                            {`Two times \n per week`}
                        </Animated.Text>
                        <BlurGradient
                            style={{
                                borderRadius: 10, marginTop: 20,
                            }}
                            colorA={'rgba(0,0,0,0.3)'}
                            colorB={'rgba(0,0,0,0.3)'}
                            extraStyles={{ height: undefined, width: undefined, borderRadius: 10 }}
                        >
                            <Animated.Text style={{
                                ...styles.workoutTimeStyle,

                            }}>
                                Workout 55 minutes
                            </Animated.Text>
                        </BlurGradient>
                    </Animated.View>
                    <ImageBackground
                        imageStyle={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 30,
                        }}
                        style={{
                            ...styles.plan2container,

                        }}
                        source={require('../assets/home.png')} >
                        <Animated.Text style={{
                            ...styles.textStyle,
                            opacity: plan2Height.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            })
                        }}>
                            {`Two times \n per week`}
                        </Animated.Text>
                        <BlurGradient
                            style={{
                                borderRadius: 10, marginTop: 20,
                            }}
                            colorA={'rgba(0,0,0,0.3)'}
                            colorB={'rgba(0,0,0,0.3)'}
                            extraStyles={{ height: undefined, width: undefined, borderRadius: 10 }}
                        >
                            <Animated.Text style={{
                                ...styles.workoutTimeStyle,

                            }}>
                                Workout 55 minutes
                            </Animated.Text>
                        </BlurGradient>

                    </ImageBackground>

                </Pressable>
            </Animated.View>
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
    plan2container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 30,
        marginVertical: 2,
        borderBottomLeftRadius: 30,
    },
    plan1Container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    plan1OverlayStyle: {
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
    plan2OverlayStyle: {
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
        textAlign: 'center',
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    card: {
        height: 50,
        width: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    dumbell: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
        borderRadius: 15,
    },
    workoutTimeStyle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#F7F7F7',
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
    },
    equipmentsText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#F7F7F7',
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 102,
        borderRadius: 20,
    },
    modalHeader: {
        fontSize: 24,
        fontWeight: '700',
        color: '#F7F7F7',
        paddingVertical: 10,
    },
    modalText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 27,
        marginRight: 50,
        color: 'rgba(247, 247, 247, 0.7)',
        paddingVertical: 10,
    },
    imagesRow: {
        width: '100%',
        height: '25%',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

export default Plans;
