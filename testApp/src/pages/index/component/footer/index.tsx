//@ts-ignore
import send from '@/assets/images/send.png'
import {View} from "@tarojs/components";
import {Button, Image, Input, Picker} from "@nutui/nutui-react-taro";
import {useState} from "react";
// @ts-ignore
import {models} from "@/utils/constant";
import './index.scss'
import Taro from "@tarojs/taro";


const Footer = (
  // props: {}
) => {
  // const {
  //
  // } = props

  const [inputText, setInputText] = useState('')
  const [model, setModel] = useState<string | number>('gpt-3')
  const [modelPickerVisible, setModelPickerVisible] = useState(false)

  const onInput = (value: string) => {
    setInputText(value)
  }

  const onSubmit = () => {
    Taro.request({
      url: 'http://localhost:5000/chat',
      method: 'POST',
      data: {
        model,
        text: inputText,
      },
    })
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

      <Input
        clearable
        placeholder='输入对话内容'
        onChange={onInput}
        onConfirm={onSubmit}
        value={inputText}
        style={{
          flexGrow: 1,
        }}
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
      >
      </Button>
    </View>
  )
}
export default Footer;
