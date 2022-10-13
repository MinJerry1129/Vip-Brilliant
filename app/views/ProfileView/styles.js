import { StyleSheet } from "react-native";

export default StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    backAction: {
        position: 'absolute',
        bottom:25,
        right: 12,
    },
    searchAction: {
        position: 'absolute',
        top:10,
        right: 60,
    },
    settingAction: {
        position: 'absolute',
        top:10,
        right: 12,
    },
    backImage: {
        width:'100%',
        height: 200,
        resizeMode: 'cover',
    },
    logo: {
        width:'100%',
        height: 200,
        resizeMode: 'cover',
    },
    profileMainContainer:{
        backgroundColor:'#fff',
        width:'100%',
        translateY:-20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    profileContainer: {
        // backgroundColor:'#7f7f7f'
    },
    mainInfo: {
        flexDirection: 'row',
        height:100,
        translateY:-40,
    },
    bio: {
        marginTop: 4,
        fontSize: 14,
        color:'#6C7A9C'
    },
    city: {
        marginTop: 2,
        fontSize: 12
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    website: {
        marginTop: 2,
    },
    job: {
        marginTop: 2,
        fontSize: 12
    },
    avatarContainer: {
        flex:1,
        alignItems:'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'grey'
    },
    profileInfo: {
        marginLeft: 20,
        flexGrow: 1,
    },
    profileTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    handle: {
        fontSize: 12,
        color: 'grey'
    },
    profileHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileName: {
        fontSize: 18,
        fontWeight:'bold'
    },
    settingIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    editProfile: {
        marginTop: 12,
    },
    editProfileBtn: {
        width: 100,
        height: 24,
        resizeMode: 'contain',
    },
    actionContainer:{
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemAction: {
        width: 100,
        height: 24,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionText: {
        color: 'white'
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 8
    },
    optionContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // width: '30%'
        flex:1
    },
    optionContainerUnderLine: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomColor:'#6C7A9C',
        borderBottomWidth:2,
        // width: '30%'
        flex:1
    },
    borderLeft: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: 'grey'
    },
    borderRight: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: 'grey'
    },
    optionValue: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    optionTitle: {
        fontSize: 12
    },
    profileInfo:{
        alignItems:'center',
        justifyContent:'center',
        translateY:-20
    }
});
