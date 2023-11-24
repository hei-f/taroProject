import { useState } from 'react'
import { Button } from '@nutui/nutui-react-taro';
import { View, Input, Picker, } from '@tarojs/components'
import './index.scss'


const Index = () => {
  const [inputText, setInputText] = useState('')
  const [model, setModel] = useState('gpt-3')
  const [conversations, setConversations] = useState([])

  const models = ['gpt-3', 'gpt-2', 'codex']

  const onInput = (e) => {
    setInputText(e.target.value)
  }

  const onModelChange = (e) => {
    setModel(models[e.detail.value])
  }

  const onSubmit = () => {
    // 调用云函数发送请求到OpenAI API
    // 更新对话列表
  }

  return (
    <View className='container'>
      <Picker mode='selector' range={models} onChange={onModelChange}>
        <View>选择模型：{model}</View>
      </Picker>
      <View className='conversations'>
        {conversations.map((item, index) => (
          <View key={index}>
            <View>用户：{item.prompt}</View>
            <View>助手：{item.response}</View>
          </View>
        ))}
      </View>


      <View className='footer'>
        <Input onInput={onInput} onConfirm={onSubmit} value={inputText} style={{flexGrow: 1}} />
        <Button fill='outline' type='info'>分享给好友</Button>
      </View>

    </View>
  )
};

export default Index;
