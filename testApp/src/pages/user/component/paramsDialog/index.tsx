import Taro from "@tarojs/taro";
import {observer} from "mobx-react";
import {FormItemRuleWithoutValidator} from "@nutui/nutui-react-taro/dist/types/packages/form/types";
import {Button, Dialog, Form, Input,} from "@nutui/nutui-react-taro";
import {View} from "@tarojs/components";
import {store} from "src/store";
import {Params, ParamsDialogValue} from "src/types";

const ParamsDialog = (props: {
  paramsDialogVisible: boolean,
  setParamsDialogVisible: (paramsDialogVisible: boolean) => void,
}) => {
  const {
    paramsDialogVisible,
    setParamsDialogVisible,
  } = props

  const {
    setParams,
    openApiKey,
    system,
  } = store

  const onFinish = (values: ParamsDialogValue) => {
    // console.log('values:', values);
    const paramsValue: Params = {}
    if (values.frequency_penalty) {
      paramsValue.frequency_penalty = Number(values.frequency_penalty)
    }
    if (values.presence_penalty) {
      paramsValue.presence_penalty = Number(values.presence_penalty)
    }

    setParams(paramsValue)

    let paramsInfo = JSON.stringify({
      key: openApiKey,
      system: system,
      params: paramsValue
    })
    Taro.setStorageSync('paramsInfo', paramsInfo)
    setParamsDialogVisible(false)
  }

  const onOverlayClick = () => {
    setParamsDialogVisible(false)
  }

  const validator = (_ruleCfg: FormItemRuleWithoutValidator, value: string): string | boolean | Promise<string | boolean> => {
    if (!value) {
      return true
    }
    if (Number.isNaN(value)) {
      return Promise.reject('请输入数字')
    }
    if (Number(value) >= -2.0 && Number(value) <= 2.0) {
      return true
    } else {
      return Promise.reject('请输入介于 -2.0 和 2.0 之间的数字')
    }
  }

  //frequency_penalty number or null Defaults to 0 Number between -2.0 and 2.0
  //presence_penalty number or null Defaults to 0 Number between -2.0 and 2.0
  //stream boolean or null Defaults to false
  //temperature number or null Defaults to 1 介于 0 和 2 之间
  //top_k number or null Defaults to 1  这两个参数只能用一个
  return (
    <Dialog
      className='paramsDialog'
      visible={paramsDialogVisible}
      title='高级设置'
      onOverlayClick={onOverlayClick}
      hideConfirmButton
      hideCancelButton
      content={
        <Form
          name='paramsDialog'
          onFinish={onFinish}
          footer={
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Button
                formType='reset'
                style={{marginRight: '20px'}}
              >
                重置
              </Button>
              <Button
                formType='submit'
                type='primary'
              >
                提交
              </Button>
            </View>
          }
        >
          <Form.Item
            name='frequency_penalty'
            label='frequency'
            errorMessageAlign='left'
            rules={[
              {
                validator: validator
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='presence_penalty'
            label='presence'
            errorMessageAlign='left'
            rules={[
              {
                validator: validator
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      }
    />
  )
}

export default observer(ParamsDialog)
