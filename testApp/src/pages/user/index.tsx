import {View} from "@tarojs/components";
import {store} from 'src/store'
import {Cell, Dialog, Input} from "@nutui/nutui-react-taro";
import {observer} from "mobx-react";
import {useState} from "react";
import ParamsDialog from "src/pages/user/component/paramsDialog";
import Taro from "@tarojs/taro";
import './index.scss'


const User = () => {
  const {
    openApiKey,
    setOpenApiKey,
    system,
    setSystem,
    params
  } = store

  const [keyDialogVisible, setKeyDialogVisible] = useState(false)
  const [inputKey, setInputKey] = useState('')

  const [systemDialogVisible, setSystemDialogVisible] = useState(false)
  const [inputSystem, setInputSystem] = useState('')

  const [paramsDialogVisible, setParamsDialogVisible] = useState(false)

  const handleCellClick = (type: string) => {
    switch (type) {
      case 'apiKey':
        return (() => {
          setInputKey('')
          setKeyDialogVisible(true)
        })
      case 'system':
        return (() => {
          setInputSystem('')
          setSystemDialogVisible(true)
        })
      case 'params':
        return (() => {
          setParamsDialogVisible(true)
        })
      default:
        break
    }
  }

  const handleInputChange = (type: string) => {
    switch (type) {
      case 'apiKey':
        return ((value: string) => {
          setInputKey(value)
        })
      case 'system':
        return ((value: string) => {
          setInputSystem(value)
        })
      default:
        break
    }
  }

  const handleDialogConfirm = (type: string) => {


    switch (type) {
      case 'apiKey':
        return (() => {
          setOpenApiKey(inputKey)
          let paramsInfo = JSON.stringify({
            key: inputKey,
            system: system,
            params: params
          })
          Taro.setStorageSync('paramsInfo', paramsInfo)
          setKeyDialogVisible(false)

        })
      case 'system':
        return (() => {
          setSystem(inputSystem)

          let paramsInfo = JSON.stringify({
            key: openApiKey,
            system: inputSystem,
            params: params
          })
          Taro.setStorageSync('paramsInfo', paramsInfo)
          setSystemDialogVisible(false)
        })
      default:
        break
    }
  }

  const handleDialogCancel = (type: string) => {
    switch (type) {
      case 'apiKey':
        return (() => {
          setKeyDialogVisible(false)
        })
      case 'system':
        return (() => {
          setSystemDialogVisible(false)
        })
      default:
        break
    }
  }

  return (
    <View
      className='user'
    >

      <Cell
        className='apiKey'
        title='设置ApiKey'
        extra={`${openApiKey.substring(0, 5)}******${openApiKey.substring(openApiKey.length - 5)}`}
        align='center'
        onClick={handleCellClick('apiKey')}
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
            onChange={handleInputChange('apiKey')}
            placeholder='请输入ApiKey'
          />
        }
        onConfirm={handleDialogConfirm('apiKey')}
        onCancel={handleDialogCancel('apiKey')}
      />

      <Cell
        className='system'
        title='设置System'
        extra={system}
        align='center'
        onClick={handleCellClick('system')}
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
            className='systemInput'
            value={inputSystem}
            onChange={handleInputChange('system')}
            placeholder='请输入System'
          />
        }
        onConfirm={handleDialogConfirm('system')}
        onCancel={handleDialogCancel('system')}
      />

      <Cell
        className='params'
        title='高级设置'
        align='center'
        onClick={handleCellClick('params')}
        style={{
          boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
        }}
      />
      <ParamsDialog
        paramsDialogVisible={paramsDialogVisible}
        setParamsDialogVisible={setParamsDialogVisible}
      />
    </View>
  )
}

export default observer(User)
