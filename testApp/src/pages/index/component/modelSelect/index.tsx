import {Cell, Picker} from "@nutui/nutui-react-taro";
import {View} from "@tarojs/components";

const ModelSelect = (props: {
  model: string | number
  setModel: (model: string | number) => void
  modelPickerVisible: boolean
  setModelPickerVisible: (visible: boolean) => void
  models: { value: string | number, text: string }[][]
}) => {
  const {
    model,
    setModel,
    modelPickerVisible,
    setModelPickerVisible,
    models
  } = props
  return (
    <View>
      <Cell
        title='请选择模型'
        description={model}
        onClick={() => {
          setModelPickerVisible(!modelPickerVisible)
        }}
      />
      <Picker
        visible={modelPickerVisible}
        options={models}
        defaultValue={[model]}
        onConfirm={(_list, values) => {
          setModel(values[0])
        }}
        onClose={() => setModelPickerVisible(false)}
      />
    </View>
  )
}

export default ModelSelect
