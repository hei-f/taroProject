import {observer} from "mobx-react";
import {View} from '@tarojs/components'
import HistoryConversation from "./component/historyConversation";
import Footer from "./component/footer";
import './index.scss'


const Index = () => {

  return (
    <View className='container'>
      {/*历史对话*/}
      <HistoryConversation />

      {/*输入对话*/}
      <Footer />

    </View>
  )
};

export default observer(Index);
