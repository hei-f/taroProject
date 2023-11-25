import {Dialog, Form, Input,} from "@nutui/nutui-react-taro";

const ParamsDialog = (props: {
  paramsDialogVisible: boolean,
}) => {
  const {
    paramsDialogVisible,
  } = props

  const formRef = Form.useForm()

  const onParamsDialogConfirm = () => {

  }

  const onParamsDialogCancel = () => {

  }

  return (
    <Dialog
      className='paramsDialog'
      visible={paramsDialogVisible}
      title='高级设置'
      content={
        <Form
          form={formRef}
        >
          <Form.Item>
            <Input />
          </Form.Item>
        </Form>
      }
      onConfirm={onParamsDialogConfirm}
      onCancel={onParamsDialogCancel}
    />
  )
}

export default ParamsDialog
