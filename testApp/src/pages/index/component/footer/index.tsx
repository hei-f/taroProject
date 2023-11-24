import {View} from "@tarojs/components";
import {Button, Image, Input, Picker} from "@nutui/nutui-react-taro";
import './index.scss'
import send from '@/assets/img/send.png'


const Footer = (props: {
  inputText: string
  onInput: (value: string) => void
  onSubmit: () => void
  model: string | number
  setModel: (model: string | number) => void
  modelPickerVisible: boolean
  setModelPickerVisible: (visible: boolean) => void
  models: { value: string | number, text: string }[][]
}) => {
  const {
    inputText,
    onInput,
    onSubmit,
    model,
    setModel,
    modelPickerVisible,
    setModelPickerVisible,
    models
  } = props

  return (

    <View className='footer'>
      <Button
        // fill='outline'
        size='small'
        // color='#98C379'
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
