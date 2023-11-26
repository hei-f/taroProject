import {View} from "@tarojs/components";
// @ts-ignore
import UserContent from "@/component/userContent";
// @ts-ignore
import GptContent from "@/component/gptContent";
// @ts-ignore
import {store} from "@/store";
import {observer} from "mobx-react";


const ChatRoom = (props: {
  id: string,
}) => {

  const {
    id
  } = props

  const {
    conversationMap
  } = store

  const conversationList = conversationMap[id] || []

  return (
    <View
      style={{marginTop: '-25px',}}
    >
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
