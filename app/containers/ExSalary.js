import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import I18n from '../i18n';
import {COLOR_BLACK, COLOR_YELLOW, DARK_WEAK, themes} from '../constants/colors';
import sharedStyles from '../views/Styles';
import {VectorIcon} from './VectorIcon';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import LinearGradient from 'react-native-linear-gradient';
import ScrollView from 'react-native-nested-scroll-view';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	label: {
		marginBottom: 4,
		fontSize: 14,
		...sharedStyles.textSemibold
	},
	content: {
		position: 'relative'
	},
	selectContainer: {
		flex:1,
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingBottom: 8,
		top: 0,
		height: 150,
		width: '100%'
	},
	valueContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 36,
		borderRadius: 24,
		borderWidth: 1,
	},
	selectContent: {
		flexDirection: 'row',
		borderColor: "#000",
		borderWidth: 1,
		marginTop: 10,
		marginBottom:5,
		borderRadius: 10,
		shadowColor:"#000"
	},
	headerContainer: {
		height: 36,
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
	},
	doneText: {
		color: 'white',
		position: 'absolute',
		right: 4,
		top: 8,
		fontWeight: 'bold'
	},
	selectHeader: {
		textAlign: 'center',
		fontSize: 16
	},
	selectedStyle: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 8,
		backgroundColor: "#E5E5E5"
	},
	selectStyle: {
		paddingVertical: 4,
		paddingHorizontal: 8
	},
	selectValue: {
		fontSize: 16,
		textAlign: 'center'
	},
	value: {
		marginRight: 12
	},
	iconStyle: {
		position: 'absolute',
		right: 12,
	}
});

const SELECT_SALARIES = [
	I18n.t('Salary_select_1'),
	I18n.t('Salary_select_2'),
	I18n.t('Salary_select_3'),
	I18n.t('Salary_select_4'),
	I18n.t('Salary_select_5')
];

class ExSalary extends React.Component{
	static propTypes = {
		label: PropTypes.string,
		containerStyle: PropTypes.object,
		value: PropTypes.string,
		action: PropTypes.func,
		toggleShow: PropTypes.func,
		topScrollEnable: PropTypes.bool,
		theme: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			value: props.value,
		}
	}

	componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
		const {topScrollEnable} = this.props;
		if(prevProps.topScrollEnable !== topScrollEnable && this.state.show){
			this.setState({show: !topScrollEnable});
		}
	}

	onChange = (value) => {
		this.setState({value})
		this.props.action({ value: value});
	};

	setShow = (show) => {
		const {value} = this.props;

		if(show && value){
			this.setState({show, value: value});
		} else {
			this.setState({show});
		}
		this.props.toggleShow(show);

		setTimeout(() => {
			if(this.scrollValue && this.state.value > 1){
				this.scrollValue.scrollTo({x: 0, y: (this.state.value - 1) * 30, animated: false});
			}
		}, 300);
	}

	render(){
		const {show, value} = this.state;
		const {label, containerStyle, theme} = this.props;

		return (
			<View style={[styles.container, containerStyle]}>
				<View style={styles.content}>
					<TouchableOpacity onPress={() => this.setShow(!show)}>
						<TextInput
							mode={'outlined'}
							label={label}
							activeOutlineColor={"#5790DF"}
							theme={{roundness: 20}}
							editable={false}
							value={SELECT_SALARIES[value]}
						/>
					</TouchableOpacity>
					{
						show &&							
							<View style={styles.selectContent}>
								<ScrollView
									style={{flex: 1}}
									showsVerticalScrollIndicator={false}
									{...scrollPersistTaps}
									ref={(ref) => {
										this.scrollValue = ref;
									}}
								>
									{
										SELECT_SALARIES.map((d, index) =>
											<TouchableOpacity onPress={() => {
												this.onChange(index)
												this.setShow(false)
											}}  style={index === value ? styles.selectedStyle: styles.selectStyle}>
												<Text style={styles.selectValue}>{d}</Text>
											</TouchableOpacity>)
									}
								</ScrollView>
							</View>
					}
				</View>
			</View>
		);
	}
}


export default ExSalary;
