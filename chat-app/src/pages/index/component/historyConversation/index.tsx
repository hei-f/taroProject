import {CSSProperties, useEffect} from "react";
import {observer} from "mobx-react";
import {Tabs, TabPane} from '@nutui/nutui-react-taro';
import {Plus, CircleClose} from '@nutui/icons-react-taro'
import {ScrollView, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import {store} from "src/store";
import ChatRoom from "src/pages/index/component/chatRoom";
import './index.scss'


const HistoryConversation = () => {

  const {
    conversationTabs,
    setConversationTabs,
    activeTab,
    setActiveTab,
    deleteConversation,
    closeIconVisible,
    setCloseIconVisible,
    clearCloseIconVisible,
    conversationMap,
    env
  } = store

  let timeoutId: string | number | NodeJS.Timeout | undefined;

  const handleTouchStart = (id: string) => {
    return (
      () => {
        timeoutId = setTimeout(() => {
          clearCloseIconVisible()
          setCloseIconVisible(id, true)
        }, 500)
      }
    )
  }

  const handleRelease = () => {
    return (
      () => {
        clearTimeout(timeoutId)
      }
    )
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId)
    }
  }, [timeoutId]);


  const windowInfo = Taro.getWindowInfo()

  const onTabsClick = (item: number) => {
    if (item === conversationTabs.length) {
      const id = Number(conversationTabs[conversationTabs.length - 1].id) + 1
      setConversationTabs(
        [...conversationTabs,
          {
            title: `对话${id}`,
            id: `${id}`,
          }
        ]
      )
    }
    setActiveTab(item)
  }

  const onTabClose = (index: number) => {
    return (
      (event: MouseEvent) => {
        event.stopPropagation() //阻止冒泡，不然会切换activeTab

        if (conversationTabs.length === 1) {
          setConversationTabs([
            {
              title: '对话1',
              id: '1',
            },
          ])
          setActiveTab(0)
          deleteConversation()
          clearCloseIconVisible()
        } else {

          deleteConversation(conversationTabs[index].id)
          setCloseIconVisible(conversationTabs[index].id, false)

          setConversationTabs(
            conversationTabs.filter((_, i) => i !== index)
          )

          if (index === activeTab && index !== 0) {
            setActiveTab(index - 1)
          }
        }

        const conversationInfo = JSON.stringify({
          conversationMap: conversationMap,
          conversationTabs: conversationTabs
        })

        Taro.setStorage({
          key: 'conversationInfo',
          data: conversationInfo
        })

      }
    )
  }

  const getStyle1 = (index: number): CSSProperties => {
    return ({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      border: `${index === activeTab ? '#89E5D2' : '#282C34'} solid 1px`,
      height: "40px",
      borderRadius: '10px',
      backgroundColor: index === activeTab ? '#282C34' : '#89E5D2',
      fontWeight: "550",
      color: index === activeTab ? '#89E5D2' : '#282C34',
      width: '70px',
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
                    onTouchStart={
                      handleTouchStart(item.id)
                    }
                    onTouchEnd={
                      handleRelease()
                    }
                    onTouchCancel={
                      handleRelease()
                    }
                  >
                    {item.title}
                    {
                      closeIconVisible[item.id] &&
                      <CircleClose
                        name='circle-close'
                        color={index === activeTab ? '#89E5D2' : '#282C34'}
                        size='12px'
                        onClick={onTabClose(index)}
                      />
                    }
                  </View>
                }
              >
                <ScrollView
                  scrollY
                  scrollWithAnimation
                  scrollTop={0}
                  style={{
                    height: `${windowInfo.windowHeight - (env === 'WEB' ? 100 : 95)}px`,
                    backgroundColor: '#FFF3BC',
                    borderRadius: '10px',
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
