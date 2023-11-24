// @ts-ignore
import send from "@/assets/img/send.png";
import {useState} from 'react'
import {Button, Input, Image} from '@nutui/nutui-react-taro';
import {View} from '@tarojs/components'
import './index.scss'
import ModelSelect from "./component/modelSelect";
import HistoryConversation from "./component/historyConversation";


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
      }, {
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

      {/*选择模型*/}
      <ModelSelect
        model={model}
        setModel={setModel}
        modelPickerVisible={modelPickerVisible}
        setModelPickerVisible={setModelPickerVisible}
        models={models}
      />

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
      <View className='footer'>
        <Input
          clearable
          placeholder='输入对话内容'
          onChange={onInput}
          onConfirm={onSubmit}
          value={inputText}
          style={{
            flexGrow: 1,
            // @ts-ignore
            '--nutui-input-border-bottom-width': '1px'
          }}
          confirmType='send'
        />

        <Button fill='outline' type='info'>
          <Image
            src={send}
            style={{width: '20px', height: '20px'}}
          />
        </Button>
      </View>

    </View>
  )
};

export default Index;
