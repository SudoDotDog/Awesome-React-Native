/**
 * @author WMXPY
 * @namespace Loading
 * @description Loading
 */

import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { Loading, LoadingProps } from './loading';

export type LoadingViewProps = {

    readonly width?: number;
    readonly height?: number;
    readonly flex?: number;
    readonly loadingStyle?: ViewStyle;
    readonly style?: ViewStyle;
} & LoadingProps;

export class LoadingView extends React.Component<LoadingViewProps> {

    public render() {

        return (<View style={this._getViewStyle()}>
            <Loading
                duration={this.props.duration}
                loading={this.props.loading}
                innerColor={this.props.innerColor}
                outerColor={this.props.outerColor}
                size={this.props.size}
                style={this.props.loadingStyle}
            />
            {this.props.children}
        </View>);
    }

    public _getViewStyle(): ViewStyle {

        return {
            width: this.props.width,
            height: this.props.height,
            flex: this.props.flex,
            justifyContent: 'center',
            alignItems: 'center',
            ...this.props.style,
        };
    }
}
