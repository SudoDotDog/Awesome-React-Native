/**
 * @author WMXPY
 * @namespace Loading
 * @description Loading
 */

import * as React from 'react';
import { Animated, View, ViewStyle } from 'react-native';

export type LoadingProps = {

    readonly style?: ViewStyle;
};

export type LoadingStates = {

    readonly widthAnim: Animated.Value;
    readonly rotateAnim: Animated.Value;
    readonly innerAnim: Animated.Value;
};

export default class LoadingView extends React.Component<LoadingProps, LoadingStates> {

    public readonly state: LoadingStates = {

        widthAnim: new Animated.Value(0),
        rotateAnim: new Animated.Value(0),
        innerAnim: new Animated.Value(0),
    };

    public constructor(props: LoadingProps) {

        super(props);

        this.startRotate = this.startRotate.bind(this);
        this.innerRotate = this.innerRotate.bind(this);
    }

    public componentDidMount() {

        this.startRotate();
        this.innerRotate();
        this.expandWidth();
    }

    public render() {
        return (

            <View style={{
                ...this.props.style,
                height: 150,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Animated.View
                    style={{
                        height: 100,
                        width: 100,
                        borderWidth: this.state.widthAnim,
                        borderColor: '#001F3F',
                        position: 'absolute',
                        top: 25,
                        left: 25,
                        transform: [{
                            rotate: this.state.rotateAnim.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg'],
                            }),
                        }],
                    }}
                >
                </Animated.View>
                <Animated.View
                    style={{
                        height: 100,
                        width: 100,
                        borderWidth: this.state.widthAnim,
                        borderColor: '#01FF70',
                        position: 'absolute',
                        top: 25,
                        left: 25,
                        transform: [{
                            rotate: this.state.innerAnim.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg'],
                            }),
                        }],
                    }}
                >
                </Animated.View>

            </View>
        );
    }

    private expandWidth() {

        Animated.timing(
            this.state.widthAnim,
            {
                toValue: 10,
                duration: 866,
            },
        ).start();
    }

    private startRotate() {
        this.state.rotateAnim.setValue(0);
        Animated.timing(
            this.state.rotateAnim,
            {
                toValue: 360,
                duration: 2500,
            },
        ).start(() => {
            this.startRotate();
        });
    }

    private innerRotate() {
        this.state.innerAnim.setValue(0);
        Animated.timing(
            this.state.innerAnim,
            {
                toValue: 360,
                duration: 2500,
            },
        ).start(() => {
            this.innerRotate();
        });
    }
}
