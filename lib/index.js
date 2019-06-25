import React from 'react';
import {Dimensions, View} from 'react-native';

function Grid({gridNum = 6, gutterInside = 12, gutterOutSide = 16}) {

    const Wrap = ({children, style, ...otherProps}) => {
        return (
            <View
                style={[{
                    marginLeft: gutterOutSide,
                    marginRight: gutterOutSide
                }, style
                ]}
                {...otherProps}
            >
                {children}
            </View>
        )
    };

    const Row = ({children, style, ...otherProps}) => {

        const marginValue = gutterOutSide - gutterInside / 2;
        return (
            <View
                style={[{
                    marginLeft: marginValue,
                    marginRight: marginValue,
                    flexWrap: "wrap",
                    flexDirection: "row"
                }, style]}
                {...otherProps}
            >
                {children}
            </View>
        )
    };

    const Col = ({children, span = 1, style, offset = 0, widthToInt = false, ...otherProps}) => {

        const getValueByNum = (num) => {
            const widthPercent = num / gridNum;

            if (widthToInt) {
                const screenWidth = Dimensions.get("window").width;
                const rowWidth = screenWidth - gutterOutSide * 2 + gutterInside;
                return widthPercent * rowWidth;
            }

            return widthPercent * 100 + '%';
        };

        const paddingValue = gutterInside / 2;
        const styleObject = {
            paddingLeft: paddingValue,
            paddingRight: paddingValue
        };

        // 设置宽度
        if (span > 0 && span < gridNum + 1) {
            styleObject.width = getValueByNum(span);
        }

        //设置偏移量
        if (offset > 0 && offset < gridNum - 1) {
            styleObject.marginLeft = getValueByNum(offset);
        }

        return (
            <View
                style={[styleObject, style]}
                {...otherProps}
            >
                {children}
            </View>
        )
    };
    return {Wrap, Row, Col};
}

export default Grid;
