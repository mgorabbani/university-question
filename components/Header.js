import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StatusBar, 
    Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import SearchBar from 'react-native-material-design-searchbar';


class Header extends Component {
    state = {
        search: ''
    }
    _onBlur() {
        if (this.state.search.length > 0) {
            console.log('On search')
            this.props.navigation.navigate('Search',{keyword:this.state.search});
        } else {
            console.log('On Blur', this.state)
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: "#176A39", padding:5}}>

                <SearchBar
                    inputStyle={{ backgroundColor: "#fff", borderWidth: 0, borderRadius: 2 }}
                    iconColor="#176A39"
                    onSearchChange={(value) => this.setState({ search: value })}
                    height={40}
                    onFocus={() => console.log('On Focus')}
                    onBlur={() => this._onBlur()}
                    placeholder={' by subject code'}
                    autoCorrect={false}
                    returnKeyType={'search'}
                />

            </View>

        )
    }
}

export default Header