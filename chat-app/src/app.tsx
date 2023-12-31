import {Component, PropsWithChildren} from 'react'
import {observer} from "mobx-react";
import Taro from "@tarojs/taro";
import {store} from "src/store";

// import './app.scss'


class App extends Component <PropsWithChildren> {

  componentDidMount() {
    // if (Taro.cloud) {
    //   Taro.cloud.init({
    //     env: 'ai-test-6gtvaxga12cecc0e'
    //   })
    // }


    //要存在storage中的数据   id根据activeTab判断，不存储
    //key、system 、 conversationMap、conversationTabs、params
    //key、system、params 参数相关数据在设置之后存储
    //conversationMap、conversationTabs 对话相关数据在对话后存储
    const conversationStr = Taro.getStorageSync('conversationInfo')
    const paramsStr = Taro.getStorageSync('paramsInfo')
    const envType = Taro.getEnv()

    const {
      setOpenApiKey,
      setSystem,
      setConversationMap,
      setConversationTabs,
      setParams,
      setEnv
    } = store
    setEnv(envType)

    if (conversationStr) {

      const value = JSON.parse(conversationStr)
      if (value.conversationMap) {
        setConversationMap(value.conversationMap)
      }
      if (value.conversationTabs) {
        // console.log(4)
        setConversationTabs(value.conversationTabs)
      }
    }

    if (paramsStr) {
      const value = JSON.parse(paramsStr)
      if (value.key) {
        // console.log(5)
        setOpenApiKey(value.key)
      }
      if (value.system) {
        setSystem(value.system)
      }
      if (value.params) {
        setParams(value.params)
      }
    }
  }

  // onSaveExitState() {
  // }

  // onUnload() {
  // }

  // componentDidShow() {
  // }

  // componentDidHide() {
  // }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default observer(App)
