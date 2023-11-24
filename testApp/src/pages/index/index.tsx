import {useState} from 'react'
import {observer} from "mobx-react";
import {View} from '@tarojs/components'
import './index.scss'
import HistoryConversation from "./component/historyConversation";
import Footer from "./component/footer";


type Conversation = {
  prompt: string
  response: string
}

const Index = () => {
  const [inputText, setInputText] = useState('')
  const [model, setModel] = useState<string | number>('gpt-3')
  const [conversations, setConversations] = useState<Conversation[]>([])

  const [modelPickerVisible, setModelPickerVisible] = useState(false)

  const models = [
    [
      {
        value: 'gpt-3',
        text: 'GPT-3'
      },
      {
        value: 'gpt-4',
        text: 'GPT-4'
      }
    ]
  ]

  const onInput = (value: string) => {
    setInputText(value)
  }

  const onSubmit = () => {
    // 调用云函数发送请求到OpenAI API
    // 更新对话列表
  }

  return (
    <View className='container'>
      {/*历史对话*/}
      <HistoryConversation />

      {/*<View>*/}
      {/*  <GptContent>*/}
      {/*    123123*/}
      {/*  </GptContent>*/}
      {/*</View>*/}

      {/*对话内容*/}
      <View className='conversations'>
        {conversations.map((item, index) => (
          <View key={index}>
            <View>用户：{item.prompt}</View>
            <View>助手：{item.response}</View>
          </View>
        ))}
      </View>

      {/*输入对话*/}
      <Footer
        inputText={inputText}
        onInput={onInput}
        onSubmit={onSubmit}
        model={model}
        setModel={setModel}
        modelPickerVisible={modelPickerVisible}
        setModelPickerVisible={setModelPickerVisible}
        models={models}
      />

    </View>
  )
};

export default observer(Index);
