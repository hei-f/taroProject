import {View} from "@tarojs/components";
import {Cell} from "@nutui/nutui-react-taro";


const UserContent = (props: {
  children?: any
}) => {
  const {children} = props

  return (
    <Cell>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          flexDirection: 'row-reverse',
          width: '100%',
        }}
      >
        <View>
          {children}
        </View>
      </View>
    </Cell>)
}

export default UserContent
