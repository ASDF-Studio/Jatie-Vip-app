import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { strings } from "@/localization"
import { theme } from "@/theme"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { ms } from "react-native-size-matters"
import { FontFamily } from "@/theme/Fonts"


export const CommentContainer = ({ seeAllPress, children }) => {
    return (
        <View style={styles.container}>
            {/* comment body */}
            {children}
            <TouchableOpacity
                style={styles.seeAllcontainer}
                onPress={seeAllPress}
            >
                <FontAwesomeIcon
                    icon={faChevronDown}
                    color={theme.light.colors.info}
                />
                <Text style={styles.seeAllTxt}>{strings.home.seeAllComments} </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    seeAllcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: ms(10)
    },
    seeAllTxt: {
        fontFamily: FontFamily.Recoleta_semibold,
        fontSize: ms(13, 0.3),
        color: theme.light.colors.info,
        paddingLeft: ms(5)
    }
})