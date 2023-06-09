import React from 'react';
import { View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { theme } from '@/theme';

export const Divider = () => (
    <View
        style={{
            height: 2,
            backgroundColor: theme.light.colors.textFieldBorderColor,
            width: '100%',
            marginBottom: ms(10),
            marginTop: ms(10),
        }}
    />
);
