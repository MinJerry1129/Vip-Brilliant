import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import images from '../../assets/images';
import I18n from '../../i18n';
const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    container: {
        alignItems: 'center',
    },
    titleText: {
        marginHorizontal: 8,
        fontSize: 20,
        fontWeight:'bold'
    },
    contentText: {
        marginHorizontal: 20,
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center'
    },
    iconStyle: {
        width: 120,
        height: 40,
        resizeMode: 'contain'
    },
    imageStyle: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    }
});

const NoFriends = ({ onPress }) => (
    <View style={styles.btnContainer}>
        <Image source={images.noactivity} style={styles.imageStyle}/>
        <Text style={styles.titleText}>{I18n.t('Noactivity')}</Text>
        <Text style={styles.contentText}>{I18n.t('No_activity')}</Text>
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={images.btn_activity_blank} style={styles.iconStyle}/>
        </TouchableOpacity>
    </View>
);

export default NoFriends;
