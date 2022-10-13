import React from 'react';
import PropTypes from "prop-types";
import StatusBar from "../../containers/StatusBar";
import {withTheme} from "../../theme";
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from "./styles";
import {VectorIcon} from "../../containers/VectorIcon";
import {GradientHeader} from '../../containers/GradientHeader';
import * as HeaderButton from '../../containers/HeaderButton';
import MainScreen from '../../containers/MainScreen';
import I18n from '../../i18n';
import DialogInput from 'react-native-dialog-input';

class SettingView extends React.Component{
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
        title: I18n.t('Settings'),
        headerBackground: () => <GradientHeader/>
    })

    static propTypes = {
        navigation: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            codeinput : false
        }

        this.menus = [
            { id: 'profile', title: I18n.t('Profile'), type: 'title' },
            { id: 'security_settings', title: I18n.t('Security_setting'), type: 'view' },
            { id: 'privacy_policy', title: I18n.t('Privacy_policy'), type: 'title' },
            { id: 'term_and_conditions', title: I18n.t('Terms_of_use'), type: 'view' },
            { id: 'privacy_policy_view', title: I18n.t('Privacy_policy'),  type: 'view' },
            { id: 'blocked', title: I18n.t('Blocked'),  type: 'view' },
            { id: 'delete_account', title: I18n.t('Delete_Account'),  type: 'view' }
        ]
    }

    onPressItem = (menu_id) => {
        const {navigation} = this.props;

        switch (menu_id){
            case 'security_settings':
                navigation.navigate('Security');
                break;
            case 'term_and_conditions':
                navigation.navigate('About', {type: 0});
                break;
            case 'privacy_policy_view':
                navigation.navigate('About', {type: 1});
                break;
            case 'blocked':
                navigation.navigate('Block');
                break;
            case 'delete_account':
                this.setState({codeinput:true})
                break;
        }
    }

    renderItem = ({item}) => {
        const { theme } = this.props;
        if(item.type === 'title'){
            return (
                <View style={styles.itemContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => this.onPressItem(item.id)} style={styles.itemContainer}>
                <Text style={item.id=='delete_account'?styles.itemDeleteText:styles.itemText}>{item.title}</Text>
                {item.type === 'view' && <VectorIcon type={'Ionicons'} name={'md-chevron-forward'} size={20} color={'grey'}/>}
            </TouchableOpacity>
        )
    }

    render(){
        const {navigation, theme} = this.props;
        const {codeinput} = this.state;
        return (
            <MainScreen navigation={navigation}>
                <StatusBar/>
                <FlatList
                    data={this.menus}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
                <DialogInput isDialogVisible={codeinput}
                    title={I18n.t('Delete_Account')}
                    message={"Are you Sure to delete your account?\nPlease enter your password to confirm!"}
                    hintInput ={"Password"}
                    submitText = "Delete"
                    // submitInput={ (inputText) => onSetPrivatekey(inputText)}
                    closeDialog={ () => {this.setState({codeinput:false})}}
                />
            </MainScreen>
        )
    }
}

export default withTheme(SettingView);
