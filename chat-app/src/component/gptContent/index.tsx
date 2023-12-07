import {Cell, Image} from "@nutui/nutui-react-taro";
// @ts-ignore
import gptIcon from "src/assets/images/gptIcon.png";
import React from "react";
import {View} from "@tarojs/components";
import './index.scss'


const GptContent = (props: {
  children?: any,
  loading?: boolean,
}) => {
  const {
    children,
  } = props

  const parseString = (input: string): React.JSX.Element[] => {
    const parts: React.JSX.Element[] = [];

    const codeRegex = /```([a-zA-Z]+)\r?\n([\s\S]*?)```/g;
    //```([a-zA-Z]+)  对应了```javascript
    //\r?\n  对应了换行符
    //([\s\S]*?) 对应了代码块内容

    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while ((match = codeRegex.exec(input)) !== null) {
      const languageIdentifier = match[1];//表示语言类型
      const codeBlock = match[2];

      const nonCodePart = input.substring(lastIndex, match.index);
      lastIndex = codeRegex.lastIndex;


      if (nonCodePart.length > 0) {
        parts.push(
          <View
            key={parts.length}
            style={{
              whiteSpace: 'pre-wrap',
              //white-space属性来处理换行
              //normal：
              // 连续的空白符会被合并。源码中的换行符会被当作空白符来处理。
              // 并根据填充行框盒子的需要来换行。

              //nowrap
              //和 normal 一样合并空白符，但阻止源码中的文本换行

              //pre
              //连续的空白符会被保留。仅在遇到换行符或 <br> 元素时才会换行

              // pre-wrap：
              // 连续的空白符会被保留。在遇到换行符、<br>元素，
              // 或者需要根据width属性进行换行时才会换行

              //pre-line：
              //连续的空白符会被合并。在遇到换行符或 <br> 元素时，或者根据填充行框盒子的需要换行。
            }}
          >
            {nonCodePart}
          </View>
        );
      }

      parts.push(
        <View
          key={parts.length}
          className='code'
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {`//${languageIdentifier} \n\n`}
          {codeBlock}
        </View>
      );
    }

    const remainingText = input.substring(lastIndex);

    if (remainingText.length > 0) {
      parts.push(
        <View
          key={parts.length}
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {
            remainingText
          }
        </View>
      );
    }

    return parts;
  };

  const parsedElements = parseString(children);

  return (
    <Cell
      style={{
        backgroundColor: '#F2F6F7',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{
            marginRight: '10px'
          }}
        >
          <Image
            src={gptIcon}
            style={{
              width: '20px',
              height: '20px',
            }}
          />
        </View>

        <View
          className='gpt-content'
        >
          {
            parsedElements.map((element, index) => {
              return (
                //使用<></>会报红 React.Fragment不会
                <React.Fragment
                  key={index}
                >
                  {
                    element
                  }
                </React.Fragment>
              )
            })
          }
        </View>
      </View>
    </Cell>
  )
}

export default GptContent
