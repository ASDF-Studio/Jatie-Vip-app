import React, {useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    Alert,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import {
    faEllipsis,
    faMessage,
    faFlag,
    faXmark,
    faUserPlus
  } from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';
import {TopBackButton, Icon, Badge, HorizontalLine } from '@/components';
import {ModalDown, ModalList} from '@/components';
import {NAVIGATION} from '@/constants'
import {strings} from '@/localization'
import { ms } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';


export default function BirthDayToday({navigation}){
    const [open, setOpen] = useState(false);
    return(
        <SafeAreaView style = {styles.container}>
            <TopBackButton onPress = {()=> navigation.goBack()} />
            <View style = {styles.listHeader}> 
                <Text style = {styles.headerTxt}>{strings.profile.myFollowers}</Text>
                <Badge count={23} size = {ms(16)} />
            </View>
            <View>
                <FlatList 
                    data={Data}
                    key = {(props)=>props.id}
                    initialNumToRender ={10}
                    contentContainerStyle={{ paddingBottom: ms(100) }}
                    renderItem = {({item})=> {
                        return (
                            <View style = {styles.listContainer}>   
                                <TouchableOpacity 
                                    style = {styles.list}
                                    onPress = {()=> navigation.navigate(NAVIGATION.userProfile)}
                                > 
                                    <Image source={{uri : item.image}} style = {styles.profileImage} />
                                    <View style = {styles.nameContainer}> 
                                        <Text style = {styles.nameTxt}> {item.name} </Text> 
                                        <Text> {item.userName}  </Text>
                                    </View>
                                </TouchableOpacity>
                                <Icon 
                                    icon={faEllipsis}
                                    size = {ms(15)}
                                    color = {theme.light.colors.secondary}
                                    onPress = {()=> setOpen(true)}
                                />
                            </View>
                        )
                    }}
                />
            </View>
            <ModalDown 
                open={open} 
                setOpen = {setOpen}
            > 
                <ModalList 
                    title= {strings.operations.follow}
                    icon={faUserPlus}
                    iconColor = {theme.light.colors.primary}
                    iconBg = {theme.light.colors.primaryBgLight}
                />
                <ModalList 
                    title = {strings.operations.sendPrivateMessage}
                    icon = {faMessage}
                    iconColor = {theme.light.colors.success}
                    iconBg = {theme.light.colors.successBgLight}
                    // onPress = {()=> Alert.alert("message")}
                />
                <HorizontalLine color = {theme.light.colors.infoBgLight} />
                <ModalList 
                    title= {strings.operations.unFollow}
                    icon={faFlag}
                    iconColor = {theme.light.colors.secondary}
                    iconBg = {theme.light.colors.infoBgLight}
                    // onPress = {()=> Alert.alert("report")}
                />
                <ModalList 
                    title= {strings.operations.block}
                    icon={faXmark}
                    iconColor = {theme.light.colors.secondary}
                    iconBg = {theme.light.colors.infoBgLight}
                    // onPress = {()=> Alert.alert("blocked")}
                />
            </ModalDown>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : theme.light.colors.white
    },
    listHeader : {
        paddingBottom : ms(5),         
        flexDirection : 'row',
        alignItems : 'center'
    },
    headerTxt : [
        TextStyles.header, {
            color : theme.light.colors.black, 
            paddingLeft : ms(9)
        }
    ],

    listContainer : {
        padding  : ms(2),
        paddingLeft : ms(8),
        paddingRight : ms(12),
        flexDirection : 'row',
        justifyContent : 'space-between',
        margin : ms(2),
        alignItems : 'center'
    },
    list : {
        flexDirection : "row",
        alignItems : "center"
    },
    profileImage : {
        height : ms(40),
        width : ms(40),
        borderRadius : 100,
        borderWidth : 1,
        borderColor : theme.light.colors.secondary
    },
    nameContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    nameTxt : {
        fontFamily : FontFamily.Recoleta_bold,
        fontSize : ms(15, 0.3),
        color : theme.light.colors.black 
    }
})


const Data = [
    {
        id : 1,
        name : "Harinder Bharwal",
        userName : "@harinder",
        image : 'https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg'
    },
    {
        id : 2,
        name : "Peter Taylor",
        userName : '@peter',
        image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmAgieDfVf6AX0Ox5zuIgW78Laf6YxS37M1byexctLnQ&s'
    },
    {
        id : 3,
        name : "Danna Koprivoan",
        userName : "@dana",
        image : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
        id : 4,
        name : "Mayke Sehurs",
        userName : "@mayke",
        image : 'https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?b=1&k=20&m=1179420343&s=612x612&w=0&h=c9Z3DyUg-YvgOQnL_ykTIgVTWXjF-GNo4FUQ7i5fyyk=',
    },
    {
        id : 5,
        name : "Anatoly Shcherbatykh",
        userName : "@anatoly",
        image : 'https://image.shutterstock.com/image-photo/portrait-mature-businessman-wearing-glasses-260nw-738242395.jpg',
    },
    {
        id : 6,
        name : "Otmar Dolezal",
        userName : "@otmar",
        image : 'https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=2000',
    },
    {
        id : 7,
        name : "Siri Jakobsson",
        userName : "@mayke",
        image : 'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?w=2000',
    },
    {
        id : 8,
        name : "Bansilal Brata ",
        userName : "@brata",
        image : 'https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg',
    },
    {
        id : 9,
        name : "Teng Hu",
        userName : "@teng",
        image : 'https://image.shutterstock.com/image-photo/portrait-mature-businessman-wearing-glasses-260nw-738242395.jpg',
    },
    {
        id : 10,
        name : "Lacara jones",
        userName : "@jones",
        image : 'https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.jpg?b=1&s=170667a&w=0&k=20&c=Dl9uxPY_Xn159JiazEj0bknMkLxFdY7f4tK1GtOGmis=',
    },
    {
        id : 11,
        name : "Dusana Semanov",
        userName : "@dusana",
        image : 'https://image.shutterstock.com/image-photo/portrait-mature-businessman-wearing-glasses-260nw-738242395.jpg',
    },
    {
        id : 12,
        name : "Dusana Semanov",
        userName : "@dusana",
        image : 'https://image.shutterstock.com/image-photo/portrait-mature-businessman-wearing-glasses-260nw-738242395.jpg',
    },
    {
        id : 13,
        name : "Dusana Semanov",
        userName : "@dusana",
        image : 'https://image.shutterstock.com/image-photo/portrait-mature-businessman-wearing-glasses-260nw-738242395.jpg',
    },
    {
        id : 14,
        name : "Dusana Semanov",
        userName : "@dusana",
        image : 'https://image.shutterstock.com/image-photo/portrait-mature-businessman-wearing-glasses-260nw-738242395.jpg',
    },
    {
        id : 15,
        name : "Dusana Semanov",
        userName : "@dusana",
        image : 'https://image.shutterstock.com/image-photo/portrait-mature-businessman-wearing-glasses-260nw-738242395.jpg',
    }
]
