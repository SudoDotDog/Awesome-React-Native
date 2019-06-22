/**
 * @author WMXPY
 * @namespace Loading
 * @description Loading
 */

import * as React from 'react';
import { Animated, View, ViewStyle } from 'react-native';

export type LoadingProps = {

    readonly duration?: number;
    readonly loading?: boolean;
    readonly size?: number;
    readonly style?: ViewStyle;
};

export type LoadingStates = {

    readonly widthAnim: Animated.Value;
    readonly rotateAnim: Animated.Value;
    readonly innerAnim: Animated.Value;
};

export class LoadingView extends React.Component<LoadingProps, LoadingStates> {

    public readonly state: LoadingStates = {

        widthAnim: new Animated.Value(0),
        rotateAnim: new Animated.Value(0),
        innerAnim: new Animated.Value(0),
    };

    public constructor(props: LoadingProps) {

        super(props);

        this._expandWidth = this._expandWidth.bind(this);
        this._startRotate = this._startRotate.bind(this);
        this._innerRotate = this._innerRotate.bind(this);
    }

    public componentDidMount() {

        this._expandWidth();
        this._startRotate();
        this._innerRotate();
    }

    public render() {

        const boxSize: number = this._getOuterSize();
        return (<View style={{
            ...this.props.style,
            height: boxSize,
            width: boxSize,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {this._renderSquare('#001F3F', this.state.widthAnim, this.state.rotateAnim)}
            {this._renderSquare('#01FF70', this.state.widthAnim, this.state.innerAnim)}
        </View>);
    }

    private _renderSquare(color: string, width: Animated.Value, rotate: Animated.Value): React.ReactNode {

        const size: number = this._getSize();
        const position: number = this._getPosition();
        return (<Animated.View
            style={{
                height: size,
                width: size,
                borderWidth: width,
                borderColor: color,
                position: 'absolute',
                top: position,
                left: position,
                transform: [{
                    rotate: rotate.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg'],
                    }),
                }],
            }}
        />);
    }

    private _expandWidth(): void {

        Animated.timing(
            this.state.widthAnim,
            {
                toValue: 10,
                duration: Math.floor(this._getDuration() / 2.5),
            },
        ).start();
    }

    private _startRotate(): void {

        this.state.rotateAnim.setValue(0);
        if (!this.props.loading) return;
        Animated.timing(
            this.state.rotateAnim,
            {
                toValue: 360,
                duration: Math.floor(this._getDuration()),
            },
        ).start(() => this._startRotate());
    }

    private _innerRotate(): void {

        this.state.innerAnim.setValue(0);
        if (!this.props.loading) return;
        Animated.timing(
            this.state.innerAnim,
            {
                toValue: 360,
                duration: Math.floor(this._getDuration() / 2),
            },
        ).start(() => this._innerRotate());
    }

    private _getDuration(): number {

        return this.props.duration || 2500;
    }

    private _getSize(): number {

        return this.props.size ? Math.floor(this.props.size) : 100;
    }

    private _getPosition(): number {

        return Math.floor(this._getSize() / 4);
    }

    private _getOuterSize(): number {

        return Math.ceil(this._getSize() * 1.5);
    }
}
