//@ts-ignore
import send from '@/assets/images/send.png'
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import {Button, Image, TextArea, Picker} from "@nutui/nutui-react-taro";
import {useState} from "react";
// @ts-ignore
import {store} from "@/store";
import {observer} from "mobx-react";
import './index.scss'


const Footer = () => {
  const [inputText, setInputText] = useState('')
  const [model, setModel] = useState<string | number>('gpt-3')
  const [modelPickerVisible, setModelPickerVisible] = useState(false)

  const {
    system,
    getConversation,
    id,
    openApiKey,
    addConversation,
    conversationMap,
  } = store

  const models = [
    [
      {
        value: 'gpt-3.5-turbo',
        text: 'gpt-3.5-turbo'
      },
      {
        value: 'gpt-4.0-turbo',
        text: 'gpt-4.0-turbo'
      }
    ]
  ]


  const onInput = (value: string) => {
    setInputText(value)
  }

  const onSubmit = async () => {
    const conversation = getConversation(id)
    const context: any[] = []

    for (let item of conversation) {
      context.push({
        role: "user",
        content: item.prompt,
      })
      context.push({
        role: "assistant",
        content: item.response,
      })
    }

    const requestData = {
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      data: {
        model: model,
        messages: [
          {
            role: "system",
            content: system,
          },
          ...context,
          {
            role: "user",
            content: inputText,
          }
        ],
      },
      header: {
        'Authorization': `Bearer ${openApiKey}`,
        'Content-Type': 'application/json',
      }
    }

    addConversation('1', {
      prompt: inputText,
      response: 'loading...',
    })

    // conversationMap['1'].push({
    //   prompt: inputText,
    //   response: 'loading...',
    // })
    console.log(conversationMap)

    // console.log(requestData)
    // const res = await Taro.request(requestData)
    // //
    // console.log(res)
  }

  return (

    <View className='footer'>
      <Button
        size='small'
        onClick={() => {
          setModelPickerVisible(!modelPickerVisible)
        }}
      >
        <View
          style={{
            textAlign: 'center',
            height: '100%',
            lineHeight: '100%',
          }}
        >
          {model}
        </View>
      </Button>
      <Picker
        visible={modelPickerVisible}
        options={models}
        defaultValue={[model]}
        onConfirm={(_list, values) => {
          setModel(values[0])
        }}
        onClose={() => setModelPickerVisible(false)}
      />

      <TextArea
        placeholder='输入对话内容'
        onChange={onInput}
        onConfirm={onSubmit}
        value={inputText}
        maxLength={2000}
        showCount
        confirmType='send'
      />

      <Button
        // fill='outline'
        color='rgba(230, 230, 230, 0.5)'
        icon={
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Image
              src={send}
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          </View>
        }
        onClick={onSubmit}
      />
    </View>
  )
}
export default observer(Footer);
