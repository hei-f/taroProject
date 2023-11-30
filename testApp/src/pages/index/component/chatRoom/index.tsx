import {View} from "@tarojs/components";
import UserContent from "src/component/userContent";
import {observer} from "mobx-react";
import GptContent from "src/component/gptContent";
import {store} from "src/store";
import GptContentLoading from "src/component/gptContent/loading";


const ChatRoom = (props: {
  id: string,
}) => {

  const {
    id,
  } = props

  const {
    conversationMap,
    loading
  } = store

  const conversationList = conversationMap[id] || []

  return (
    <View
      className='chatRoom'
      style={{
        padding: '0 5px'
      }}
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

            <View
              style={{
                paddingBottom: '0.5px',
              }}
            >
              {
                (loading && index === conversationList.length - 1) ? (
                  <GptContentLoading />
                ) : (
                  <GptContent>
                    {
                      item.response
                    }
                  </GptContent>
                )
              }
            </View>

          </View>
        ))
      }
    </View>
  )
}


export default observer(ChatRoom);
