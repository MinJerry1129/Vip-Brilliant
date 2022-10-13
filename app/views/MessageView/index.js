import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from "react-native";
import firestore from "@react-native-firebase/firestore";

import {themes} from "../../constants/colors";
import StatusBar from "../../containers/StatusBar";
import {withTheme} from "../../theme";
import images from "../../assets/images";
import styles from "./styles";
import firebaseSdk from "../../lib/firebaseSdk";
import { dateStringFromNow} from '../../utils/datetime';
import ActivityIndicator from "../../containers/ActivityIndicator";
import MainScreen from '../../containers/MainScreen';
import * as HeaderButton from '../../containers/HeaderButton';
import {GradientHeader} from '../../containers/GradientHeader';
import debounce from '../../utils/debounce';

class MessageView extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
        title: 'VIP Billionaires',
        headerBackground: () => <GradientHeader/>
    })

    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: [],
            searchData: [],
            refreshing: false,
            loading: true,
            unReads: 0
        }
        this.mounted = false;
        this.init();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        if(this.unSubscribeRoom){
            this.unSubscribeRoom();
        }
    }

    init = async () => {
        const {user} = this.props;
        const roomSubscribe = await firestore().collection(firebaseSdk.TBL_ROOM);
        this.unSubscribeRoom = roomSubscribe.onSnapshot(async(querySnapShot) => {
            const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get();
            const users = [];
            userSnaps.forEach(s => users.push(s.data()));

            let allUnReads = 0;
            let list = [];
            querySnapShot.forEach(doc => {
                const room = doc.data();
                if(room.sender === user.userId || room.receiver === user.userId){
                    const receiver = users.find(u => u.userId === (room.sender === user.userId?room.receiver:room.sender));
                    let unReads = 0;
                    if(room.confirmUser === user.userId){
                        unReads = room.unReads;
                    }
                    allUnReads += unReads;
                    list.push({id: doc.id, ...room, account: receiver, unReads});
                }
            });
            list.sort((a, b) => b.date.seconds - a.date.seconds);
            if(this.mounted){
                this.setState({data: list, refreshing: false, loading: false, unReads: allUnReads});
            } else {
                this.state.data = list;
                this.state.loading = false;
                this.state.refreshing = false;
                this.state.unReads = allUnReads;
            }
            this.onSearch();
        })
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.init();
    }


    onSearchChangeText = (text) => {
        this.setState({text: text.trim(), loading: false});
        this.onSearch();
    };

    onSearch = debounce(async () => {
        const {text, data} = this.state;
        // Search
        if (text.length > 0) {
            let searchData = data.filter(d => {
                const key = d.account.displayName;
                return key.toLowerCase().indexOf(text.toLowerCase()) >= 0;
            });
            this.setState({searchData, loading: false, refreshing: false});
        } else {
            this.setState({searchData: data, loading: false, refreshing: false});
        }
    }, 200);

    onPressItem = (item) => {
        const { navigation } = this.props;
        navigation.navigate('Chat', {room: item});
    }

    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.itemContainer}>
            <View style={styles.avatarContainer}>
                <Image source={(item.account?.avatar) ? {uri: item.account?.avatar} : images.default_avatar}
                       style={styles.itemImage}/>
                {item.unReads > 0 && <View style={styles.unreadContainer}><Text style={styles.unread}>{item.unReads}</Text></View>}
            </View>
            <View style={styles.itemContent}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.account?.displayName}</Text>
                    <Text style={styles.itemTime}>{dateStringFromNow(item.date)}</Text>
                </View>
                <View style={styles.itemFooter}>
                    <Text style={styles.itemMessage} ellipsizeMode='tail' numberOfLines={2}>{item.lastMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
    renderRecentItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.itemRecentContainer}>
                <Image source={(item.account?.avatar) ? {uri: item.account?.avatar} : images.default_avatar}
                       style={styles.itemImage}/>
                <Text style={styles.itemTitle}>{item.account?.displayName}</Text>
        </TouchableOpacity>
    )

    render() {
        const {theme, navigation} = this.props;
        const {searchData, refreshing, loading} = this.state;
        return (
            <MainScreen navigation={navigation} hasSearch onSearchChangeText={this.onSearchChangeText} onSearch={this.onSearch}>
                <StatusBar/>
                {loading && <ActivityIndicator absolute theme={theme} size={'large'}/>}
                <View style={styles.userlistMainView}>
                    <View style={styles.recentuserlist}>
                        <Text style={styles.recentText}>Recent</Text>
                        {searchData.length > 0 ?
                            <FlatList
                                data={searchData}
                                horizontal
                                renderItem={this.renderRecentItem}
                                keyExtractor={item => item.id}
                                refreshControl={(
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={this.onRefresh}
                                        tintColor={themes[theme].actionColor}
                                    />
                                )}
                            />
                        :
                            null
                        }
                    </View>
                    <View  style={styles.userlistView}>
                        {searchData.length > 0 ?
                            <FlatList
                                data={searchData}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.id}
                                style={styles.userlist}
                                refreshControl={(
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={this.onRefresh}
                                        tintColor={themes[theme].actionColor}
                                    />
                                )}
                            />
                        :
                            null
                        }
                    </View>
                    
                </View>
                
            </MainScreen>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(MessageView));
