import { theme } from "@/theme"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useState } from "react"
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import { ms } from "react-native-size-matters"


// image format
// const images = [
//     {
//         url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
//     },
//     {
//     }
// ]


export const AppImageViewer = ({ visible, setVisible, images }) => {
    let imageView = [];
    {
        images?.map(image => (
            imageView.push(
                {
                    url: image,
                }
            )
        ))
    }
    return (
        <View>
            <Modal
                visible={visible}
                transparent={true}
            >
                <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={setVisible}
                >
                    <FontAwesomeIcon
                        icon={faClose}
                        size={30}
                        color={theme.light.colors.white}
                    />
                </TouchableOpacity>
                <ImageViewer
                    imageUrls={imageView}
                    enableSwipeDown
                    onCancel={() => { }}
                // backgroundColor  = {theme.light.colors.primaryBg}
                />



            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    closeIcon: {
        borderRadius: 50,
        position: 'absolute',
        zIndex: 55,
        right: ms(30),
        top: ms(50)
    }
})