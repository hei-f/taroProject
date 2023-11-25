import {useState} from "react";
import {Tabs, TabPane} from '@nutui/nutui-react-taro';
import {Plus, CircleClose} from '@nutui/icons-react-taro'
import {View} from "@tarojs/components";

const HistoryConversation = () => {
  const [activeTab, setActiveTab] = useState<any>('0')

  const [conversationList, setConversationList] = useState<any[]>([
    {title: '历史对话1', content: '历史对话1'},
    {title: '历史对话2', content: '历史对话2'},
    {title: '历史对话3', content: '历史对话3'},
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

  return (
    <View>
      <Tabs
        value={activeTab}
        align='left'
        onClick={(item) => {
          if (Number(item) !== conversationList.length) {
            setActiveTab(item)
          } else {
            setConversationList(
              [...conversationList,
                {title: `历史对话${conversationList.length + 1}`, content: `历史对话${conversationList.length + 1}`}
              ]
            )
          }
        }}
        autoHeight
        tabStyle={{
          backgroundColor: '#fff',
        }}
      >
        {
          conversationList.map((item, index) => (
              <TabPane
                key={`${index}-${item.title}`}
                // @ts-ignore
                title={
                  <View>
                    {item.title}
                    <CircleClose
                      name='circle-close'
                      color='#979797'
                      size='12px'
                      onClick={() => {
                        if (conversationList.length === 1) {
                          setConversationList([
                            {title: '历史对话1', content: '历史对话1'},
                          ])
                          setActiveTab('0')
                        } else {
                          setConversationList(
                            conversationList.filter((_, i) => i !== index)
                          )
                        }
                      }}
                    />
                  </View>
                }
              >
              </TabPane>
            )
          )
        }

        {
          addTab && (
            <TabPane
              key={`${conversationList.length}-${addTab.title}`}
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
