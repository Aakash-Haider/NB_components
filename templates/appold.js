import React from 'react';
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const Appbar = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20 }}>
            <Image source={require('./assets/back.png')} style={{ width: 12, height: 18 }} />
            <Image source={require('./assets/logo.png')} style={{ width: 98, height: 26 }} />
        </View>
    )

}
const TopContent = () => {
    return (
        <>
            <View style={{ alignItems: 'center', padding: 25 }}>
                <Text style={styles.workoutText}>
                    Workout rescheduling
                </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 30, paddingVertical: 20 }}>
                <Image source={require('./assets/dumbell.png')} style={{ width: 22, height: 22, }} />
                <View>
                    <Text style={styles.chooseText}>
                        Choose a new day for your workout
                    </Text>
                </View>
                <View />
            </View>
        </>
    )

}

function seconds_since_epoch(d) {
    return Math.floor(d / 1000);
}

function re_schedule(date,
    epochTime,
    schedule,
    setSchedule,
    selectedScheduleIndex,
    setSelectedScheduleIndex,
    setSelectedReScheduleIndex,
    setDaysToHighlight) {
    setSelectedReScheduleIndex(date);
    setDaysToHighlight([]);
    temp = schedule;
    temp[selectedScheduleIndex] = epochTime;
    setSchedule([...temp]);

}
App = () => {

    var epochTimestamps = [];
    var d = new Date();
    let sec = seconds_since_epoch(d);

    for (var i = 1; i <= 60; i++) {
        epochTimestamps.push(sec);
        sec = sec + 86400;
    }




    const [schedule, setSchedule] = React.useState([
        1638644400,
        1638990000,
        1639508400,
        1639767600,
        1639940400,
        1640113200,
        1639854000,
        1639162800,
        1640631600,
        1640804400
    ]);

    const [selectedScheduleIndex, setSelectedScheduleIndex] = React.useState(null);
    const [selectedReScheduleIndex, setSelectedReScheduleIndex] = React.useState(null);
    const [daysToHighlight, setDaysToHighlight] = React.useState([]);

    schedule.sort();

    function highlightToReSchedule(day) {
        setDaysToHighlight([]);
        var highlightedDays = [];
        var newday = day + 86400;
        while (highlightedDays.length < 5) {

            if (schedule.includes(newday)) {
                newday = newday + 86400;
            }
            else {
                highlightedDays.push(`${new Date(newday * 1000).getDate()}/${new Date(newday * 1000).getMonth()}`);
                newday = newday + 86400;
            }
        }

        setDaysToHighlight([...highlightedDays]);
    }

    const renderCalender = ({ item, index }) => {
        var epochTime = new Date(item * 1000);
        var date = epochTime.getDate();
        var month = epochTime.getMonth();
        var dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        var day = dayNames[epochTime.getDay()];
        console.log('2312321', `${date}/${month}`, daysToHighlight);
        return (
            <TouchableOpacity
                key={index}
                disabled={!daysToHighlight.includes(`${date}/${month}`)}
                onPress={() => {
                    re_schedule(
                        date,
                        item,
                        schedule,
                        setSchedule,
                        selectedScheduleIndex,
                        setSelectedScheduleIndex,
                        setSelectedReScheduleIndex,
                        setDaysToHighlight
                    )
                }}
                style={{
                    marginHorizontal: 15,
                    backgroundColor: daysToHighlight.includes(`${date}/${month}`) ? 'rgba(22, 22, 23, 1)' : 'rgba(22, 22, 23, 0)',
                    ...styles.scheduleContainer
                }}>
                <Text style={{ ...styles.calenderText, color: daysToHighlight.includes(`${date}/${month}`) ? 'rgba(247, 247, 247, 1)' : 'rgba(247, 247, 247, 0.15)', }}>
                    {day}
                </Text>
                <Text style={{ ...styles.calenderText, color: daysToHighlight.includes(`${date}/${month}`) ? 'rgba(247, 247, 247, 1)' : 'rgba(247, 247, 247, 0.15)', }}>
                    {date}
                </Text>
            </TouchableOpacity>
        )
    }
    console.log('21321321321', daysToHighlight);
    const renderSchedule = ({ item, index }) => {
        var epochTime = new Date(item * 1000);
        var date = epochTime.getDate();
        var dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        var day = dayNames[epochTime.getDay()];
        return (
            <Pressable key={index}
                onPress={() => { console.log('2313213', highlightToReSchedule(item)); setSelectedScheduleIndex(index) }}
                style={{
                    marginHorizontal: 10,
                    backgroundColor: selectedScheduleIndex == index && !selectedReScheduleIndex ? '#F7F7F7' : '#161617',
                    ...styles.scheduleContainer
                }}>
                {
                    selectedScheduleIndex == index && selectedReScheduleIndex
                        ?
                        <>
                            <Text style={{ ...styles.scheduleText, color: '#46EEC6' }}>
                                {date}
                            </Text>
                            <Image source={require('./assets/downArrow.png')} style={{ width: 10, height: 4 }} />
                            <Text style={{ ...styles.scheduleText, color: '#F7F7F7' }}>
                                {selectedReScheduleIndex}
                            </Text>
                        </>
                        :
                        <>
                            <Text style={{ ...styles.scheduleText, color: selectedScheduleIndex == index ? '#161617' : '#46EEC6' }}>
                                {day}
                            </Text>

                            <Text style={{ ...styles.scheduleText, color: selectedScheduleIndex == index ? '#161617' : '#46EEC6' }}>
                                {date}
                            </Text>
                        </>
                }

            </Pressable>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <Appbar />
            <TopContent />
            <View style={styles.contentContainer}>
                <View style={{ flex: 1, width: '13%', marginLeft: 10, }}>
                    <FlatList
                        data={schedule}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderSchedule}
                        keyExtractor={(item) => item}
                        extraData={schedule}
                    />
                </View>

                <View style={styles.divider} >
                    <Image source={require('./assets/virticalDivider.png')} style={{ width: 2, height: '100%', alignSelf: 'center', marginRight: 20 }} />
                </View>

                <View style={{ width: '80%', }}>
                    <FlatList
                        data={epochTimestamps}
                        numColumns={4}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderCalender}
                        keyExtractor={(item) => item}
                        extraData={epochTimestamps}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    workoutText: {
        fontSize: 26,
        fontWeight: '400',
        color: '#fff',
    },
    chooseText: {
        fontSize: 15,
        width: 140,
        textAlign: 'center',
        fontWeight: '400',
        color: '#F7F7F7',
    },
    scheduleContainer: {
        borderRadius: 15,
        paddingHorizontal: 1,
        width: 58,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        position: 'absolute',
        left: 90,
        top: 0,
        bottom: 0
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scheduleText: {
        fontSize: 22,
        fontWeight: '400',
        color: '#46EEC6',
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    calenderText: {
        fontSize: 22,
        fontWeight: '400',
        paddingVertical: 5,
        paddingHorizontal: 5
    }
});

export default App;
