import {Button, Dialog, Form, Input,} from "@nutui/nutui-react-taro";
// @ts-ignore
import {store} from "@/store";
import {View} from "@tarojs/components";

const ParamsDialog = (props: {
  paramsDialogVisible: boolean,
  setParamsDialogVisible: (paramsDialogVisible: boolean) => void,
}) => {
  const {
    paramsDialogVisible,
    setParamsDialogVisible,
  } = props

  const {
    setParams
  } = store

  const onFinish = (values: any) => {
    console.log('values:', values);
    setParams(values)
    setParamsDialogVisible(false)
  }

  const onOverlayClick = () => {
    setParamsDialogVisible(false)
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
                validator: (_ruleCfg, value: string): string | boolean | Promise<string | boolean> => {
                  if (Number.isNaN(value)) {
                    return Promise.reject('请输入数字')
                  }
                  if (Number(value) >= -2.0 && Number(value) <= 2.0) {
                    return true
                  } else {
                    return Promise.reject('请输入介于 -2.0 和 2.0 之间的数字')
                  }
                }
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
                validator: (_ruleCfg, value: string): string | boolean | Promise<string | boolean> => {
                  if (Number.isNaN(value)) {
                    return Promise.reject('请输入数字')
                  }
                  if (Number(value) >= -2.0 && Number(value) <= 2.0) {
                    return true
                  } else {
                    return Promise.reject('请输入介于 -2.0 和 2.0 之间的数字')
                  }
                }
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

export default ParamsDialog
