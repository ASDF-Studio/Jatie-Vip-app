import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  faSearch,
  faCrown,
  faMessage,
  faUserPlus,
  faEllipsis,
  faFlag,
  faXmark,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TextStyles, theme } from '@/theme';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HeaderTab,
  Icon,
  ModalDown,
  ModalList,
} from '@/components';
import { strings } from '@/localization';
import { HorizontalLine } from '@/components';
import { ms, vs } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants';
import { Data, demo } from './ProfileData/userProfileData';

export default function UserProfile({ navigation }) {
  const [openMore, setOpenMore] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={{
              uri: demo.headerImage,
            }}
          />
          <View style={styles.profileLogoContainer}>
            <FontAwesomeIcon
              icon={faCrown}
              color={theme.light.colors.primary}
              size={20}
            />
          </View>
          <View>
            <Text style={[TextStyles.header, styles.headerDesign]}>
              {' '}
              {demo.name}
            </Text>
            <Text style={TextStyles.label}> {demo.userName}</Text>
          </View>
        </View>
        <View style={styles.iconContiner}>
          <Icon
            icon={faSearch}
            size={20}
            style={styles.icon}
            onPress={() => navigation.navigate(NAVIGATION.search)}
          />
          <Icon
            icon={faBell}
            size={20}
            style={styles.icon}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
          />
        </View>
      </View>
      <HeaderTab
        title1={strings.profile.followers}
        count1={10}
        // onPress1 = {()=>Alert.alert('press 1')}
        title2={strings.profile.following}
        count2={20}
        // onPress2 = {()=>Alert.alert('press 2')}
      />
      <HorizontalLine
        color={theme.light.colors.infoBgLight}
        paddingTop={8}
        paddingBottom={4}
      />

      <View style={styles.messageHeader}>
        <View style={styles.messageLeft}>
          <TouchableOpacity style={[styles.IconBox, styles.IconBoxDesign]}>
            <FontAwesomeIcon
              icon={faMessage}
              color={theme.light.colors.success}
            />
            <Text style={[TextStyles.label, styles.IconBoxColor]}>
              {' '}
              {strings.profile.message}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.IconBox}>
            <FontAwesomeIcon
              icon={faUserPlus}
              color={theme.light.colors.primary}
            />
            <Text style={[TextStyles.label, styles.labelColor]}>
              {' '}
              {strings.profile.followers}{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setOpenMore(true)}
          style={styles.moreIconContainer}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </TouchableOpacity>
      </View>
      <HorizontalLine />
      <FlatList
        data={Data}
        key={props => props.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Card>
              <CardHeader
                fullName={item.fullName}
                userName={item.userName}
                profilePic={item.profilePic}
                time={item.time}
              />
              <CardBody text={item.text} />
              <CardFooter
                likeCount={item.like}
                // likePress = {()=> Alert.alert("like")}
                disLikeCount={item.disLike}
                // disLikePress = {()=> Alert.alert("dislike")}
                commentCount={item.comment}
                // commentPress = {()=> Alert.alert("Comment")}
                // sharePress = {()=> Alert.alert("share")}
                morePress={() => setOpenEdit(true)}
              />
            </Card>
          </View>
        )}
      />
      {openMore && (
        <ModalDown open={openMore} setOpen={setOpenMore}>
          <ModalList
            title={strings.operations.follow}
            icon={faUserPlus}
            iconColor={theme.light.colors.primary}
            iconBg={theme.light.colors.primaryBgLight}
          />
          <ModalList
            title={strings.operations.sendPrivateMessage}
            icon={faMessage}
            iconColor={theme.light.colors.success}
            iconBg={theme.light.colors.successBgLight}
            // onPress = {()=> Alert.alert("working")}
          />
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={15}
            paddingBottom={8}
          />
          <ModalList
            title={strings.operations.report}
            icon={faFlag}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
          />
          <ModalList
            title={strings.operations.block}
            icon={faXmark}
            iconColor={theme.light.colors.secondary}
            iconBg={theme.light.colors.infoBgLight}
          />
        </ModalDown>
      )}
      {openEdit && (
        <ModalDown open={openEdit} setOpen={setOpenEdit}>
          <ModalList
            title={strings.operations.edit}
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
            title={strings.operations.remove}
            icon={faTrash}
            iconBg={theme.light.colors.infoBgLight}
            iconColor={theme.light.colors.secondary}
          />
        </ModalDown>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
  },
  headerImageContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  headerImage: {
    width: ms(50),
    height: ms(50),
    borderWidth: 2,
    borderRadius: 75,
  },
  cardContainer: { margin: ms(10) },
  iconContiner: {
    flexDirection: 'row',
  },
  icon: {
    margin: ms(10),
  },
  profileLogoContainer: {
    height: ms(30),
    width: ms(30),
    backgroundColor: theme.light.colors.primaryBg,
    position: 'absolute',
    bottom: vs(-18),
    left: ms(10),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerDesign: { color: theme.light.colors.text },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(10),
  },
  messageLeft: {
    flexDirection: 'row',
  },
  messageRight: {},
  IconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: theme.light.colors.primaryBgLight,
    padding: ms(10),
    borderRadius: 10,
  },
  IconBoxDesign: {
    backgroundColor: theme.light.colors.successBgLight,
    marginRight: ms(10),
  },
  IconBoxColor: { color: theme.light.colors.success },
  labelColor: { color: theme.light.colors.primary },
  moreIconContainer: {
    height: ms(40),
    width: ms(40),
    backgroundColor: theme.light.colors.infoBg,
    padding: ms(10),
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedContainer: {
    flex: 1,
    backgroundColor: theme.light.colors.primaryBgLight,
    margin: ms(12),
  },
});
