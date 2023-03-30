import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { theme } from '@/theme';
import {
  HorizontalLine,
  Icon,
  ModalDown,
  TopBackButton,
  ModalList,
  AppImageViewer,
} from '@/components';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { ms, vs } from 'react-native-size-matters';
import { FontFamily } from '@/theme/Fonts';
import { strings } from '@/localization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBellSlash,
  faBoxArchive,
  faEllipsis,
  faFlag,
  faImage,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Data } from './MessageData/chatData';
import { faPaperPlaneTop, faSearch } from '@fortawesome/pro-regular-svg-icons';
import { Bubble, Composer, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { useCallback } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { getUser } from '@/selectors/UserSelectors';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { CHATS, MESSAGES } from '@/constants/firebaseConstants';


let nextId = 0;

export default function Chat({ navigation, route }) {
  // const params = route.params;
  const [openCrud, setOpenCrud] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageType, setMessageType] = useState(0);
  const user = useSelector(getUser);

  const [text, setText] = useState('');


  const deleteImage = id => {
    setImageArray(oldValues => {
      return oldValues.filter(a => a.id !== id)
    })
  };

  const renderSelectedImagesPreview = imageArray => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.BottomContainer}
      >
        {imageArray ? (
          <View style={styles.BottomFileContainer}>
            <View style={styles.FileContainer}>
              {imageArray.map(item => {
                if (item == null) {
                  return;
                } else {
                  return item.image ? (
                    <View style={styles.fileSpacing} key={item.id}>
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: item.image }}
                      />
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => deleteImage(item.id)}
                        style={styles.minus}>
                        <Text
                          style={styles.minusTxt}
                        >
                          {strings.giveaway.minus}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null;
                }
              })}
            </View>
          </View>
        ) : null}
      </ScrollView>
    );
  };

  const UploadImages = async () => {

    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
    })
      .then(images => {
        images.forEach(item => {
          setImageArray(oldValues => [...oldValues, {
            id: nextId++,
            image: item.path,
          }])
        });
      })
      .catch(e => {
        console.log('Error: ' + e);
      });
  };


  useEffect(() => {
    const chatQuery = firestore().collection(CHATS).doc(`dummyuser-${user?.id}`).collection(MESSAGES).orderBy('createdAt', 'desc')

    const unsubscribe = chatQuery
      .onSnapshot(querySnapshot => {
        const kmessages = [];
        querySnapshot.forEach(documentSnapshot => {
          kmessages.push({
            ...documentSnapshot.data(),
            _id: documentSnapshot.id,
          });
        });
        console.log('Messages retrieved!', kmessages);
        setMessages([...kmessages]);
      });

    return unsubscribe;

  }, [])




  const onSend = (messages = []) => {
    const chatMessage = messages[0].text
    console.log('check message', chatMessage)
    console.log('check images -->', imageArray)

    const getMessageType = () => {
      if (imageArray.length > 0 && chatMessage) {
        setMessageType(2)
        return 2
      } else if (imageArray.length > 0 && !chatMessage) {
        setMessageType(1)
        return 1
      } else if (imageArray.length === 0 && chatMessage) {
        setMessageType(0)
        return 0
      }
    }

    const messagePayload = {
      user: { name: user?.fullName, username: user?.username, _id: user?.id, role: 'free', avatar: user?.profilePic },
      status: { isOnline: false, isTyping: false, isRead: false },
      message: { type: getMessageType(), imageURL: imageArray, text: chatMessage ?? '' },
      createdAt: moment().toISOString(),//new Date(),
      sentTo: 'dummyUser',
      sentBy: user?.id,
    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, messagePayload))

    firestore()
      .collection(CHATS).doc(`dummyuser-${user?.id}`).collection(MESSAGES).add(messagePayload)
      .then(() => {
        console.log('Message added!');
        // setImageArray([])
      });
    setText('')
  }


  const renderCustomBubbleView = (props) => {
    console.log('check current message', props.currentMessage)
    const isCurrentUser = props.currentMessage.user._id === user?.id

    return (
      <View style={styles.messageContainer}>
        <View
          style={[styles.messageTxtContainer, { backgroundColor: isCurrentUser ? theme.light.colors.white : theme.light.colors.primaryBgDarkest }]}
          onLongPress={() => setOpenCrud(true)}
        >
          {/* Render View for Text */}
          {messageType === 0 && <Text style={[styles.messageTxt, { color: isCurrentUser ? theme.light.colors.black : theme.light.colors.white }]}>{props.currentMessage.message?.text} </Text>}

          {/* Render View for Image */}
          {messageType === 1 && <View style={{ flexDirection: 'row', flex: 1 }}>
            {imageArray.map((item) => (
              <TouchableOpacity onPress={() => setShowImageView(true)} style={{ borderRadius: ms(8), flexGrow: 1, justifyContent: 'space-between', margin: 5 }}>
                <Image style={{ borderRadius: ms(8), height: Dimensions.get('screen').width / 4, width: Dimensions.get('screen').width / 4.2, resizeMode: 'cover' }} source={{ uri: item.image || null }} />
              </TouchableOpacity>
            ))}
          </View>}

          {/* Render View for Text + Image */}
          {messageType === 2 &&
            <View>
              <Text style={[styles.messageTxt, { color: isCurrentUser ? theme.light.colors.black : theme.light.colors.white }]}>{props.currentMessage.text} </Text>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                {imageArray.map((item) => (
                  <TouchableOpacity onPress={() => setShowImageView(true)} style={{ borderRadius: ms(8), flexGrow: 1, justifyContent: 'space-between', margin: 5 }}>
                    <Image style={{ borderRadius: ms(8), height: Dimensions.get('screen').width / 4, width: Dimensions.get('screen').width / 4.2, resizeMode: 'cover' }} source={{ uri: item.image || null }} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          }
          <Text style={{ fontSize: 10, alignSelf: isCurrentUser ? 'flex-end' : 'flex-start' }}>{moment(props.currentMessage.createdAt).format("LT")}</Text>
        </View>
      </View>
    )
  }

  const renderCustomInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        textInputStyle={{ fontSize: 18, fontFamily: FontFamily.BrandonGrotesque_regular, lineHeight: 22, alignSelf: 'center' }}
        containerStyle={{ height: 60, justifyContent: 'center', }}
        renderSend={(props) =>
          <View style={styles.inputBoxIconContainer}>
            <TouchableOpacity
              style={[styles.boxIcon, styles.inputBoxIconColor]}
              onPress={UploadImages}
            >
              <FontAwesomeIcon
                icon={faImage}
                size={ms(16)}
                color={theme.light.colors.success}
              />
            </TouchableOpacity>
            <Send {...props}
            // sendButtonProps={{ onPress: () => onSend(props.text) }}
            >
              <View
                style={[styles.boxIcon, styles.sendBoxIcon]}>
                <FontAwesomeIcon
                  icon={faPaperPlaneTop}
                  size={ms(16)}
                  color={theme.light.colors.primary}
                />
              </View>
            </Send>
          </View>
        }
      />
    );
  }

  const renderChatHeader = () => {
    return (
      <View>
        <View style={styles.header}>
          <View>
            <TopBackButton
              onPress={() => navigation.goBack()}
              style={styles.TopBackButton}
            />
          </View>
          <View style={styles.headerIconContainer}>
            <Icon icon={faSearch} size={ms(22)} style={styles.searchIcon} />
            <Icon icon={faBell} size={ms(22)} style={styles.bellIcon} />
          </View>
        </View>
        <View style={styles.userContainer}>
          <View style={styles.userImageContainer}>
            <Image
              source={{
                uri: Data.profilePic,
              }}
              style={styles.userImage}
            />
            <View style={styles.userNameTxtContainer}>
              <Text style={styles.fullnameTxt}> {Data.name} </Text>
              <Text style={styles.usernameTxt}> {Data.userName} </Text>
            </View>
          </View>
          <View>
            <Icon icon={faEllipsis} size={ms(16)} style={styles.userIcon} />
          </View>
        </View>
        <HorizontalLine />
      </View>
    )
  }

  const renderChatFooterView = () => {
    return (
      <View>
        {imageArray.length > 0 && renderSelectedImagesPreview(imageArray)}
      </View>
    )
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderChatHeader()}
      <GiftedChat
        messages={messages}
        // text={text}
        // onInputTextChanged={(msg) => setText(msg)}
        onSend={messages => onSend(messages)}
        // isTyping
        showUserAvatar
        alwaysShowSend
        placeholder='Type your message here'
        renderBubble={renderCustomBubbleView}
        messagesContainerStyle={{ paddingBottom: 20, backgroundColor: theme.light.colors.chatBackground }}
        renderInputToolbar={renderCustomInputToolbar}
        renderChatFooter={renderChatFooterView} // Shows user selected images as preview

        user={{
          _id: user?.id,
          name: user?.username,
          avatar: user?.profilePic
        }}

      />
      <AppImageViewer
        visible={showImageView}
        setVisible={() => setShowImageView(false)}
        images={['https://placeimg.com/500/500/any', 'https://placeimg.com/550/500/any', 'https://placeimg.com/600/500/any']}
      />
    </SafeAreaView>
  )

  //   return (
  //     <SafeAreaView style={styles.container}>
  //       {/* <View> */}

  //       <View style={styles.header}>
  //         <View>
  //           <TopBackButton
  //             onPress={() => navigation.goBack()}
  //             style={styles.TopBackButton}
  //           />
  //         </View>
  //         <View style={styles.headerIconContainer}>
  //           <Icon icon={faSearch} size={ms(22)} style={styles.searchIcon} />
  //           <Icon icon={faBell} size={ms(22)} style={styles.bellIcon} />
  //         </View>
  //       </View>
  //       <View style={styles.userContainer}>
  //         <View style={styles.userImageContainer}>
  //           <Image
  //             source={{
  //               uri: Data.profilePic,
  //             }}
  //             style={styles.userImage}
  //           />
  //           <View style={styles.userNameTxtContainer}>
  //             <Text style={styles.fullnameTxt}> {Data.name} </Text>
  //             <Text style={styles.usernameTxt}> {Data.userName} </Text>
  //           </View>
  //         </View>
  //         <View>
  //           <Icon icon={faEllipsis} size={ms(16)} style={styles.userIcon} />
  //         </View>
  //       </View>
  //       <HorizontalLine />

  //       <View style={styles.messageBody}>
  //         <FlatList
  //           data={Data.messaging.conversation}
  //           keyExtractor={item => item.messageId}
  //           contentContainerStyle={styles.contentContainerStyle}
  //           initialScrollIndex={Data.messaging.conversation.length - 1}
  //           renderItem={({ item }) => (
  //             <View style={styles.messgaeBodyContainer}>
  //               {/* only Text sending */}

  //               {item.sendingTxt.length > 0 ? (
  //                 <View style={styles.messageContainer}>
  //                   <TouchableOpacity
  //                     style={styles.messageTxtContainer}
  //                     onLongPress={() => setOpenCrud(true)}
  //                   >
  //                     <Text style={styles.messageTxt}>{item.sendingTxt} </Text>
  //                   </TouchableOpacity>
  //                   <View>
  //                     <Image
  //                       source={{
  //                         uri: Data.messaging.profilePic,
  //                       }}
  //                       style={styles.messageWithImage}
  //                     />
  //                   </View>
  //                 </View>
  //               ) : null}

  //               {/*  only images sending */}

  //               {item.sendingImages.length > 0 ? (
  //                 <View>
  //                   {item.sendingImages.length <= 3 ? (
  //                     <View style={styles.imageContainer}>
  //                       {item?.sendingImages?.map(data => (
  //                         <TouchableOpacity
  //                           style={styles.touchContainer}
  //                           key={data.id}
  //                           onPress={() => {
  //                             setShowImageView(true),
  //                               setFeedImages(item.sendingImages);
  //                           }}
  //                         >
  //                           <Image
  //                             source={{
  //                               uri: data.url,
  //                             }}
  //                             style={
  //                               item.sendingImages.length == 1
  //                                 ? [styles.image, styles.image1]
  //                                 : item.sendingImages.length == 2
  //                                   ? [styles.image, styles.image2]
  //                                   : [styles.image, styles.image3]
  //                             }
  //                           />
  //                         </TouchableOpacity>
  //                       ))}
  //                     </View>
  //                   ) : item.sendingImages.length > 3 ? (
  //                     <View style={styles.imageContainer}>
  //                       {item?.sendingImages?.map(data =>
  //                         data.id <= 2 ? (
  //                           <TouchableOpacity
  //                             style={styles.touchContainer}
  //                             key={data.id}
  //                             onPress={() => {
  //                               setShowImageView(true),
  //                                 setFeedImages(item.sendingImages);
  //                             }}
  //                           >
  //                             <Image
  //                               source={{
  //                                 uri: data.url,
  //                               }}
  //                               key={data.id}
  //                               style={[styles.image, styles.image3]}
  //                             />
  //                           </TouchableOpacity>
  //                         ) : data.id == 3 ? (
  //                           <TouchableOpacity
  //                             style={styles.touchContainer}
  //                             key={data.id}
  //                             onPress={() => {
  //                               setShowImageView(true),
  //                                 setFeedImages(item.sendingImages);
  //                             }}
  //                           >
  //                             <ImageBackground
  //                               source={{
  //                                 uri: data.url,
  //                               }}
  //                               key={data.id}
  //                               style={[styles.image, styles.moreImage]}
  //                             >
  //                               <Text style={styles.sendingImagesText}>
  //                                 {strings.message.plus}
  //                                 {item.sendingImages.length - 2}
  //                               </Text>
  //                             </ImageBackground>
  //                           </TouchableOpacity>
  //                         ) : null
  //                       )}
  //                     </View>
  //                   ) : null}
  //                   <View>
  //                     <Image
  //                       source={{
  //                         uri: Data.messaging.profilePic,
  //                       }}
  //                       style={styles.messageWithImage}
  //                     />
  //                   </View>
  //                 </View>
  //               ) : null}

  //               {item.replyingTxt.length > 0 ? (
  //                 <View style={styles.replyContainer}>
  //                   <Text style={[styles.messageTxt, styles.messageTxtBlack]}>
  //                     {item.replyingTxt}
  //                   </Text>
  //                 </View>
  //               ) : null}
  //             </View>
  //           )}
  //         />
  //         <View>
  //           {isImageList == false ? null : FileUpload(imageArray)}
  //           <View style={styles.txtInputContainer}>
  //             <TextInput
  //               placeholder={strings.message.typeYourmessageHere}
  //               style={styles.inputBox}
  //             ></TextInput>
  //             <View style={styles.inputBoxIconContainer}>
  //               <TouchableOpacity
  //                 style={[styles.boxIcon, styles.inputBoxIconColor]}
  //                 onPress={UploadImages}
  //               >
  //                 <FontAwesomeIcon
  //                   icon={faImage}
  //                   size={ms(16)}
  //                   color={theme.light.colors.success}
  //                 />
  //               </TouchableOpacity>
  //               <TouchableOpacity style={[styles.boxIcon, styles.sendBoxIcon]}>
  //                 <FontAwesomeIcon
  //                   icon={faPaperPlaneTop}
  //                   size={ms(16)}
  //                   color={theme.light.colors.primary}
  //                 />
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </View>
  //       </View>

  //       {/*  image view modal */}
  //       {showImageView && (
  //         <AppImageViewer
  //           visible={showImageView}
  //           setVisible={() => setShowImageView(false)}
  //           images={feedImages}
  //         />
  //       )}

  //       {openCrud && (
  //         <ModalDown open={openCrud} setOpen={setOpenCrud}>
  //           <ModalList
  //             title={strings.message.archive}
  //             icon={faBoxArchive}
  //             iconColor={theme.light.colors.primary}
  //             iconBg={theme.light.colors.primaryBgLight}
  //           />
  //           <ModalList
  //             title={strings.message.snoozeNotification}
  //             icon={faBellSlash}
  //             iconColor={theme.light.colors.info}
  //             iconBg={theme.light.colors.infoBgLight}
  //           />
  //           <ModalList
  //             title={strings.message.snoozeNotification}
  //             icon={faTrash}
  //             iconColor={theme.light.colors.error}
  //             iconBg={theme.light.colors.infoBgLight}
  //           />
  //           <HorizontalLine
  //             color={theme.light.colors.infoBgLight}
  //             paddingTop={15}
  //             paddingBottom={8}
  //           />
  //           <ModalList
  //             title={strings.operations.report}
  //             icon={faFlag}
  //             iconColor={theme.light.colors.secondary}
  //             iconBg={theme.light.colors.infoBgLight}
  //             onPress={() => {
  //               // setOpenReport(true)
  //               // setOpen(false)
  //             }}
  //           />
  //           <ModalList
  //             title={strings.operations.block + strings.home.DummyUser}
  //             icon={faXmark}
  //             iconColor={theme.light.colors.secondary}
  //             iconBg={theme.light.colors.infoBgLight}
  //           />
  //         </ModalDown>
  //       )}
  //       {/* </View> */}
  //     </SafeAreaView>
  //   );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: ms(10),
  },
  headerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TopBackButton: { paddingLeft: ms(10) },
  bellIcon: {
    marginRight: ms(9),
  },
  searchIcon: {
    marginRight: ms(12), //
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(9),
    paddingRight: ms(12),
  },
  userImageContainer: { flexDirection: 'row' },
  sendingImagesText: {
    color: theme.light.colors.white,
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(24, 0.3),
    width: '100%',
    padding: 35,
  },
  userImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
  },
  contentContainerStyle: { paddingBottom: ms(50) },
  userIcon: {
    marginTop: vs(18),
  },
  userNameTxtContainer: {
    padding: ms(2),
    paddingLeft: ms(5),
  },
  fullnameTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    color: theme.light.colors.black,
  },
  usernameTxt: {
    fontFamily: FontFamily.Recoleta_regular,
    fontSize: ms(14, 0.3),
  },
  messageBody: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
  },
  messgaeBodyContainer: { margin: ms(10) },
  messageContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',

  },
  messageTxtContainer: {
    backgroundColor: theme.light.colors.primaryBgDarkest,
    borderRadius: 10,
    padding: ms(10),
  },
  messageTxt: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(16, 0.3),
    color: theme.light.colors.white,
  },
  messageTxtBlack: { color: theme.light.colors.black },
  messageWithImage: {
    height: ms(40),
    width: ms(40),
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    right: ms(3),
  },
  replyContainer: {
    backgroundColor: theme.light.colors.white,
    borderRadius: 10,
    // marginTop: vs(10),
    width: '90%',
    padding: ms(8),
    marginLeft: '10%',
  },
  txtInputContainer: {
    backgroundColor: theme.light.colors.white,
    justifyContent: 'center',
    width: '100%',
    height: 60,
    borderTopWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
  },
  inputBox: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(16, 0.4),
    paddingRight: ms(90),
    paddingLeft: ms(9),
  },
  inputBoxIconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
    // position: 'absolute',
    // right: ms(8),
    // top: ms(3),
  },
  boxIcon: {
    margin: ms(5),
    borderRadius: 100,
    padding: ms(8),
  },
  inputBoxIconColor: { backgroundColor: theme.light.colors.successBgLight },
  sendBoxIcon: { backgroundColor: theme.light.colors.primaryBgLight },

  //single image container

  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(-5),
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(8),
  },
  image: {
    flex: 1,
    width: '85%',
    height: ms(200),
    borderRadius: 10,
    // marginTop: ms(10),
    marginRight: ms(10),
    // resizeMode: 'contain',
  },
  image1: {
    height: ms(200),
  },
  image2: {
    height: ms(140),
  },
  image3: {
    height: ms(100),
  },
  moreImage: {
    height: ms(100),
    backgroundColor: theme.light.colors.hyperlink,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  //BottomLAyout of file contant

  BottomContainer: {
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
    backgroundColor: theme.light.colors.white,
  },
  BottomFileContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    // marginBottom: vs(50),
    paddingTop: ms(10),
    position: 'relative',
  },
  fileSpacing: {
    padding: 10,
  },
  FileContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginLeft: ms(10),
    marginRight: ms(15),
    height: ms(110),
    alignItems: 'center',
  },
  thumbnail: {
    flex: 1,
    maxWidth: ms(80),
    minWidth: ms(80),
    height: vs(80),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.light.colors.infoBgLight,
    backgroundColor: theme.light.colors.inputFiled,
    // resizeMode: 'contain',
  },

  // - circle

  minus: {
    width: ms(30),
    height: ms(30),
    backgroundColor: theme.light.colors.userBackgroundColor,
    borderRadius: 50,
    position: 'absolute',
    marginLeft: ms(65),
    top: 0,
  },
  minusTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    color: theme.light.colors.primary,
    fontSize: ms(23, 0.3),
    textAlign: 'center',
  },
});
