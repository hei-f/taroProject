import {Cell, Image} from "@nutui/nutui-react-taro";
// @ts-ignore
import gptIcon from "@/assets/images/gptIcon.png";
import {View} from "@tarojs/components";

const GptContent = (props: {
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
        }}
      >

        <Image
          src={gptIcon}
          style={{
            width: '20px',
            height: '20px',
            marginRight: '10px'
          }}
        />
        <View>
          {children}
        </View>
      </View>
    </Cell>
  )
}

export default GptContent
