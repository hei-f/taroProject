import {CSSProperties, useMemo, useRef} from "react";
import {observer} from "mobx-react";
import {Tabs, TabPane} from '@nutui/nutui-react-taro';
import {CircleClose, Plus} from '@nutui/icons-react-taro'
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

  const longPressFlag = useRef<boolean>(false)

  const windowInfo = Taro.getWindowInfo()

  //缓存最大tab数量
  const maxTabNum = useMemo(() => {
    return (Math.floor(windowInfo.windowWidth / 88))
  }, [windowInfo.windowWidth])
  //缓存是否显示新增tab
  const showAddTab = useMemo(() => {
    return (conversationTabs.length < maxTabNum)
  }, [conversationTabs.length, maxTabNum])

  //缓存scrollView高度
  const scrollViewHeight = useMemo(() => {
    return (`${windowInfo.windowHeight - (env === 'WEB' ? 145 : 95)}px`)
  }, [env, windowInfo.windowHeight])

  const onLongPress = (id: string) => {
    return (
      () => {
        longPressFlag.current = true
        setCloseIconVisible(id)
      }
    )
  }

  //TODO: 使用uuid代替数字id
  const onTabsClick = (item: number) => {
    if (longPressFlag.current) {//长按时不触发onClick
      longPressFlag.current = false
      return
    }
    if (item === conversationTabs.length) {
      // console.log('conversationTabs=', conversationTabs)
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
          clearCloseIconVisible()

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
      width: '67px',
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
                    onLongPress={onLongPress(item.id)}
                  >
                    {item.title}
                    <CircleClose
                      name='circle-close'
                      color={index === activeTab ? '#89E5D2' : '#282C34'}
                      size='12px'
                      onClick={onTabClose(index)}
                      style={{
                        display: closeIconVisible[item.id] ? 'block' : 'none',
                      }}
                    />
                  </View>
                }
              >
                <ScrollView
                  scrollY
                  scrollWithAnimation
                  scrollTop={0}
                  style={{
                    height: scrollViewHeight,
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
          showAddTab &&
          <TabPane
            key='新增'
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
