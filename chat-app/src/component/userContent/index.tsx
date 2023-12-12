import {View, Text} from "@tarojs/components";
import {Cell} from "@nutui/nutui-react-taro";
import {memo} from "react";
import './index.scss'


const UserContent = memo((props: {
  children?: any
}) => {
  const {children} = props

  return (
    <Cell
      className='user-content-cell'
    >
      <View
        className='user-content-view'
      >
        <Text
          className='user-content'
          selectable
        >
          {children}
        </Text>
      </View>
    </Cell>)
})

export default UserContent
