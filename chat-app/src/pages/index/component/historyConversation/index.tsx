import {CSSProperties, useEffect, useRef, useState} from "react";
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

  const [lastTime, setLastTime] = useState<number>(0)
  const timeId = useRef<NodeJS.Timeout>()

  ////web端模拟移动设备的时候mouseDown和mouseUp不会触发，pc端才会；
  // 所以同时设置了onLongPress(onTouchStart、onTouchEnd)和onMouseDown、onMouseUp
  const handleTouchStart = (id: string) => {
    //长按在start中触发
    return (
      () => {
        setLastTime(new Date().getTime())
        timeId.current = setTimeout(() => {
          clearCloseIconVisible()
          setCloseIconVisible(id, true)
        }, 400)
      }
    )
  }

  const handleRelease = (index: number) => {
    //短按在end中触发
    return (
      () => {
        clearTimeout(timeId.current)
        if (new Date().getTime() - lastTime < 400) {
          onTabsClick(index)
        }
      }
    )
  }

  useEffect(() => {
    return (
      () => {
        clearTimeout(timeId.current)
      }
    )
  }, []);

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
                    onTouchStart={handleTouchStart(item.id)}
                    onTouchEnd={handleRelease(index)}
                    onTouchCancel={handleRelease(index)}
                    //@ts-ignore
                    onMouseDown={handleTouchStart(item.id)}
                    onMouseUp={handleRelease(index)}
                    onClick={(e) => {
                      //如果不阻止冒泡，那么View的长按会触发Tabs的点击事件
                      e.stopPropagation()
                    }}
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
                    height: `${windowInfo.windowHeight - (env === 'WEB' ? 145 : 95)}px`,
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
