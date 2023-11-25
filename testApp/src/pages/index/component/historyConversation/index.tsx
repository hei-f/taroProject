import {useState} from "react";
import {Tabs, TabPane} from '@nutui/nutui-react-taro';
import {Plus, CircleClose} from '@nutui/icons-react-taro'
import {View} from "@tarojs/components";
import ChatRoom from "../chatRoom";

const HistoryConversation = () => {
  const [activeTab, setActiveTab] = useState<any>('0')

  const [historyConversationList, setHistoryConversationList] = useState<any[]>([
    {
      title: '历史对话1',
    },
    {
      title: '历史对话2',
    },
    {
      title: '历史对话3',
    },
  ])

  const addTab = {
    title: <Plus
      name='plus'
      color='#979797'
      style={{
        marginTop: '11px',
      }}
    />,
    content: '新增对话'
  }

  const onTabsClick = (item: string | number) => {
    if (Number(item) !== historyConversationList.length) {
      setActiveTab(item)
    } else {
      setHistoryConversationList(
        [...historyConversationList,
          {
            title: `历史对话${historyConversationList.length + 1}`,
          }
        ]
      )
    }
  }

  const onTabClose = (index: number) => {
    return (
      () => {
        if (historyConversationList.length === 1) {
          setHistoryConversationList([
            {
              title: '历史对话1',
            },
          ])
          setActiveTab('0')
        } else {
          setHistoryConversationList(
            historyConversationList.filter((_, i) => i !== index)
          )
        }
      }
    )
  }

  return (
    <View>
      <Tabs
        value={activeTab}
        align='left'
        onClick={onTabsClick}
        autoHeight
        tabStyle={{backgroundColor: '#fff'}}
      >
        {
          historyConversationList.map((item, index) => (
              <TabPane
                key={`${item.title}`}
                // @ts-ignore
                title={
                  <View>
                    {item.title}
                    <CircleClose
                      name='circle-close'
                      color='#979797'
                      size='12px'
                      onClick={onTabClose(index)}
                    />
                  </View>
                }
              >
                <ChatRoom conversationList={[{
                  prompt: '123',
                  response: '123',
                }, {
                  prompt: '123',
                  response: '123',
                }]}
                />
              </TabPane>
            )
          )
        }

        {
          addTab && (
            <TabPane
              key={`${setHistoryConversationList.length}-${addTab.title}`}
              // @ts-ignore
              title={addTab.title}
            >
            </TabPane>
          )
        }
      </Tabs>
    </View>
  )
}

export default HistoryConversation;
