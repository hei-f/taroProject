import {CSSProperties, useState} from "react";
import {Tabs, TabPane} from '@nutui/nutui-react-taro';
import {Plus, CircleClose} from '@nutui/icons-react-taro'
import {View} from "@tarojs/components";
import ChatRoom from "../chatRoom";
import './index.scss'

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
          historyConversationList.map((item, index) => (
              <TabPane
                key={`${item.title}`}
                className='historyConversationTabPane'
                // @ts-ignore
                title={
                  <View
                    style={getStyle1(index)}
                  >
                    {item.title}
                    <CircleClose
                      name='circle-close'
                      color={index == activeTab ? '#89E5D2' : '#282C34'}
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
          <TabPane
            key={`${setHistoryConversationList.length}-新增}`}
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

export default HistoryConversation;
