import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextField } from '@/components';
import { theme } from '@/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { FontFamily } from '@/theme/Fonts';
import { faPaperPlaneTop } from '@fortawesome/pro-regular-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { commentOnPost, TYPES } from '@/actions/PostActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Loader } from './Loader';
export const CommentInput = ({ postId, userId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('');
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.COMMENT_ON_POST], state)
  );
  const onComment = () => {
    if (comment == "") {
      showMessage({
        message: strings.home.commentvalid,
        backgroundColor: theme.light.colors.activeTabIcon
      });
    } else {
      setComment('')
      // dispatch(commentOnPostSuccess)
      dispatch(commentOnPost(postId, userId, comment))

    }
  }
  return (
    <View style={styles.container}>
      <TextField

        multiline={true}
        style={styles.textFiled}
        value={comment}
        onChangeText={setComment}
        placeholder={strings.home.typeComment}
      />

      {isLoading ? <Loader
        visible={true}
        size={"small"}
        style={styles.iconContainer}
      />
        :
        <TouchableOpacity style={styles.iconContainer}
          onPress={onComment}
        >
          <FontAwesomeIcon
            icon={faPaperPlaneTop}
            size={18}
            color={theme.light.colors.primary}
          />
        </TouchableOpacity>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
    width: '100%',
    // position: "absolute", bottom: 0
  },
  textFiled: {
    backgroundColor: theme.light.colors.white, //inputFiled
    paddingRight: ms(80),
    padding: ms(50),
  },
  iconContainer: {
    backgroundColor: theme.light.colors.primaryBgLight,
    borderRadius: 100,
    position: 'absolute',
    bottom: vs(18),
    right: ms(10),
    padding: ms(10),
  },
});
