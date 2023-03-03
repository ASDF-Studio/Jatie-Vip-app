import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextStyles, theme } from '@/theme';
import { NAVIGATION } from '@/constants';
import { useDispatch } from 'react-redux';
import { login } from '@/actions/UserActions';
import { strings } from '@/localization';
import { FontFamily } from '@/theme/Fonts';

export function CustomErrorView({ errors, ErrorScreen, number, setCode }) {
    const dispatch = useDispatch()
    if (errors.length === 0) {
        return null;
    }
    return (
        <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[TextStyles.error, { color: theme.light.colors.error }]}>
                {errors[0]?.message}{' '}
            </Text>
            {ErrorScreen == NAVIGATION.enterOtp &&

                <TouchableOpacity onPress={() => {
                    setCode('')
                    dispatch(login(number))
                }}>
                    <Text style={[TextStyles.error, { color: theme.light.colors.error, textDecorationLine: 'underline', fontFamily: FontFamily.BrandonGrotesque_medium }]}>
                        {strings.enterOtp.resend}
                    </Text>
                </TouchableOpacity>
            }

        </View>
    )
}

CustomErrorView.propTypes = {
    errors: PropTypes.array.isRequired,
};
