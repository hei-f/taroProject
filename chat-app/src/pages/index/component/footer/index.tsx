//@ts-ignore
import send from 'src/assets/images/send_green.png'
import {View} from "@tarojs/components";
import {Button, Image, TextArea, Picker, Dialog} from "@nutui/nutui-react-taro";
import {useState} from "react";
import {observer} from "mobx-react";
import {store} from "src/store";
import {chatRequest} from "src/api";
import Taro from "@tarojs/taro";
import {ChatRequestData, ChatResponse, Context} from "src/types";
import './index.scss'


const Footer = () => {
  const [inputText, setInputText] = useState('')
  const [model, setModel] = useState<string>('gpt-3.5-turbo')
  const [modelPickerVisible, setModelPickerVisible] = useState(false)
  const [noKeyDialogVisible, setNoKeyDialogVisible] = useState(false)

  const {
    system,
    getConversation,
    openApiKey,
    addConversation,
    showResponse,
    getId,
    conversationMap,
    conversationTabs,
    loading,
    setLoading
  } = store

  const models = [
    [
      {
        value: 'gpt-3.5-turbo',
        text: 'gpt-3.5-turbo'
      },
      {
        value: 'gpt-4',
        text: 'gpt-4'
      }
    ]
  ]


  const onInput = (value: string) => {
    setInputText(value)
  }

  const onSubmit = async () => {
    if (!inputText || loading) {
      return
    }
    if (!openApiKey) {
      setNoKeyDialogVisible(true)
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
    setLoading(true)

    setInputText('')

    //小程序中用不了sse，只能用websocket，但openAi的api不支持websocket
    chatRequest(requestData, openApiKey).then((res: ChatResponse) => {
      console.log('res=', res)
      let response = res.data.choices[0].message.content
      showResponse(getId, response)

      const conversationInfo = JSON.stringify({
        conversationMap: conversationMap,
        conversationTabs: conversationTabs
      })

      Taro.setStorage({
        key: 'conversationInfo',
        data: conversationInfo
      })
      setLoading(false)
    }).catch((err: any) => {
      setLoading(false)

      console.log('err=', err)
    })
  }

  const getModelName = (value: string) => {
    switch (value) {
      case 'gpt-3.5-turbo':
        return 'GPT-3.5'
      case 'gpt-4':
        return 'GPT-4'
      default:
        return 'GPT-3.5'
    }
  }

  return (

    <View className='footer'>
      <Dialog
        title='ApiKey未设置'
        visible={noKeyDialogVisible}
        confirmText='前往设置'
        hideCancelButton
        content='请先前往User页面设置ApiKey'
        onConfirm={() => {
          Taro.switchTab({
            url: '/pages/user/index',
            complete: () => {
              setNoKeyDialogVisible(false)
            }
          })
        }}
      />
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
          {getModelName(model)}
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
        placeholder=' '
        onChange={onInput}
        onConfirm={onSubmit}
        value={inputText}
        maxLength={2000}
        showCount
        confirmType='send'
        style={{
          width: '160px'
        }}
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
