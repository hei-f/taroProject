import {observer} from "mobx-react";
import {View} from '@tarojs/components'
import Taro from "@tarojs/taro";
import HistoryConversation from "./component/historyConversation";
import Footer from "./component/footer";
import './index.scss'


const Index = () => {

  const windowInfo = Taro.getWindowInfo()
  return (
    <View
      className='container'
      style={{
        height: `${windowInfo.windowHeight}px`,
        'overflowY': 'hidden',
      }}
    >
      {/*历史对话*/}
      <HistoryConversation />

      {/*输入对话*/}
      <Footer />

    </View>
  )
};

export default observer(Index);
