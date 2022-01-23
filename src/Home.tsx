import React from "react"
import { NativeSyntheticEvent, SafeAreaView, Text, TextInputChangeEventData, View } from "react-native"
import styled from "styled-components/native"

const MainTitle = styled.Text`
  font-size: 40px;
  align-self: center;
  margin-top: 20px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const MainInput = styled.TextInput`
  margin: 10px 20px;
  flex: 1 0;
`

const SubmitButton = styled.TouchableOpacity`
  margin: 0 20px;
`

const Home = () => {
  const [newTask, setNewTask] = React.useState('')
  const [listOfTasks, setListOfTasks] = React.useState<string[]>([])

  const handleSubmit = React.useCallback(() => {
    setListOfTasks(oldList => [...oldList, newTask])
    setNewTask('')
  }, [newTask])
  console.log(listOfTasks)

  return <SafeAreaView>
    <MainTitle>ToDo</MainTitle>
    <Row>
      <MainInput autoFocus value={newTask} onChangeText={setNewTask} />
      <SubmitButton onPress={handleSubmit}><Text>Add</Text></SubmitButton>
    </Row>
    {listOfTasks.map((task, index) => <View>
      <Text key={index}>{task}</Text>
    </View>)}
  </SafeAreaView>
}

export default Home