import {CSSProperties, useState} from "react";
// @ts-ignore
import {store} from "@/store";
import {observer} from "mobx-react";
import {Tabs, TabPane} from '@nutui/nutui-react-taro';
import {Plus, CircleClose} from '@nutui/icons-react-taro'
import {View} from "@tarojs/components";
import ChatRoom from "../chatRoom";
import './index.scss'

const HistoryConversation = () => {

  const [activeTab, setActiveTab] = useState(0)
  const [conversationTabs, setConversationTabs] = useState<any[]>([
    {
      title: '历史对话1',
      id: '1',
    },
  ])

  const onTabsClick = (item: number) => {
    if (item !== conversationTabs.length) {
      setActiveTab(item)
    } else {
      setConversationTabs(
        [...conversationTabs,
          {
            title: `历史对话${conversationTabs.length + 1}`,
            id: '',
          }
        ]
      )
    }
  }

  const onTabClose = (index: number) => {
    return (
      () => {
        if (conversationTabs.length === 1) {
          setConversationTabs([
            {
              title: '历史对话1',
              id: '',
            },
          ])
          setActiveTab(0)

        } else {
          setConversationTabs(
            conversationTabs.filter((_, i) => i !== index)
          )
        }
      }
    )
  }

  const getStyle1 = (index: number): CSSProperties => {
    return ({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: `${index == activeTab ? '#89E5D2' : '#282C34'} solid 1px`,
      height: "40px",
      borderRadius: '10px',
      backgroundColor: index == activeTab ? '#282C34' : '#89E5D2',
      fontWeight: "550",
      color: index == activeTab ? '#89E5D2' : '#282C34',
    })
  }

  return (
    <View>
      <Tabs
        className='historyConversationTabs'
        value={activeTab}
        align='left'
        onClick={onTabsClick}
        autoHeight
      >
        {
          conversationTabs.map((item, index) => (
              <TabPane
                key={`${item.title}`}
                className='historyConversationTabPane'
                value={index}
                // @ts-ignore
                title={
                  <View
                    style={getStyle1(index)}
                  >
                    {item.title}
                    <CircleClose
                      name='circle-close'
                      color={index === activeTab ? '#89E5D2' : '#282C34'}
                      size='12px'
                      onClick={onTabClose(index)}
                    />
                  </View>
                }
              >
                <ChatRoom
                  id={item.id}
                />
              </TabPane>
            )
          )
        }

        {
          <TabPane
            key={`${conversationTabs.length}-新增}`}
            // @ts-ignore
            title={
              <View
                className='addHistoryConversation'
              >
                <Plus
                  name='plus'
                  color='#282C34'
                />
              </View>
            }
          >
          </TabPane>
        }
      </Tabs>
    </View>
  )
}

export default observer(HistoryConversation);
