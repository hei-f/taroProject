import {Cell, Image} from "@nutui/nutui-react-taro";
// @ts-ignore
import gptIcon from "src/assets/images/gptIcon.png";
import React from "react";
import {View, Text} from "@tarojs/components";
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
          >
            {/*如果是直接在View里传字符串，换行会被吃掉*/}
            {/*只有在Text里才会保留换行*/}
            <Text>
              {nonCodePart}
            </Text>
          </View>
        );
      }

      parts.push(
        <View key={parts.length} className='code'>
          <View style={{
            textAlign: 'start'
          }}
          >
            <Text>
              {`//${languageIdentifier}`}
            </Text>
          </View>

          <Text>
            {codeBlock}
          </Text>
        </View>
      );
    }

    const remainingText = input.substring(lastIndex);

    if (remainingText.length > 0) {
      parts.push(
        <View
          key={parts.length}
        >
          <Text>
            {remainingText}
          </Text>
        </View>);
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
