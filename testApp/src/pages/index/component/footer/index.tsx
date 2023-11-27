//@ts-ignore
import send from '@/assets/images/send.png'
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import {Button, Image, TextArea, Picker} from "@nutui/nutui-react-taro";
import {useState} from "react";
import {observer} from "mobx-react";
import './index.scss'
import {store} from "../../../../store";
import {Context} from "../../../../types";


const Footer = () => {
  const [inputText, setInputText] = useState('')
  const [model, setModel] = useState<string>('gpt-3.5-turbo')
  const [modelPickerVisible, setModelPickerVisible] = useState(false)

  const {
    system,
    getConversation,
    id,
    openApiKey,
    addConversation,
    // conversationMap,
    showResponse,
    // setConversation,
    // setId,
    // conversationTabs,
    // activeTab
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
    if (!inputText) {
      return
    }
    const conversation = getConversation(id)
    const context: Context[] = []

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

    addConversation(id, {
      prompt: inputText,
      response: 'loading...',
    })

    let res = {
      "id": "chatcmpl-8PAkgYv13TVHAggRdbc5CZxOnwIyz",
      "object": "chat.completion",
      "created": 1701010222,
      "model": "gpt-3.5-turbo-0613",
      "choices": [
        {
          "index": 0,
          "message": {
            "role": "assistant",
            "content": "Hello! How can I assist you today?"
          },
          "finish_reason": "stop"
        }
      ],
      "usage": {
        "prompt_tokens": 25,
        "completion_tokens": 9,
        "total_tokens": 34
      }
    }
    // console.log('requestData', requestData)
    // Taro.request(requestData).then((res: any) => {
    // console.log('res', res)
    let response = res.choices[0].message.content

    showResponse(id, response)

    // })
    // setInputText('')

    // console.log(Taro.getWindowInfo())

  }

  return (

    <View className='footer'>
      <Button
        size='small'
        onClick={() => {
          setModelPickerVisible(!modelPickerVisible)
        }}
        color='#282C34'
      >
        <View
          style={{
            textAlign: 'center',
            height: '100%',
            lineHeight: '100%',
            color: '#98C379',
          }}
        >
          {model.slice(0, -6)}
        </View>
      </Button>
      <Picker
        visible={modelPickerVisible}
        options={models}
        defaultValue={[model]}
        onConfirm={(_list, values: string[]) => {
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
        color='rgba(240, 240, 240, 1)'
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
