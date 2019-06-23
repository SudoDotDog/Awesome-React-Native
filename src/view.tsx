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
    readonly style?: ViewStyle;
} & LoadingProps;

export class LoadingView extends React.Component<LoadingViewProps> {

    public render() {

        return (<View style={this._getViewStyle()}>
            <Loading />
        </View>);
    }

    public _getViewStyle(): ViewStyle {

        return {
            width: this.props.width,
            height: this.props.height,
            justifyContent: 'center',
            alignItems: 'center',
            ...this.props.style,
        };
    }
}
