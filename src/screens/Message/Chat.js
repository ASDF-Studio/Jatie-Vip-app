import React, { useState }  from "react";
import {View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { theme } from "@/theme";
import { HorizontalLine, Icon, ModalDown, TopBackButton, ModalList } from "@/components";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { ms, vs } from "react-native-size-matters";
import { FontFamily } from "@/theme/Fonts";
import { strings } from "@/localization";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBellSlash, faBoxArchive, faEllipsis, faFlag, faImage, faPaperPlane, faSearch, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import ImagePicker from "react-native-image-crop-picker";

export default function Chat({navigation, route}){
    // const params = route.params;
    const [openCrud, setOpenCrud] = useState(false);
    // console.log(params)

    const UploadImages = ()=>{
        ImagePicker.openPicker({
            multiple: true
          }).then(images => {
            console.log(images);
          }).catch(err =>{
            console.log(err)
          })
    }

    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.header}> 
                <View>
                    <TopBackButton onPress = {()=> navigation.goBack()} />
                </View>
                <View style = {styles.headerIconContainer}>
                    <Icon 
                        icon = {faSearch}
                        size = {ms(22)}
                        style = {styles.searchIcon}
                    />
                    <Icon 
                        icon = {faBell}
                        size = {ms(22)}
                        style = {styles.bellIcon}    
                    />
                </View>
            </View>
            <View style = {styles.userContainer}>
                <View style  ={{flexDirection : "row"}}> 
                    <Image 
                        source={{
                            uri : Data.profilePic
                        }}
                        style = {{
                            height : ms(40),
                            width : ms(40),
                            borderRadius : 100
                        }}
                     />
                    <View style = {styles.userNameTxtContainer}>
                        <Text style = {styles.fullnameTxt}> {Data.name} </Text>
                        <Text style = {styles.usernameTxt} > {Data.userName} </Text>
                    </View>          
                </View>
                <View>
                    <Icon 
                        icon = {faEllipsis}
                        size  = {ms(20)}
                        style = {{
                            marginTop : vs(18)
                        }}
                    />
                </View>
            </View>
            <HorizontalLine />
            <View style = {styles.messageBody}>
                <FlatList 
                    data={Data.messaging.conversation}
                    keyExtractor = {(item)=> item.messageId}
                    contentContainerStyle = {{paddingBottom : ms(50)}}
                    renderItem = {({item})=> (
                        <View style = {{margin : ms(10)}}>
                            {/* only Text sending */}
                            {item.sendingTxt.length> 0? 
                                <View style = {styles.messageContainer}>
                                        <TouchableOpacity 
                                            style = {styles.messageTxtContainer} 
                                            onLongPress = {()=> setOpenCrud(true)}
                                        >
                                            <Text style = {styles.messageTxt}>{item.sendingTxt} </Text> 
                                        </TouchableOpacity>
                                    <View> 
                                        <Image 
                                            source={{
                                                uri : Data.messaging.profilePic
                                            }}
                                            style = {styles.messageWithImage}
                                        />
                                    </View>
                                </View>
                            : null}
                            {/*  only images sending */}
                            {item.sendingImages.length > 0? 
                                <View style = {styles.messageContainer}>
                                    {item?.sendingImages?.map(data => (
                                        <Image
                                            source={{
                                                uri : data.url
                                            }}
                                            style = {{
                                                width : '85%',
                                                height : ms(130),
                                                resizeMode : 'stretch',
                                                borderRadius : 10,
                                                marginTop : ms(10)
                                            }}
                                        />
                                    ))}

                                    <View> 
                                        <Image 
                                            source={{
                                                uri : Data.messaging.profilePic
                                            }}
                                            style = {styles.messageWithImage}
                                        />
                                    </View>
                                </View>
                            : null}

                            {item.replyingTxt.length > 0? 
                                <View style = {styles.replyContainer}>
                                    <Text style = {[styles.messageTxt,{color : theme.light.colors.black}]}>{item.replyingTxt}</Text>
                                </View>
                            : null}
                        </View>
                    )}
                />
                {/* text filed */}
               <View style = {styles.txtInputContainer}>                  
                    <TextInput 
                       placeholder= {strings.message.inputPlaceholder}
                       style = {styles.inputBox}
                    />
                    <View style = {styles.inputBoxIconContainer}>
                        <TouchableOpacity
                            onPress={UploadImages}
                            style = {[styles.boxIcon, {backgroundColor : theme.light.colors.successBgLight}]}
                        >
                            <FontAwesomeIcon 
                                icon={faImage}
                                size = {ms(16)}
                                color = {theme.light.colors.success}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {[styles.boxIcon, {backgroundColor : theme.light.colors.primaryBgLight}]}
                        >
                            <FontAwesomeIcon 
                                icon={faPaperPlane}
                                size = {ms(16)}
                                color = {theme.light.colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {openCrud && 
                <ModalDown
                    open = {openCrud}
                    setOpen = {setOpenCrud}
                >
                    <ModalList 
                        title= {strings.message.archive}
                        icon={faBoxArchive}
                        iconColor = {theme.light.colors.primary}
                        iconBg = {theme.light.colors.primaryBgLight}           
                    />
                    <ModalList 
                        title= {strings.message.snoozeNotification}
                        icon={faBellSlash}
                        iconColor = {theme.light.colors.info}
                        iconBg = {theme.light.colors.infoBgLight}   
                    />
                    <ModalList 
                        title= {strings.message.snoozeNotification}
                        icon={faTrash}
                        iconColor = {theme.light.colors.error}
                        iconBg = {theme.light.colors.infoBgLight}   
                    />
                    <HorizontalLine color = {theme.light.colors.infoBgLight} />
                    <ModalList 
                        title= {strings.operations.report}
                        icon={faFlag}
                        iconColor = {theme.light.colors.secondary}
                        iconBg = {theme.light.colors.infoBgLight}
                        onPress = {()=> {
                            // setOpenReport(true)
                            // setOpen(false) 
                        }}          
                    />
                    <ModalList 
                        title= {strings.operations.block}
                        icon={faXmark}
                        iconColor = {theme.light.colors.secondary}
                        iconBg = {theme.light.colors.infoBgLight}
                    />
                </ModalDown>
            }
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : theme.light.colors.white
    },
    header : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    headerIconContainer : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    bellIcon : {
        marginRight : ms(9)
    },
    searchIcon : {
        marginRight : ms(9)
    },
    userContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        padding : ms(9)
    },
    userNameTxtContainer : {
        padding : ms(2)
    },
    fullnameTxt : {
        fontFamily : FontFamily.Recoleta_bold,
        fontSize : ms(14, 0.3),
        color : theme.light.colors.black
    },
    usernameTxt : {
        fontFamily : FontFamily.Recoleta_regular,
        fontSize : ms(14, 0.3)
    },
    messageBody :{
        flex : 1,
        backgroundColor : theme.light.colors.primaryBgLight
    },

    messageContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    messageTxtContainer : {
        width : '85%',
        backgroundColor : theme.light.colors.primary,
        borderRadius : 10,
        padding : ms(10)
    },
    messageTxt : {
        fontFamily : FontFamily.BrandonGrotesque_regular,
        fontSize : ms(16, 0.3),
        color : theme.light.colors.white
    },
    messageWithImage : {
        height : ms(40),
        width : ms(40),
        borderRadius : 100,
        position : 'absolute',
        bottom : 0,
        right : ms(3)
    },
    replyContainer : {
        backgroundColor : theme.light.colors.white,
        borderRadius : 10,
        marginTop : vs(10),
        width : '90%',
        padding : ms(8),
        marginLeft : '10%',
    },
    txtInputContainer : {
        backgroundColor : theme.light.colors.white,
        position : 'absolute',
        bottom : 0,
        width : '100%'
    },
    inputBox : {
        fontFamily : FontFamily.BrandonGrotesque_regular,
        fontSize : ms(16, 0.4),
        paddingRight : ms(90),
        paddingLeft : ms(9)
    },
    inputBoxIconContainer : {
        flexDirection : 'row',
        alignContent : 'center',
        position : 'absolute',
        right : ms(8),
        top : ms(3)
    },
    boxIcon : {
        margin : ms(5),
        borderRadius : 100,
        padding : ms(8)
    },
 
})



const Data = {
    userId : 1,
    name : 'Sonnu Albert',
    userName : '@sonnu',
    profilePic : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIIAwwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYHAQj/xAA7EAACAQMDAgQEBAMHBAMAAAABAgMABBEFEiExQQYTUWEiMnGBFEKRoSMzUgcVcrHB0fBjsuHxJDVi/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QAIhEAAgIDAQADAAMBAAAAAAAAAAECEQMSITEyQVETYXEE/9oADAMBAAIRAxEAPwDdW6EqCRyaKdQYCMZyKrrsyx3a8/DnpVjZzCTC1RTXglGT1vTZPLeVvk/oNZzSdQaxuDJsVtvUA4rofiTT5b21KQttJHFc8bRntZdkhYuOS1QycCb7SdaElvuYlTjpSiuGe4MkiDBHeshaXkkcm2RWKqu3A4FaOwkW4ljITCnGKCbY6Ide0+bUCoi+FF/esnqfnaaoi2FdzY5rr0aRx2uWAGBWO1xba/mZSqko3U004aoSrMZHcGQl5ck4x0ppnaZtkYwPWrDUIFt5iigEEdAKCNpPH/FQDAPasjts5RSLDR7eVrxQ5Hl45rfQ6VYvafGEbA446Vz6K/e3jyvXv9aMtNZv5498knlxgdAM5pscv0bWnSNCbOC1lc24C5GOOhoc65LZKATuCnp7VnzrExcKsmRnkkf61FcX0aygSO3qW6j6VW2PozUSX4uxgOm1hnGORUzQW9xEA6jfjqtZZLzaFkgYBT+YDIz6H0rQeHNQtryY2lyAk/5ewb6e9FW2FwaRQ6j4ZiTzJElbB9O1YLUI5YbgxmTlGxzXWvFtrc2Vo5hJK+orlF9ExnZnOWNc216Z5pLwCYAnkjn0qNkEb57VNtPIxio1Qs+T+ldYlUMmWMcrQzMG5oiYbmwaHZNg4rhkQPGCeDTJodqjJojGAGqGYl+KIwOVGaVP2GlROtH0vcRSO5kOSOgHpUfnvEmcnjuc1YKeKbPCJIioUcjk1Whwa21RJlKPz2Bqq1iNPMOwFi/HsKDu7K6i1JDb8RH5h6UTeTFEDSZyGFTlb9GSKfUrWODaxyGXsT1qw8PytKFKY4bBIqnu5X1C8e3PxMOADWk0Kw/BW4jJ+IHceKmvQmm8xZLdlfvxzWT1LT1jneWOR8Ecr2qfVLyS2bfDlj3U9Kp9S1edotz4UHjijkyWgUkByMGYuep/ak9wqIVIzmqyK53Au2WGe9SQ3K3ThAO/pULZMfDArAzTOFiXk5OKz0/im41O7/BaJbkxA4XZHlm9/ameNdVfYum2JJLsEIX83t9zXSvAHheDw9pMJaNTdON0shHJPp9KPIRs148ZlrPQPEcyZuCkQPZutHXeif3fbKXXzc8uSM4P0rpHBXpQs9rHLkOAQe1J/IzQoROUw3W12AIAXgg9CPTNEfHEVlhJHIYDPymp/G/huKzga6tn29zjjNUnhPVTdrJZzEOR8hPX6VVStWTap0dKj1VdT0Xybj4rhBtJ/q9DXOtWsJFld2AAzxxxV7o11tlZM8o5Rh7VP4hWFrcGPk59aO1+mTNBIwIiLE4FNaEqCRj7VbwWu9iR2oK+PlS+XiiZ0iokGG96ZJGwX4lP3o2SIA5NQzOHwOlcqKJATqQg471CU289aOkXkADIqGaBxF5namCCGlXu9e9KuBR9NrUi1GlSrWhMpR55KN1UfWh72wjeJiwBFGrQerSOtq+zqRxXSqgpGRtYYrXVZZTgnPf6U/VNdWKVfK6DrjvWWvr64jvnWTcGz+1QSSyTOvJOaxudDf4bBLtbiLcxGTyapNVkWbcsfAzxQpneGLbk81A0zEcGpbWLNNkTgKpy547U23l/DxyzHqqkL9TSmRiPUmq7WG/C6YyA/G5557n/AGFMugxQuRD4OVb3xO+pXULzW9ivmlEPOTwv+tdn0fW7XWbUy2e5VVtpVxgrXE/Aml32p3t69mzpCgXzdpxv56Z7V1LwN4eutKN7Pd3LyrMMJE6/Lye/ejlr9N2NMn1XxnBpt6bKOxuLqZeuwYUferCw1mS9iDy2iw5HRZgzD7VRaz4flln89S7jd8SgZ/SqXS/DGupeNNBqcirvJSOaHgL6Hnn60iUWijTT8NF4ys5L/R7kQHcwTcoHeuK+GrprTVZN+VOOR6Yr6B/DSQ22JWDt34618/a3Gtv4lvlh4XecAU2F2mieWNUzcQXYTUIJ+kd0mGPow/4KsbyxvL1zHDIMHkDFZq3Vn8PQyk4dCSp+4NbLSdQRLSKWTocDPvTfdkssNoisNEazjZpGywHI96zXiG3BuRJn4j0FbK81WKW3kePlsY4NYKa5kmunWUHI7HtTmWSVUV8r/lI5FCSKwG4g49aLu1J3Fc0nYSWhz1xjFcvQJAKS/FytD3V2yqYl+XPepVGWwKGngZ5j6CmToJGFBAPFe1J5C+teUbBR9Jo1Sq9V4uYx+ap0nUjg1RNFkg1WplwA0LUK12i9+frTZL5PLPP710pKh1E594otcXu4KeOSaAsiCavvEE8cnPeqK2QDc2e/SvOmxq6SXY3HOaDztPINTTSHcc9KjYhloRfBZoXm5PHBFUXiicgbPQD9TyauLYGS8WH+o4qs8VWr/jfLXkYBP6VWL6PhjcWzVf2MzxQaHqAOPMF1uPrjYMf61srrxXZ2rLFLFMmTgsEJxnvx2rkngu6/uzxFDZSSER3iFHHbP5T/AM9a6Ze3bm6UvpkTbAAC0y5x96E09jXiVqkXFrqKSvlG8yFuj7fainuEXJj49qpV1SSWIJHpc6LkZZXQqo9fmpxMky8tipOyjQReXTOpAz09a45q2n+f4gvNuCvmZyOvPOP3rqOozpZWkju2cDisJpMRZpbqTl55DJz6Dp/lmq4uJsjkVtIJngWLSI4AMj4lH2GKn0+M/wB0PG56fGM9ulQ6q5U2Ueeilj96OtADBIh6Y2n6HFF+CuNpjNMuEjMkUgA4GM/vVRqZQ35dRyeuKivJCsnBweORQrsx+Ik/Wns86V3RM2w/XvQbKuCRTWclu9eH+U3rRTs5IE2gT5A4pl44RsJyTXsDMZCCc0nCJdRtJ03DNU+g0DfhLo8+W/PtSro6T2exduwLgYpU+pwLJ4hueqA+1WFv4mb8OA38zHShpPDzizDCT4gM1VW9u4l2yKcg1n24aoouZNbuZRwuD2pj6rcNHtLYJpuzYnyEmgbhJMkrG5+gqDyOXAzVDpJWfksTTopAnBGahiSXPMT/AKVOLSZhxGRSNCo8k/idKj2EDBFebzE+1xgj1qVZVmBVgR/+l7UVw6rJNJhK30cmOc9TTtaiijeSe4wFj+YnufQUVYbLYGZ/jIU7ewHuay/ii9luhtziLPHuaMeyNcIaQM48rT37Xedrh9yn+kjpXbNFuLPX9FtL2RR5jgh8dVYcGuHAEMcd+DR2leINS0ZmSyuNsZOTEwypPr7VonHZcJRlq7Z3uO2treP5sDHc1SazrlhpsRaWZBjoM81itO1jV9c06SZrgqyOVYRjFDrYxWsour4ebMBuVXPC+/uajpXpbe/CyvrmfVis13mC1zlYm4Zh6kdhT4k3IioMBzjHoOM/tVZZTSalqCg5ZdxyPYD/AFOKt2/MY+SPhDe/c/bk/pTPnBV0r9TmD6hAAchzsX6L3/erK1yEl5xlciqWQB9SHBCJH8Ofc1fRBRbSSHjamBXS4jor0obqLjB7c1XPJsYZ6VcXbK4JXr6Vm55MyMDVF4efkj0NV0Zh05ps4AiO3tQceQaMTmFiaaKFSK62H8VieKFum3ynPY0YnAY1XkEyNn1pzg+K/ZY1Bc5A9a9qvwaVdYDuLzoV2FRtqCOyR33bABVbFdsCNwqzW5VUDZx9Kx7noKISLBP6R+lPFhER8i/pUMNw0uNrcUfFnGWagpJj6gcllHH+Rf0ocJHkj4an1mUJCSr9BWWS7YS/Oa5itpD9dtBuV0AyDVQuVbmI5HQocVaXVwXxk5Jq30vToZ4QSoyRya4n6+GWvbp1thH0zyfeq68Rb2zVosGROq5rU65o0fnoqkD4WOfSsfqRS1Rok4I4x6n1po/0aV8elPPH5bEMMHrigZVPmgjpirFQZoMH5g2PsaWm2P46+SF/kzzg4rQjPPpr/AsJs9FlnnHEz7ox6gcZpl/HJdyEgFmY/YfaiJLyKNAiAiGIYHHHpSXWZVhQW9vtR/k7ySf7D3rP27LKlGibSrFrG2kfYwmfPXqB61DdTyQhYkRg7fDtAzgZ5/Xv9hUn4i7ldo2nxt5Z1HC464Hf6mgrWV9Qu5YYNyW8IzM5PxOT2LevX6UyXbZzaSorZ7ox3m7DED4Djmr/AE83Etg0cykOx4BFP07T0LNPsACHagxwMdat9NtUvGMe7BHA54NdKSYUmkZe6Ozjv06VSX0O2ZvQGt94j0aWOIzrGXjA645H19qxN7l5XBGDnpVIdRjzRoBUhcZoksPw5xQn59poll2wVRIhQG5KRN70HnjNE3LYjoEtngdKICQGvajDYFKlAdSIFEIfgIoRD05opemK86Vo9RBem3HlHDLx61exyxzqORWbhGKKifByDg10ZUM1YRq2l3FwmIn49KyyaXei/EDDHPzHpWvg1CWLGfjWrCGa0umDNgSetNsTljsy7eFb5lBLKfoKMt7O+0vIEM86dgi5xV5NqE1m4UoHQ9CKiudZmCZjaGM9zJSPI7pDRxJGSEWoarqV09+zWdvEhOwkZIHGKxt7bqHuZuWQMdu6tbr1358jNNcDk/FsG1apmsI7yICGZ3jzysa/N+taMdjz4umf0+3YQyyOCIwPmPrnpWk8PaOy3MSxxmWRzk7B271Y2ulxwpHC0YyBnylG7bnufetEl1HpdmEsIzErD+PcSphm46D0FWc1GL/SGjk0Uep2NpZQ77gBwnPlZ+Zuw+1A2g2K15M2bluE9Ezxx9AD+tN1+d2mjD9MAgHuSByfvSsDtvNl4pWKQDa3ZT7+3Spq0rZV1fCOxZrm0v3gUowjIT/D/wAGadoJW0tZgyEAjg/1EZq0s7STS9RljkKmFhuRh02ntQt1bqtxujbZEjfwlHOT3FDZPhyX2WFsssunhIgPNxnH1NX9nEhgV7YmCQY3IRnn/neszZpqdjKt4LfKHO5c5yPpVumoI5EgSWNx3UZA9qRoNl0rTuSkmxsgggjjH0rnvjLR10jUBJEn/wAW4BMeOiMMZXP3yP8AxW1s7+S4uY41gZefjYHIp/ibTl1XQrm36yhfMiPo45H69PvVMbpkcsbRxmYbZt3ainbNuPWoJMMmO9NdykVajEB3hzwKFXinSPubPrTePWuFY0sM17Xvw0qIDpUEu+NexFHLJlfeqS0uEEiqx5NWrHZg9jWHLGmb8crQdAcjmiMccUJbkMnHaio2rM0XTPVfZnPTHSp1CscqSrcdKiKhunpSBKlvXFBMIcgd/hkbdQGpWPmts3Ed8A0dZ4kU5bDCm6swsNPkmYjz5sIvtmqQjtIDnqjGtpqXlyTLv8hThV3fP7n2q9tbbMkdtaxLvb4VA9KBSTauAegrV+F7Qx25vJh8cnEfsvr969JpY4mNyc5A1x+H026K3qXUZKqFu7cEq+B0OOnSqTWtYsUiK2JM0jEjzZTnbWp8R6jFp+mO75Z3+CNF6sx6YrmcmlahblJ9iSbvidSeQc+9ZVFN2zTtyh/iGTzHc2rhrlVUSZPT4f8AfNXGjYubWCOY/wAeIA/4h3FZ+aFEvHkxIJJW3SKwH+feiZblrYwywn4o25HtTyXKQE+miljE6wR54jYoPdR/7o/TLSDzFlkQH4mYZ54zxQdiv4mZWfhcbiOnJ7VZxyKZpMcKCF/apUFyLAESHBHHvQz2sW8+XlGPXHeoXum3BIhn3FEwoyjJOSaHQWTW8Ai6Elj3NFI1DK3NSB8HmigPpxrXYfwPiDULUfItwxT/AAk5H7Gg7wKIM1ff2i2xj8Ueao+GeFX+4yp/yFZ6/Vjb9K2xdowy42VjBQue9Qs2K9bOBk0wgY+KiIz3dSqPcK9oim3T+ZH9a0cn8hPpSpVmzmvCTWNHDtSpVikakTJ2r2Tp+tKlUxiSz/nJ9qF8eE7bEZ484UqVacHyRPJ4UZ+RvpXR7AAWtuAMDyk4+wrylW7/AKPEZ8XplvEPxeJbNW5UW7kA9AcjmnvSpVm/C6KLV1Xep2jPPahoOpPdUOD6cGlSpvo5Ft4WJOmRknJ5oqM/wn/xN/ma9pUpzC9PAz0qyPyCvKVKwjO9PpUqBxgv7Sv/ALPTz/0X/wC4Vkr4/wAClSrZD4mGfyKR6XalSp0KCN8x+tKlSriZ/9k=',
    messaging : {
        userId : 1,
        name : 'Sussi Ana',
        profilePic : "data:image/jpeg;base64,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",
        conversation : [
            {
                messageId : 1,
                sendingTxt : 'Hey, How are you?',
                sendingImages : [
                    {
                        id : 1,
                        url : 'data:image/jpeg;base64,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'
                    }
                ],
                replyingTxt : "",
                replyImages : [],
            },
            {
                messageId : 2,
                sendingTxt : '',
                sendingImages : [],
                replyingTxt : 'I am fine. What about you?',
                replyImages : [],
            },
            {
                messageId : 3,
                sendingTxt : 'Yahh, Very Well. I have something to talk about it with you',
                sendingImages : [],
                replyingTxt : '',
                replyImages : [],
            },
            {
                messageId : 4,
                sendingTxt : '',
                sendingImages : [],
                replyingTxt : "Sure, please go on",
                replyImages : [],
            }
        ]
    }
}

