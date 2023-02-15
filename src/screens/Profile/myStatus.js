import React, { useState } from 'react';
import { View, Alert, FlatList, StyleSheet } from 'react-native';
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
} from '@/components';
import { ms } from 'react-native-size-matters';
import { strings } from '@/localization';
import { Data } from './ProfileData/myStatusData';

export default function MyStatus() {
  const [open, setOpen] = useState(false);
  return (
    <View>
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
                morePress={() => setOpen(true)}
              />
            </Card>
          </View>
        )}
      />
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
});
