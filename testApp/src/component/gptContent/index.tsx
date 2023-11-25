import {Cell, Image} from "@nutui/nutui-react-taro";
// @ts-ignore
import gptIcon from "@/assets/images/gptIcon.png";
import {View} from "@tarojs/components";

const GptContent = (props: {
  children?: any
}) => {
  const {children} = props
  return (
    <Cell
      style={{
        backgroundColor: '#F2F6F7',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
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
