import {Cell, ConfigProvider, Image, Loading} from "@nutui/nutui-react-taro";
// @ts-ignore
import gptIcon from "src/assets/images/gptIcon.png";
import {View} from "@tarojs/components";

const GptContentLoading = () => {
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
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{
            marginRight: '10px'
          }}
        >
          <Image
            src={gptIcon}
            style={{
              width: '20px',
              height: '20px',
            }}
          />
        </View>

        <View
          className='gpt-content'
          style={{
            height: '20px',
            lineHeight: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <ConfigProvider theme={{
            nutuiLoadingTextSize: '17px',
            nutuiLoadingIconSize: '17px'
          }}
          >
            <Loading>
              加载中,马上就好...
            </Loading>
          </ConfigProvider>
        </View>
      </View>
    </Cell>
  )
}

export default GptContentLoading
