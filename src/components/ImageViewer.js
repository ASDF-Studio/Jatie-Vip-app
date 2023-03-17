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
//         url : 'data:image/jpeg;base64,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'
//     }
// ]


export const AppImageViewer = ({ visible, setVisible, images }) => {
    // const [imageUrl, setImageUrl] = useState([]);
    // {
    //     images?.map(image => (
    //         setImageUrl("url : " + image)
    //     ))

    //     console.log(imageUrl)
    // }
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
                    imageUrls={images}
                    enableSwipeDown
                    onCancel={() => console.log("cancel")}
                // backgroundColor  = {theme.light.colors.primaryBg}
                />



            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        zIndex: 1,
        right: ms(15),
        top: ms(10)
    }
})