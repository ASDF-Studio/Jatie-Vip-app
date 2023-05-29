import { theme } from "@/theme"
import { faClose, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useEffect, useRef, useState } from "react"
import { Modal, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, Image, ImageBackground } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import { ms } from "react-native-size-matters"
import { AppVideoPlayer } from "./VideoPlayer"
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { FontFamily } from "@/theme/Fonts"
const { width } = Dimensions.get('window')
export const SwiperViewer = ({ visible, setVisible, images }) => {
    const [swipeIndex, setWipeIndex] = useState(0)
    const swipeRef = useRef(null)

    // console.log("DATA+_+_+_+_", images);
    const onPlayVideo = (data) => {

    }
    return (
        <View>
            <Modal
                visible={visible}
                transparent={true}
            >
                <View style={styles.indexView}>
                    <Text style={styles.swipeIndexText}>{swipeIndex + 1}/{images.length}</Text>

                </View>
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

                <SwiperFlatList
                    ref={swipeRef}
                    autoplayDelay={2}
                    onChangeIndex={({ index, prevIndex }) => {
                        setWipeIndex(index)
                    }}
                    index={0}
                    data={images}
                    renderItem={({ item }) => (
                        <View style={[styles.child]}>
                            {item.mimetype.split("/")[0] == "image" ?
                                <Image
                                    source={{
                                        uri: item.mimetype.split("/")[0] == "image" ? item.url : "",
                                    }}
                                    style={styles.image}
                                /> :
                                <View
                                    style={styles.videoView}
                                >
                                    {/* <ImageBackground
                                        source={{
                                            uri: item.cover,
                                        }}
                                        style={[styles.image, styles.playButtonBg]}
                                    >
                                        <TouchableOpacity
                                            // activeOpacity={1}
                                            style={styles.playButton}

                                        >
                                            <FontAwesomeIcon
                                                icon={faPlay}
                                                size={ms(15)}
                                                style={styles.Play}
                                            />

                                        </TouchableOpacity>
                                    </ImageBackground> */}
                                    <AppVideoPlayer url={item.url} />

                                </View>
                            }

                        </View>
                    )}
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
    },
    videoView: {
        width: "100%",
        height: ms(200),

        alignItems: "center"

    },
    swipeIndexText: { color: "white", fontSize: 18, fontFamily: FontFamily.Recoleta_regular },
    indexView: {
        borderRadius: 50,
        position: 'absolute',
        zIndex: 55,
        right: ms(110),

        top: ms(50),
        height: 20, width: 100
    }
    ,
    container: { flex: 1, backgroundColor: 'black' },
    child: { width, justifyContent: 'center', backgroundColor: "black" },
    text: { fontSize: width * 0.5, textAlign: 'center' },
    image: {
        // flex: 1,
        width: '100%',
        height: ms(200),
        marginRight: ms(10),
    },
    playButton: {
        backgroundColor: theme.light.colors.primary, width: 50, height: 50, borderRadius: 100, justifyContent: "center", alignItems: "center"
    },
    playButtonBg: {
        height: ms(200),
        backgroundColor: theme.light.colors.hyperlink,
        // opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
    },
    Play: {
        position: 'absolute',
        color: theme.light.colors.background,
        marginLeft: ms(8),
        marginTop: ms(8),
    },

})
