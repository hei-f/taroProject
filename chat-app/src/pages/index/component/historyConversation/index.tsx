import {CSSProperties, useMemo, useState} from "react";
import {observer} from "mobx-react";
import {Tabs, TabPane, Dialog} from '@nutui/nutui-react-taro';
import {Plus} from '@nutui/icons-react-taro'
import {CommonEvent, ScrollView, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import {store} from "src/store";
import {getUUID} from "src/utils";
import ChatRoom from "src/pages/index/component/chatRoom";
import './index.scss'


const HistoryConversation = () => {

  const {
    conversationTabs,
    setConversationTabs,
    activeTab,
    setActiveTab,
    deleteConversation,
    conversationMap,
    env
  } = store

  const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false)
  const [deleteIndex, setDeleteIndex] = useState<number>(0)


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

  const onLongPress = (index: number) => {
    return (
      (event: CommonEvent) => {
        event.stopPropagation()
        setDeleteIndex(index)
        setDeleteDialogVisible(true)
      }
    )
  }

  const onTabsClick = (item: number) => {

    if (item === conversationTabs.length) {
      // console.log('conversationTabs=', conversationTabs)
      const id = getUUID()
      const idx = conversationTabs[conversationTabs.length - 1].index + 1

      setConversationTabs(
        [...conversationTabs,
          {
            title: `对话${idx}`,
            id: `${id}`,
            index: idx
          }
        ]
      )
    }
    setActiveTab(item)
  }

  const onTabClose = (index: number) => {

    if (conversationTabs.length === 1) {
      const id = getUUID()
      setConversationTabs([
        {
          title: '对话1',
          id: id,
          index: 1
        },
      ])
      setActiveTab(0)
      deleteConversation(undefined, id)
    } else {
      deleteConversation(conversationTabs[index].id)
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
      <Dialog
        title='提示'
        content='确定要删除该对话吗？'
        visible={deleteDialogVisible}
        onCancel={() => {
          setDeleteDialogVisible(false)
        }}
        onConfirm={() => {
          console.log('deleteIndex=', deleteIndex)
          onTabClose(deleteIndex)
          setDeleteDialogVisible(false)
        }}
        closeOnOverlayClick={false}
      />
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
                key={`${item.id}`}
                className='historyConversationTabPane'
                value={index}
                // @ts-ignore
                title={
                  <View
                    style={getStyle1(index)}
                    onLongPress={onLongPress(index)}
                  >
                    {item.title}
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
            <View
              style={{
                height: scrollViewHeight,
                backgroundColor: '#FFF3BC',
                borderRadius: '10px',
              }}
            >
            </View>
          </TabPane>
        }
      </Tabs>
    </View>
  )
}

export default observer(HistoryConversation);
