import {View} from "@tarojs/components";
// @ts-ignore
import UserContent from "@/component/userContent";
// @ts-ignore
import GptContent from "@/component/gptContent";
import {observer} from "mobx-react";
import {store} from "../../../../store";


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
