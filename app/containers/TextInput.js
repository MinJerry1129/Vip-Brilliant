import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

import sharedStyles from '../views/Styles';
import {COLOR_DANGER, COLOR_TEXT, COLOR_YELLOW, themes} from '../constants/colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {isIOS} from "../utils/deviceInfo";

import { TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
	error: {
		...sharedStyles.textAlignCenter,
		paddingTop: 5
	},
	inputContainer: {
		marginBottom: 10,
	},
	label: {
		marginBottom: 4,
		fontSize: 12,
		...sharedStyles.textSemibold
	},
	required: {
		marginBottom: 10,
		color: COLOR_DANGER,
		fontSize: 14,
		fontWeight: '700'
	},
	input: {
		// ...sharedStyles.textRegular,
		// fontSize: 16,
		// paddingHorizontal: isIOS?8:14,
		// borderWidth: 1,
		// borderRadius: 24,
	},
	inputIconLeft: {
		paddingLeft: 54
	},
	inputIconRight: {
		paddingRight: 45
	},
	wrap: {
		// position: 'relative',
		display:'flex',
		flexDirection:'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 24,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginEnd: 5
	},
	iconLeft: {
		width: 24,
		height: 24,
		resizeMode: 'contain'
	},
	iconRight: {
		right: 15
	},
	icon: {
		color: '#2F343D'
	},
	textinputsize:{
		flex: 1
	}
});

export default class RCTextInput extends React.PureComponent {
	static propTypes = {
		label: PropTypes.string,
		required: PropTypes.string,
		error: PropTypes.object,
		loading: PropTypes.bool,
		secureTextEntry: PropTypes.bool,
		containerStyle: PropTypes.object,
		inputStyle: PropTypes.object,
		inputRef: PropTypes.func,
		testID: PropTypes.string,
		iconLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		iconRight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		placeholder: PropTypes.string,
		left: PropTypes.element,
		onIconRightPress: PropTypes.func,
		theme: PropTypes.string
	}

	static defaultProps = {
		error: {},
		theme: 'dark'
	}

	state = {
		showPassword: false
	}

	get iconLeft() {
		const { testID, iconLeft, theme } = this.props;
			return (
				<View style={[styles.iconContainer, {backgroundColor: COLOR_YELLOW}]}>
					<Image
						source={iconLeft}
						testID={testID ? `${ testID }-icon-left` : null}
						style={[styles.iconLeft, { color: themes[theme].bodyText}]}
					/>
				</View>
			);
	}

	get iconRight() {
		const { iconRight, onIconRightPress, theme } = this.props;
			return (
				<MaterialCommunityIcons
					name={iconRight.icon}
					style={{ color: themes[theme].bodyText }}
					size={18}
				/>
			);
	}

	tooglePassword = () => {
		this.setState(prevState => ({ showPassword: !prevState.showPassword }));
	}

	render() {
		const { showPassword } = this.state;
		const {
			label, left, required, error, loading, secureTextEntry, containerStyle, inputRef, iconLeft, iconRight, inputStyle, testID, placeholder, theme, ...inputProps
		} = this.props;
		const { dangerColor } = themes[theme];
		return (
			<View style={[styles.inputContainer, containerStyle]}>				
				<View style={styles.wrap}>
					{iconLeft ? this.iconLeft : null}
					<TextInput
						mode={'outlined'}
						label={label}
						activeOutlineColor={error.error ? "#DD2E2E": "#5790DF"}
						theme={{roundness: 20}}
						style={styles.textinputsize}
						ref={inputRef}
						autoCorrect={false}
						autoCapitalize='none'
						underlineColorAndroid='transparent'
						secureTextEntry={secureTextEntry && !showPassword}
						testID={testID}
						accessibilityLabel={placeholder}
						placeholder={placeholder}
						contentDescription={placeholder}
						placeholderTextColor={themes[theme].auxiliaryText}
						// theme={'light'}
						{...inputProps}
					/>
					{iconRight ? this.iconRight : null}
					{loading ? this.loading : null}
					{left}
				</View>
				{error.error ? (
					<Text
						style={[
							styles.label,{ color: dangerColor }
						]}
					>
						No such Email!						
					</Text>
				) : null}
				{error && error.reason ? <Text style={[styles.error, { color: dangerColor }]}>{error.reason}</Text> : null}
			</View>
		);
	}
}
