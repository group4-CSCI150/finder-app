import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import ScreenContainer from '../components/ScreenContainer';
import FadeInView from '../components/FadeInView';
import MyButton from '../components/MyButton';
import {Select, Option} from 'react-native-chooser';


import api from '../utils/apiCaller'
import token from '../utils/tokenFunctions'

var listTags= [ "art", "reading", "writing", "dance", "cooking", "coding", "sports","gaming"];

export default class profilePage extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      name: "Name",
      age: "Age",
      desc: "Bio",
      tag: [],
      username: "",
      isEdit: false,  // editablity of text input - true when edit
      buttonName: "Edit Profile", // default - on button press, title will change to confirm changes
      pressStatus: false, // for changing color of button when edit
      changeButton: false, // change button style depending on if view or edit screen
      loading: false,

    };
  }

  //TODO: Instead of getting user data from token, use the token to get username.
  //      Then, call API using username to get updated user data
  getCurrUser() {
    return api.getSelf()
  }

  async componentDidMount() {
    let _user = await this.getCurrUser();

    this.setState(
      {
        name: _user.name,
        desc: _user.description,
        tag: _user.tags ? _user.tags : [],
        username: _user.username
      }
    )

  }

  handleEdit() {       // if isEdit initially false -> switch to edit page
    this.setState({ isEdit: true });
    this.setState({ buttonName: "Confirm" });
    this.setState({ pressStatus: true }); // change to edit text style
    this.setState({ changeButton: true });  // confirm changes button style
  }

  async handleSave() {     // if isEdit initially true -> confirm changes and switch to viewing
    let updatedUser = {
      name: this.state.name,
      description: this.state.desc,
      tags: this.state.tag,
    }
    
    this.setState({ loading: true })
    await api.updateUser(this.state.username, updatedUser)
    this.setState({ loading: false })

    this.setState({ isEdit: false });
    this.setState({ buttonName: "Edit Profile" });
    this.setState({ pressStatus: false });  // change to view only style
    this.setState({ changeButton: false }); // edit button style
  }

  onSelect(value) {
    let temp = this.state.tag;
    console.log(this.state.tag)
    // check if selected tag has already been selected
    let doesExist = temp.includes(value); 
    if(doesExist){
      console.log("Before", temp)
      temp.splice(temp.indexOf(value),1)
      console.log("AFTER", temp)
      this.setState({tag: temp}); // no change
    }
    else{    // update new tag
      temp.push(value);
      this.setState({tag: temp});
    }
  }

  // display view profile as default - on button press, be able to edit the text fields
  render() {
    const { navigate } = this.props.navigation;

    logout = async () => {
      await token.removeToken()
      navigate('LoginNav')
    }

    let loading;
    if (this.state.loading) {
      loading = <View style={{marginTop: 10}}><ActivityIndicator size="large" color="#FF6017" /></View>
    }
    var i = -1; 
    return (
      <ScreenContainer>
        <FadeInView>
          <Header title="Profile" actions={[{name:'Logout', action: logout, iconName: Platform.OS === "ios" ? "ios-log-out" : "md-log-out"}]}/>
          <ScrollView style={{minHeight: '100%'}} >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{marginTop: 20}}>
                <Image source={require('../images/stock_photo.jpg')} 
                      style={{width: 250, height: 250, borderWidth: 2, borderRadius: 125, borderColor: '#E0E0E0'}}
                />
              </View>

              <TextInput editable={this.state.isEdit}
                multiline={false}
                style={this.state.isEdit ? 
                  {color: '#E0E0E0', fontSize: 38, marginTop: 10, borderWidth: 1, borderColor: '#E0E0E0', padding: 5} :
                  {color: '#E0E0E0', fontSize: 38, marginTop: 10}}
                //style={this.state.pressStatus ? style.textInput_style : style.default_profile}
                onChangeText={(name) => this.setState({ name })}>
                  {this.state.name}
              </TextInput>

              <TextInput editable={this.state.isEdit}
                multiline={true}
                style={this.state.isEdit ?
                  {color: '#E0E0E0', padding: 10, fontSize: 20, marginTop: 10, width: '75%', borderWidth: 1, borderColor: '#E0E0E0'} :
                  {color: '#E0E0E0', padding: 10, fontSize: 20, marginTop: 10, width: '75%'}}
                //style={this.state.pressStatus ? style.textInput_style : style.default_profile}
                onChangeText={(desc) => this.setState({ desc })}>
                  {this.state.desc}
              </TextInput>
                  
              <View style={{width: '75%', height: 2, marginTop: 10, backgroundColor: 'rgba(200, 200, 200, 0.75)'}} />

              <View style={{alignSelf: 'flex-start', marginTop: 30, marginLeft: 30}}>
                <Text style={{fontSize: 22, color: '#E0E0E0'}}>Likes:</Text>
              </View>
              <Select 
                onSelect = {this.onSelect.bind(this)}
                defaultText = {this.state.tag ? this.state.tag.toString() : ''} 
                textStyle = {{color: '#E0E0E0', fontSize: 20}}
                style={{backgroundColor: 'rgba(150, 150, 150, 0.4)', marginTop: 10, 
                        borderRadius: 30, borderColor: 'transparent', minWidth: '75%'}}
                optionListStyle={{position: 'relative', bottom: 0, backgroundColor: '#E0E0E0'}}
                //textStyle = {this.state.isEdit ? style.tagFont_edit : style.tagFont_prof}
                //style = {this.state.pressStatus ? style.tagInput_style : style.default_tag}
                transparent = {true}
              >
                {listTags.map(listTags => (
                  <Option 
                    key={listTags} value={listTags}>
                    {listTags}
                  </Option>
                ))}
              </Select>

              <View style={{marginTop: 30}}>
                <MyButton 
                  onPress={this.state.isEdit ? this.handleSave : this.handleEdit}
                  title={this.state.buttonName}
                  iconName={this.state.isEdit ? undefined : Platform.OS === 'ios' ? 'ios-brush' : 'md-brush'}
                  iconOnLeft={true}
                />
              </View>
              {loading}
              
              <View style={{marginTop: 30}}>
                <MyButton 
                  onPress={() => { this.props.navigation.navigate("Friend") }}
                  title={'Friend List'}
                  iconName={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
                />
              </View>
            </View>
            <View style={{width: 0, height: 150}} />
          </ScrollView>
        </FadeInView>
      </ScreenContainer>
    );
  }
}

// STYLE
const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonEditContainer: {
    height: 30,
    backgroundColor: '#dc143c',
    marginTop: 30,
    width: '60%'
  },

  buttonConfirmContainer: {
    height: 30,
    backgroundColor: '#214786',
    marginTop: 45,
    width: '60%'
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: '#ffffff',
    borderColor: '#214786',
    borderWidth: 5
  },

  textInput_style: {
    height: 45,
    width: 250,
    margin: 5,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
  },

  tagInput_style: {
    height: 45,
    width: 250,
    margin: 5,
    padding: 5,
    borderColor: 'black',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  default_tag: {
    height: 40,
    width: 250,
    margin: 5,
    padding: 5,
    borderColor: 'white',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  // Text styles
  headerFont: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold'
  },

  default_profile: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    color: '#000',
  },

  buttonFont: {
    textAlign: "center",
    color: '#fff',
    fontSize: 20
  },
  tagFont_prof: {
    textAlign: "center",
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    fontSize: 22,
  },

  tagFont_edit: {
    textAlign: "center",
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
  },
});

