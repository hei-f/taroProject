import {CSSProperties} from "react";
// @ts-ignore
import {store} from "@/store";
import {observer} from "mobx-react";
import {Tabs, TabPane} from '@nutui/nutui-react-taro';
import {Plus, CircleClose} from '@nutui/icons-react-taro'
import {ScrollView, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import ChatRoom from "../chatRoom";
import './index.scss'

const HistoryConversation = () => {

  const {
    conversationTabs,
    setConversationTabs,
    activeTab,
    setActiveTab,
    deleteConversation,
    setId,
  } = store

  const windowInfo = Taro.getWindowInfo()

  const onTabsClick = (item: number) => {
    if (item !== conversationTabs.length) {
      setActiveTab(item)
      setId(conversationTabs[item].id)
    } else {
      setConversationTabs(
        [...conversationTabs,
          {
            title: `对话${conversationTabs.length + 1}`,
            id: `${conversationTabs.length + 1}`,
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
              title: '对话1',
              id: '1',
            },
          ])
          setActiveTab(0)
          deleteConversation()
        } else {
          deleteConversation(conversationTabs[index].id)
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
    <View
      className='historyConversation'
    >
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
                <ScrollView
                  scrollY
                  scrollWithAnimation
                  scrollTop={0}
                  style={{
                    height: `${windowInfo.windowHeight - 110}px`,
                    marginTop: '-25px',
                  }}
                  showScrollbar={false}
                  lowerThreshold={-20}
                  upperThreshold={0}
                  enhanced
                  clip={false}
                >
                  <ChatRoom
                    id={item.id}
                  />
                </ScrollView>
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
