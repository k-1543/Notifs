import React from 'react';
import {View} from 'react-native';

const CardItem = (props) =>
{
	return(
		<View style = {styles.containerStyle}>
			{props.children}
		</View>
	);
		
};
const styles =
{
	containerStyle:
	{
		borderBottomWidth: 1,
		padding: 5,
		//height: 90,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#f8f8f8',
		position: 'relative'
	}
};
export {CardItem};
