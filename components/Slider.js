import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    NativeModules,
    LayoutAnimation,
    Animated,
    Platform,
    ImageBackground,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window');

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const Pagination = ({ data, activeIndex }) => {
    return (
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 20 }}>
            {
                data.map((item, index) => {
                    return (
                        <Animated.View key={index} style={{
                            ...styles.dot,
                            width: index == activeIndex ? 10 : 8,
                            height: index == activeIndex ? 10 : 8,
                            borderRadius: index == activeIndex ? 5 : 4,
                            backgroundColor: index == activeIndex ? 'rgba(247, 247, 247, 0.9)' : data[index].locked ? 'rgba(247, 247, 247, 0.5)' : 'rgba(86, 190, 102, 1)'
                        }} />


                    )
                })
            }
        </View>

    )


}
const Slider = () => {
    const scrollx = React.useRef(new Animated.Value(1)).current;

    const data = [
        {
            image: require('../assets/slider1.png'),
            locked: false
        },
        {
            image: require('../assets/home.png'),
            locked: false
        },
        {
            image: require('../assets/home.png'),
            locked: false
        },
        {
            image: require('../assets/home.png'),
            locked: false
        },
        {
            image: require('../assets/slider1.png'),
            locked: true
        },
        {
            image: require('../assets/slider1.png'),
            locked: true
        },
        {
            image: require('../assets/slider1.png'),
            locked: true
        },
        {
            image: require('../assets/gym.png'),
            locked: true
        },
        {
            image: require('../assets/home.png'),
            locked: true
        },
    ];

    const carousalRef = React.useRef();
    const [activeIndex, setActiveIndex] = React.useState(0);

    function renderItem({ item, index }, parallaxProps) {
        return (
            <Animated.View style={{
                ...styles.item,
            }}>

                <Animated.View style={{
                    ...styles.gradient,
                }}>
                    <LinearGradient
                        colors={['rgb(253,122,132)', 'rgb(253,89,100)', 'rgb(252,65,94)', 'rgb(252,50,89)', 'rgb(252,46,82)']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={{
                            ...styles.gradient,
                            opacity: activeIndex === index ? 1 : 0,


                        }}
                    />

                </Animated.View>
                <ParallaxImage
                    source={item?.image}
                    containerStyle={{
                        ...styles.imageContainer,
                        margin: activeIndex === index ? 3 : 0,
                    }}
                    style={{ ...styles.image, }}
                    parallaxFactor={0.3}
                    {...parallaxProps}
                />

                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.mainText}>
                            +11 years
                        </Text>
                        <View style={styles.subTextContainer}>
                            <Text style={styles.subText}>
                                5 exercises
                            </Text>
                            <Text style={styles.subText}>
                                .
                            </Text>
                            <Text style={styles.subText}>
                                52 min
                            </Text>
                        </View>
                    </View>
                    <ImageBackground style={{ width: 50, height: 50, position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center', }} source={require('../assets/roundTrans.png')}>
                        {item.locked ?
                            <Image style={{ width: 25, height: 25 }} source={require('../assets/lock.png')} />
                            :
                            <Image style={{ width: 15, height: 15 }} source={require('../assets/play.png')} />

                        }
                    </ImageBackground>
                </View>

                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.07)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.4)',]}
                    start={{ x: 1.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={styles.overlay}
                />
            </Animated.View>
        );
    }
    console.log('123123213', scrollx);
    return (
        <View style={styles.container}>
            <Carousel
                ref={carousalRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={data}
                extraData={activeIndex}
                renderItem={renderItem}
                hasParallaxImages={true}
                onSnapToItem={index => { LayoutAnimation.linear(); setActiveIndex(index); }}
            />
            <Pagination data={data} activeIndex={activeIndex} />
            {/* <Pagination
                dotsLength={data.length}
                activeDotIndex={activeIndex}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotElement={() => {
                    return (
                        <View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 8,
                            backgroundColor: data[index].locked ? 'rgba(247, 247, 247, 0.5)' : 'rgba(86, 190, 102, 1)'
                        }} />
                    )
                }}
                inactiveDotStyle={{
                    backgroundColor: 'rgba(247, 247, 247, 0.5)'
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={0.6}
            /> */}
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
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    dot: {
        marginHorizontal: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: 20,
        zIndex: 100,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        margin: 10,
        zIndex: 100,
        resizeMode: 'cover',
    },
    bottomContainer: {
        position: 'absolute',
        left: 10,
        bottom: 30,
        zIndex: 110,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainText: {
        color: 'rgb(256,256,256)',
        fontSize: 18,
        fontWeight: '700'
    },
    subText: {
        color: 'rgba(256,256,256,0.9)',
        fontSize: 13,
        fontWeight: '400',
        marginLeft: 5,
        marginTop: 5
    },
    gradient: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        borderRadius: 22,
        zIndex: -10
    },
    overlay: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        borderRadius: 22,
        zIndex: 100
    },
    subTextContainer: {
        flexDirection: 'row'
    }
});

export default Slider;
