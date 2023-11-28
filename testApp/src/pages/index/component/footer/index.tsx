//@ts-ignore
import send from 'src/assets/images/send_green.png'
import {View} from "@tarojs/components";
import {Button, Image, TextArea, Picker} from "@nutui/nutui-react-taro";
import {useState} from "react";
import {observer} from "mobx-react";
import {store} from "src/store";
import {chatRequest} from "src/api";
import {ChatRequestData, Context} from "src/types";
import './index.scss'


const Footer = () => {
  const [inputText, setInputText] = useState('')
  const [model, setModel] = useState<string>('gpt-3.5-turbo')
  const [modelPickerVisible, setModelPickerVisible] = useState(false)

  const {
    system,
    getConversation,
    openApiKey,
    addConversation,
    // conversationMap,
    showResponse,
    // setConversation,
    // conversationTabs,
    // activeTab
    getId,
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
    const conversation = getConversation(getId)
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

    const requestData: ChatRequestData = {
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
    }

    addConversation(getId, {
      prompt: inputText,
      response: 'loading...',
    })

    setInputText('')
    chatRequest(requestData, openApiKey).then((res: any) => {
      console.log('res=', res)
      let response = res.data.choices[0].message.content
      showResponse(getId, response)
    }).catch((err: any) => {

      console.log('err=', err)
    })

  }

  return (

    <View className='footer'>
      <Button
        size='small'
        onClick={() => {
          setModelPickerVisible(!modelPickerVisible)
        }}
        color='#282C34'
        style={{
          paddingLeft: '7px',
          paddingRight: '7px',
        }}
      >
        <View
          style={{
            textAlign: 'center',
            height: '100%',
            lineHeight: '100%',
            color: '#98C379',
            width: '42px',
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
        color='#282C34'
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
