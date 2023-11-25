import {View} from "@tarojs/components";
// @ts-ignore
import UserContent from "@/component/userContent";
// @ts-ignore
import GptContent from "@/component/gptContent";


const ChatRoom = (props: {
  conversationList: any[]
}) => {

  const {
    conversationList
  } = props

  return (
    <View
      style={{marginTop: '-25px',}}
    >
      {
        conversationList.map((item, index) => (
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


export default ChatRoom;
