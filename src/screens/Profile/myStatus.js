import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { theme } from '@/theme';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import {
  ModalDown,
  ModalList,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  HorizontalLine,
  AppImageViewer,
} from '@/components';
import { ms } from 'react-native-size-matters';
import { strings } from '@/localization';
import { Data } from './ProfileData/myStatusData';
import { UserController } from '@/controllers';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { FontFamily } from '@/theme/Fonts';

export default function MyStatus() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(getUser);
  const [showImageView, setShowImageView] = useState(false);
  const [feedImages, setFeedImages] = useState([]);
  const [userId, setUser] = useState("ce656365-b90f-4b5f-aab6-b436051171f5");

  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    getUserPostById(user?.id);
  }, []);

  const getUserPostById = async (id) => {
    const data = await UserController.postByUserId(id);
    setUserPost(data.data);
    console.log("data", id);
  }
  let counter = 1;
  return (
    <View>
      <FlatList
        data={userPost}
        key={props => props.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Card>
              <CardHeader
                fullName={user?.fullName}
                userName={user?.username}
                profilePic={user?.profilePic}
                time={item.created_at}
              />
              <CardBody text={item.postBody} />
              {/* images */}
              {/* <View style={styles.imageContainer}>
                {item?.postImg?.map(data => (
                  counter = counter + 1,
                  <TouchableOpacity
                    key={counter}
                    style={styles.touchContainer}
                    onPress={() => {
                      setShowImageView(true),
                        setFeedImages(item.postImg);
                    }}
                  >
                    <Image
                      source={{
                        uri: data,
                      }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                ))}
              </View> */}
              {item.postImg.length <= 2 ? (
                <View style={styles.imageContainer}>
                  {item?.postImg?.map(data => (
                    counter = counter + 1,
                    <TouchableOpacity
                      key={counter}
                      style={styles.touchContainer}
                      onPress={() => {
                        setShowImageView(true),
                          setFeedImages(item.postImg)
                      }}
                    >
                      <Image
                        source={{
                          uri: data,
                        }}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : item.postImg.length > 2 ? (
                counter = 1,
                <View style={styles.imageContainer}>
                  {item?.postImg?.map(data =>
                    counter == 1 ? (
                      counter = counter + 1,
                      <TouchableOpacity
                        key={counter}
                        style={styles.touchContainer}
                        onPress={() => {
                          setShowImageView(true),
                            setFeedImages(item.postImg);
                          // console.log(feedImages)
                        }}
                      >
                        <Image
                          source={{
                            uri: data,
                          }}
                          key={counter}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                    ) : counter == 2 ? (
                      counter = counter + 1,
                      <TouchableOpacity
                        key={counter}
                        style={styles.touchContainer}
                        onPress={() => {
                          setShowImageView(true),
                            setFeedImages(item.postImg);
                        }}
                      >
                        <ImageBackground
                          source={{
                            uri: data,
                          }}
                          key={counter}
                          style={[styles.image, styles.moreImage]}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setShowImageView(true),
                                setFeedImages(item.postImg);
                            }}
                          >
                            <Text style={styles.extraImage}>
                              {strings.message.plus}
                              {item.postImg.length - 1}
                            </Text>
                          </TouchableOpacity>
                        </ImageBackground>
                      </TouchableOpacity>
                    ) : null
                  )}
                </View>
              ) : null}
              <CardFooter
                likeCount={10}
                disLikeCount={1}
                commentCount={5}
                // likeCount={item.like}
                // likePress = {()=> Alert.alert("like")}
                // disLikeCount={item.disLike}
                // disLikePress = {()=> Alert.alert("dislike")}
                // commentCount={item.comment}
                // commentPress = {()=> Alert.alert("Comment")}
                // sharePress = {()=> Alert.alert("share")}
                morePress={() => setOpen(true)}
              />
            </Card>
          </View>
        )}
      />

      {showImageView && (
        <AppImageViewer
          visible={showImageView}
          setVisible={() => setShowImageView(false)}
          images={feedImages}
        />
      )}
      {/* {userPost.map((item, index) => {
        console.log(item.data.id)
      })} */}

      {open && (
        <ModalDown open={open} setOpen={setOpen}>
          <ModalList
            title={strings.profile.editPost}
            icon={faPen}
            iconBg={theme.light.colors.infoBgLight}
            iconColor={theme.light.colors.info}
          />
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={15}
            paddingBottom={8}
          />
          <ModalList
            title={strings.operations.delete}
            icon={faTrash}
            iconBg={theme.light.colors.infoBgLight}
            iconColor={theme.light.colors.secondary}
          />
        </ModalDown>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: { margin: ms(10) },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(-5),
  },
  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    // paddingRight: ms(40),
    justifyContent: 'space-between',
    marginRight: ms(-5),
  },
  image: {
    flex: 1,
    width: '85%',
    height: ms(200),
    marginRight: ms(10),
  },
  moreImage: {
    height: ms(200),
    backgroundColor: theme.light.colors.hyperlink,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  extraImage: {
    color: theme.light.colors.white,
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(24, 0.3),
    width: '100%',
    padding: 35,
  },
});
