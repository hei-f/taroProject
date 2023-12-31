//@ts-ignore
import send from 'src/assets/images/send_green.png'
import {View} from "@tarojs/components";
import {Button, Image, TextArea, Picker, Dialog} from "@nutui/nutui-react-taro";
import {CSSProperties, useState} from "react";
import {observer} from "mobx-react";
import {store} from "src/store";
import {chatRequest, FetchStream} from "src/api";
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
    setLoading,
    env
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
      stream: env === 'WEB' //小程序中不能使用sse
    }

    addConversation(getId, {
      prompt: inputText,
      response: 'loading...',
    })
    setInputText('')
    setLoading(true)


    let resContent = ''

    if (env === 'WEB') {
      //创建一个fetchStream实例，用于发送请求
      const fetchStream = new FetchStream({
        url: 'https://api.openai.com/v1/chat/completions',
        requestInit: {
          body: JSON.stringify(requestData),
          headers: {
            'Authorization': `Bearer ${openApiKey}`,
            'Content-Type': 'application/json',
          },
        },
        onMessage: (responses: string[], _index: number) => {
          // console.log('responses=', responses)
          for (let response of responses) {
            let temp = response.slice(6)
            // console.log('temp=', temp)

            if (temp === '[DONE]') {
              break
            }

            let res = JSON.parse(temp)
            // console.log('res=', res)
            let plusContent = res.choices[0].delta.content

            //TODO:如果finish_reason是length，提示用户输出太长，需要输入继续
            // if (res.choices[0].finish_reason === 'stop') {
            //
            //   fetchStream.abort()
            //   console.log('abort')
            // }

            if (plusContent !== undefined) {
              // console.log('plusContent=', plusContent)
              resContent += plusContent
            }
          }

          showResponse(getId, resContent)
          setLoading(false)
        },
        onDone: () => {
          const conversationInfo = JSON.stringify({
            conversationMap: conversationMap,
            conversationTabs: conversationTabs
          })

          Taro.setStorage({
            key: 'conversationInfo',
            data: conversationInfo
          })
        },
        onTimeout: () => {
          console.log('timeout')
        },
        onError: (err: any) => {
          console.log('err=', err)
          // showResponse(getId, JSON.stringify(err))
        }
      })

      //调用createFetchRequest方法，发送请求
      fetchStream.createFetchRequest()


    } else {
      //小程序中用不了sse，只能用websocket，但openAi的api不支持websocket
      chatRequest(requestData, openApiKey).then((res: ChatResponse) => {
        // console.log('res=', res)
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
        try {
          showResponse(getId, JSON.stringify(err))
        } catch {
          showResponse(getId, '请求出错')
          console.log('err=', err)
        }

        setLoading(false)

      })

    }

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

  const getFootStyle = (): CSSProperties => {
    if (env === 'WEB') {
      return {
        position: 'fixed',
        bottom: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '45px',
      }
    } else {
      return {}
    }
  }

  const getTextAreaStyle = (): CSSProperties => {
    if (env === 'WEB') {
      return ({
        width: '160px',
        color: '#98C379',
      })
    } else {
      return ({
        width: '160px',
      })
    }
  }

  return (

    <View
      className='footer'
      style={getFootStyle()}
    >
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
        style={getTextAreaStyle()}
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
