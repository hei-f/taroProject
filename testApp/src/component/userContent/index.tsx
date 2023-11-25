import {View} from "@tarojs/components";
import {Cell} from "@nutui/nutui-react-taro";


const UserContent = (props: {
  children?: any
}) => {
  const {children} = props

  return (
    <Cell
      style={{
        backgroundColor: '#282C34',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          flexDirection: 'row-reverse',
          width: '100%',
          color: '#E5C17C',
        }}
      >
        {children}
      </View>
    </Cell>)
}

export default UserContent
