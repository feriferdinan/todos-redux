import React, { Component } from 'react';
import { ScrollView,AppRegistry, Text, TextInput, View ,StyleSheet,Keyboard,TouchableOpacity,Image} from 'react-native';
import { Divider } from 'react-native-elements';
import {SwipeRow, Icon, Button  } from 'native-base';
import {connect } from 'react-redux';
import * as actionTodo from '../redux/actions/todos'
 class TodoList extends Component {
  constructor(props) {
		super(props)
		this.state = {
			id: "",
      newTodo: "",
      edited:false
		}
	}

	placeSubmitHandler = () => {
		this.props.addTodos({
			id: Math.floor(Math.random() * 9),
			name: this.state.newTodo
		})
    
		this.setState({ newTodo: '' })
		Keyboard.dismiss()
	}
  handleChangeText = (value) => {
    this.setState({
      newTodo: value
    })
   }
   handleButtonEdit = () => {
		this.props.editTodos({
			id: this.state.id,
			name: this.state.newTodo
		})

		this.setState({ newTodo: "" ,edited:false})
    Keyboard.dismiss()
	}

  handleRemove = item => () => {
    this.props.removeTodos(item.id)
  }
  handleEdit = (item) => () => {
		this.setState({ newTodo: item.name, id: item.id, edited:true })
	}
   
  render() {
   console.log(this.props.todos.todos);
  console.log(this.state.newTodo);
  
    return (
      
      <View style={styles.container}>

       <Text style={{color:"#000",fontSize:20,textAlign:"center",margin:20}}>My Task</Text>
       <View style={styles.form}>

        <View style={styles.wrapperTextInput}>
            <TextInput 
            onChangeText={this.handleChangeText} 
            value={this.state.newTodo}
            style={styles.textInput} 
            placeholder='Masukan Kegiatanmu disini... '
            />
        </View>
        <View style={{marginLeft:5}} >
       {(this.state.newTodo=="")? null :
         (this.state.edited==false)?
            <Button success
            onPress={this.placeSubmitHandler}>
            <Text style={{paddingHorizontal:17,color:'#fff'}} >Tambah</Text>
          </Button>
            :
          <Button warning
           onPress={this.handleButtonEdit}>
            <Text style={{paddingHorizontal:17,color:'#fff'}} >Edit</Text>
          </Button>
          }
          </View>
      </View>
      <View style={styles.content}>
         <View>
      <ScrollView>
         {this.props.todos.todos.map((item, i) =>
          <SwipeRow
            key={i}
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
              <Button success onPress={this.handleEdit(item)}>
                <Icon active name="create" />
              </Button>
            }
            body={
              <View>
                <Text style={{paddingHorizontal:15,color:"#000",fontSize:17}} >{item.name}</Text>
              </View>
            }
            right={
              <Button danger onPress={this.handleRemove(item)}>
                <Icon active name="trash" />
              </Button>
            }
          />
				)}
</ScrollView>

				{this.props.todos.todos.length === 0 &&
        <View style={{flexDirection:"column",margin:10,justifyContent:"center"}} >
          <Image resizeMode={"contain"} style={{ height: 150,alignSelf:"center" }} source={require("./../assets/img/clipboard.png")} />
					<Text style={{ fontSize: 20 ,textAlign:"center"}}>{"Task Masih kosong nich"}</Text>
				
        </View>
        }
        </View>
       </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
   return {
    todos: state.todos
   }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodos: (value) => dispatch(actionTodo.addTodo(value)),
    editTodos: (value) => dispatch(actionTodo.editTodo(value)),
    removeTodos: (id) => dispatch(actionTodo.removeTodo(id))
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#e9e9ef"
  },
  content:{
   marginVertical:20
  },
  form:{
    flexDirection: 'row',
    margin:8
  },
  textInput:{
    width:"100%",
    borderWidth:0,
    height:47,
    borderRadius:5,
    backgroundColor:"#aeaeaeae",
    
  },
  wrapperButton:{
    margin:5,
    
  },
  wrapperTextInput:{
   flex:1
    
   
  },
  todo:{
  backgroundColor:"#fff",
  margin:5,borderRadius:6,shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  
  elevation: 5,}
})


// export default  TodoList;
export default  connect(mapStateToProps,mapDispatchToProps)(TodoList)