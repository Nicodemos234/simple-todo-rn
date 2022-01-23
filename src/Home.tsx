import React from "react"
import { SafeAreaView, Text, View } from "react-native"
import styled from "styled-components/native"
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const ListWrapper = styled.View`
  padding: 20px;
`

const ItemWrapper = styled.View`
  margin: 5px 0;
  flex-direction: row;
  justify-content: space-between;
`

const ExcludeButton = styled.TouchableOpacity``

const Home = () => {
  const [newTask, setNewTask] = React.useState('')
  const [listOfTasks, setListOfTasks] = React.useState<string[]>([])

  const handleSubmit = React.useCallback(() => {
    setListOfTasks(oldList => [...oldList, newTask])
    setNewTask('')
  }, [newTask, setListOfTasks, setNewTask])

  const handleExclude = React.useCallback((index: number) => {
    console.log()
    setListOfTasks(oldArray => oldArray.filter((_, pos) => pos !== index))
  }, [setListOfTasks])

  React.useEffect(() => {
    AsyncStorage.getItem('@todo').then((data) => {
      if (data) {
        const parsed = JSON.parse(data)
        setListOfTasks(parsed)
      }
    })
  }, [])

  React.useEffect(() => {
    storeData(listOfTasks)
  }, [listOfTasks])

  const storeData = React.useCallback(async (listOfTasks: string[]) => {
    try {
      const jsonValue = JSON.stringify(listOfTasks)
      await AsyncStorage.setItem('@todo', jsonValue)
    } catch (e) {
    }
  }, [])

  return <SafeAreaView>
    <MainTitle>ToDo</MainTitle>
    <Row>
      <MainInput autoFocus value={newTask} onChangeText={setNewTask} onSubmitEditing={handleSubmit} />
      <SubmitButton onPress={handleSubmit}><Text>Add</Text></SubmitButton>
    </Row>
    <ListWrapper>
      {listOfTasks.map((task, index) => <ItemWrapper key={index}>
        <Text>{task}</Text>
        <ExcludeButton onPress={() => handleExclude(index)}><Text>X</Text></ExcludeButton>
      </ItemWrapper>)}
    </ListWrapper>
  </SafeAreaView>
}

export default Home