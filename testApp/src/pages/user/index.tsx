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
    system,
    setSystem,
  } = store
  const [keyDialogVisible, setKeyDialogVisible] = useState(false)
  const [inputKey, setInputKey] = useState('')

  const [systemDialogVisible, setSystemDialogVisible] = useState(false)
  const [inputSystem, setInputSystem] = useState('')

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

  const onSystemCellClick = () => {
    setInputSystem('')
    setSystemDialogVisible(true)
  }

  const onSystemInputChange = (value: string) => {
    setInputSystem(value)
  }

  const onSystemDialogConfirm = () => {
    setSystem(inputSystem)
    setSystemDialogVisible(false)
  }

  const onSystemDialogCancel = () => {
    setSystemDialogVisible(false)
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
        style={{
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
        }}
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

      <Cell
        className='system'
        title='设置System'
        extra={system}
        align='center'
        onClick={onSystemCellClick}
        style={{
          boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
        }}
      />
      <Dialog
        className='systemDialog'
        visible={systemDialogVisible}
        title='设置System'
        content={
          <Input
            className='keyInput'
            value={inputSystem}
            onChange={onSystemInputChange}
            placeholder='请输入System'
          />
        }
        onConfirm={onSystemDialogConfirm}
        onCancel={onSystemDialogCancel}
      >
      </Dialog>
    </View>
  )
}

export default observer(User)
