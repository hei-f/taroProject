import {observer} from "mobx-react";
import {View} from '@tarojs/components'
import Taro from "@tarojs/taro";
import {useEffect} from "react";
import {store} from "src/store";
import Footer from "src/pages/index/component/footer";
import HistoryConversation from "src/pages/index/component/historyConversation";
// import './index.scss'


const Index = () => {

  const windowInfo = Taro.getWindowInfo()

  useEffect(() => {

    return (() => {
      console.log(8)
      const {
        conversationMap,
        conversationTabs
      } = store

      const conversationInfo = JSON.stringify({
        conversationMap: conversationMap,
        conversationTabs: conversationTabs
      })

      Taro.setStorageSync('conversationInfo', conversationInfo)
    })
  }, []);

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
