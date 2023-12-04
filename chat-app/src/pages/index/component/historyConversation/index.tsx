import {CSSProperties, useRef, useState} from "react";
import {observer} from "mobx-react";
import {Tabs, TabPane, Dialog} from '@nutui/nutui-react-taro';
import {Plus} from '@nutui/icons-react-taro'
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
    conversationMap,
    env
  } = store

  const longPressFlag = useRef<boolean>(false)
  const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false)
  const [deleteIndex, setDeleteIndex] = useState<number>(0)

  const onLongPress = (index: number) => {
    return (
      () => {
        setDeleteIndex(index)
        longPressFlag.current = true
        setDeleteDialogVisible(true)
      }
    )
  }


  const windowInfo = Taro.getWindowInfo()

  const onTabsClick = (item: number) => {
    if (longPressFlag.current) {
      longPressFlag.current = false
      return
    }
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

      if (index === activeTab && index !== 0) {
        console.log('index=', index)
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
      width: '70px',
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
                key={`${item.title}`}
                className='historyConversationTabPane'
                value={index}
                // @ts-ignore
                title={
                  <View
                    style={getStyle1(index)}
                    onLongPress={onLongPress(index)}
                    // onTouchStart={handleTouchStart}
                    // onTouchEnd={handleRelease(index)}
                    // onTouchCancel={handleRelease(index)}
                    // onTouchMove={() => {
                    //   touchMoveFlag.current = false
                    // }}

                  >
                    {item.title}
                    {/*{*/}
                    {/*  closeIconVisible[item.id] &&*/}
                    {/*  <CircleClose*/}
                    {/*    name='circle-close'*/}
                    {/*    color={index === activeTab ? '#89E5D2' : '#282C34'}*/}
                    {/*    size='12px'*/}
                    {/*    onClick={onTabClose(index)}*/}
                    {/*  />*/}
                    {/*}*/}
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
