import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

let colors= ['#154120','#351B9B','#E22892','#1B622D']
let color;

export default Question = (props) => {
    const { exam, semester, year, subjectCode, url } = props.item.data
    switch(exam) {
        case 'Mid': color=colors[0]
        case 'Final': color=colors[1]
        case 'Quiz':  color=colors[2]
        default  :  color=colors[3]
    }
    console.log(props.in,'index')
    return (
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('View',{question:props.item})}>
            <View style={styles.box}>
                <View style={{ padding: 10, alignItems: 'flex-start' }} >
                    <Text style={{  }}>Subject Code: {subjectCode}</Text>
                    <Text style={{  }}>Exam Type: {exam}</Text>
                    <Text style={{  }}>Semester: {semester}</Text>
                    <Text style={{  }}>Year: {year}</Text>
                </View>
                <View style={{ padding: 10 }} >
                    <View style={{backgroundColor:color,height:100,flex:1,alignItems:'center',justifyContent:'center'}} >
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}} >{exam}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

styles = {
    box: {
        flexDirection: 'column',
        width: 165,
        padding: 0,
        marginVertical: 10,
        marginRight: 10,
        backgroundColor: "#fff",
        shadowColor: '#ccc',
        shadowOpacity: 2,
        shadowOffset: { height: 2, width: 0 },
        borderRadius: 3
    }
}