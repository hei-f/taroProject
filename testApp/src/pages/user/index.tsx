import {View} from "@tarojs/components";
// @ts-ignore
import {store} from '@/store'
import {Cell, Dialog, Input} from "@nutui/nutui-react-taro";
import {observer} from "mobx-react";
import {useState} from "react";
import './index.scss'

const User = () => {
  const {
    openApiKey,
    setOpenApiKey,
  } = store
  const [keyDialogVisible, setKeyDialogVisible] = useState(false)
  const [inputKey, setInputKey] = useState('')

  const onApiKeyCellClick = () => {
    setInputKey('')
    setKeyDialogVisible(true)
  }

  const onApiKeyInputChange = (value: string) => {
    setInputKey(value)
  }

  const onApiKeyDialogConfirm = () => {
    setOpenApiKey(inputKey)
    setKeyDialogVisible(false)
  }

  const onApiKeyDialogCancel = () => {
    setKeyDialogVisible(false)
  }

  return (
    <View
      className='user'
    >
      <Cell
        className='apiKey'
        title='设置ApiKey'
        extra={openApiKey}
        align='center'
        onClick={onApiKeyCellClick}
      />
      <Dialog
        className='keyDialog'
        visible={keyDialogVisible}
        title='设置ApiKey'
        content={
          <Input
            className='keyInput'
            value={inputKey}
            onChange={onApiKeyInputChange}
            placeholder='请输入ApiKey'
          />
        }
        onConfirm={onApiKeyDialogConfirm}
        onCancel={onApiKeyDialogCancel}
      >
      </Dialog>
    </View>
  )
}

export default observer(User)
