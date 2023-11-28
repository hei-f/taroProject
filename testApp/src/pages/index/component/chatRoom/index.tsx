import {View} from "@tarojs/components";
import UserContent from "src/component/userContent";
import {observer} from "mobx-react";
import GptContent from "src/component/gptContent";
import {store} from "src/store";


const ChatRoom = (props: {
  id: string,
}) => {

  const {
    id,
  } = props

  const {
    conversationMap
  } = store

  const conversationList = conversationMap[id] || []

  return (
    <View>
      {
        conversationList && conversationList.map((item, index) => (
          <View
            key={index}
          >
            <UserContent>
              {
                item.prompt
              }
            </UserContent>
            <GptContent>
              {
                item.response
              }
            </GptContent>
          </View>
        ))
      }
    </View>
  )
}


export default observer(ChatRoom);
