import {HtmlRenderers, HtmlRenderer} from "react-pdf-html/dist/render";
import {HtmlElement} from "react-pdf-html/dist/parse";
import {HtmlStyle} from "react-pdf-html";
import {Image, Text, View} from "@react-pdf/renderer";
import {lowerAlpha, orderedAlpha, upperAlpha} from "react-pdf-html/dist/ordered.type";
import React from "react";

// eslint-disable-next-line react/display-name
const generateCustomLi = (bulletOverrides: any, contentOverrides: any):HtmlRenderer => (
    {element, stylesheets, style, children}
) => {
    const bulletStyles = stylesheets.map((stylesheet) => stylesheet.li_bullet);
    const contentStyles = stylesheets.map(
        (stylesheet) => ({
            ...stylesheet.li_content,
            flexBasis: 0
        })
    );

    const list: HtmlElement = element.closest('ol, ul') as HtmlElement;
    const ordered = list?.tag === 'ol' || element.parentNode.tag === 'ol';
    const listStyle =
        list?.style?.reduce(
            (combined, listStyle) => Object.assign(combined, listStyle),
            {} as HtmlStyle
        ) || {};
    const itemStyle = element.style.reduce(
        (combined, itemStyle) => Object.assign(combined, itemStyle),
        {} as HtmlStyle
    );
    const listStyleType =
        itemStyle.listStyleType ||
        itemStyle.listStyle ||
        listStyle.listStyleType ||
        listStyle.listStyle ||
        '';

    let bullet;
    if (listStyleType.includes('none')) {
        bullet = false;
    } else if (listStyleType.includes('url(')) {
        bullet = (
            <Image
                src={listStyleType.match(/\((.*?)\)/)[1].replace(/(['"])/g, '')}
            />
        );
    } else if (ordered) {
        if (lowerAlpha.includes(listStyleType)) {
            bullet = (
                <Text>{orderedAlpha[element.indexOfType].toLowerCase()}.</Text>
            );
        } else if (upperAlpha.includes(listStyleType)) {
            bullet = (
                <Text>{orderedAlpha[element.indexOfType].toUpperCase()}.</Text>
            );
        } else {
            bullet = <Text>{element.indexOfType + 1}.</Text>;
        }
    } else {
        // if (listStyleType.includes('square')) {
        //   bullet = <Text>■</Text>;
        // } else {
        bullet = <Text>•</Text>;
        // }
    }
    return (
        <View style={style}>
            {bullet && <View style={{...bulletStyles, ...bulletOverrides}}>{bullet}</View>}
            <View style={{...contentStyles, ...contentOverrides}}>{children}</View>
        </View>
    );
};

export const htmlRenderers = {
    // see https://github.com/diegomura/react-pdf/issues/2182
    li: generateCustomLi({paddingRight: 5}, {flexGrow: 1, flexBasis: 0})
};