import React from 'react';
import {
    View,
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import { theme } from '@/theme';
import { ms, vs } from 'react-native-size-matters';

export function Loader({ visible, size, style }) {
    return (
        <ActivityIndicator
            style={style}
            animating={visible}
            size={size}
            color={theme.light.colors.primary}
        />

    );
}

Loader.prototype = {
    visible: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.light.colors.transparentGrey,
        justifyContent: "center"
    },
    body: {
        width: '90%',
        backgroundColor: theme.light.colors.white,
        top: '25%',
        alignItems: 'center',
        padding: ms(10),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.light.colors.primaryBg,

        //IOS
        shadowOffset: { width: -2, height: 4 },
        shadowColor: theme.light.colors.secondary,
        shadowOpacity: 0.2,
        shadowRadius: 3,

        //android
        elevation: 5,
    },
    loader: {
        // alignSelf: "center"
    }
    , iconContainer: {
        backgroundColor: theme.light.colors.primaryBgLight,
        borderRadius: 100,
        position: 'absolute',
        bottom: vs(18),
        right: ms(10),
        padding: ms(10),
    },
});
