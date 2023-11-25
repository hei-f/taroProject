import {useState} from 'react'
import {observer} from "mobx-react";
import {View} from '@tarojs/components'
// @ts-ignore
import GptContent from '@/component/gptContent';
// @ts-ignore
import UserContent from "@/component/userContent";
import HistoryConversation from "./component/historyConversation";
import Footer from "./component/footer";
import './index.scss'


type Conversation = {
  prompt: string
  response: string
}

const Index = () => {

  const [conversations, setConversations] = useState<Conversation[]>([])

  return (
    <View className='container'>
      {/*历史对话*/}
      <HistoryConversation />

      <View>
        <GptContent>
          123123
        </GptContent>
      </View>

      <View>
        <UserContent>
          123123
        </UserContent>
      </View>


      {/*对话内容*/}
      <View className='conversations'>
        {conversations.map((item, index) => (
          <View key={index}>
            <View>用户：{item.prompt}</View>
            <View>助手：{item.response}</View>
          </View>
        ))}
      </View>

      {/*输入对话*/}
      <Footer />

    </View>
  )
};

export default observer(Index);
