import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
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
import { commentOnPost, editComment, getCommentsByPostId, TYPES } from '@/actions/PostActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Loader } from './Loader';
import { useEffect } from 'react';
export const CommentInput = React.forwardRef((props, ref,) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('');
  const [postId, setPostId] = useState('');
  const [userId, setUserId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState('');


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
      console.log("ISEDIT__", props.isEdit, "COMMEEEE", props.commentData)
      setComment('')

      if (!isEdit) {
        dispatch(commentOnPost(props.postId, props.userId, comment.trim()))
        props.updateParentState()
      } else {
        setIsEdit(false)
        dispatch(editComment(props.commentId, props.userId, comment.trim(), props.commentIndex))
        props.updateParentState()
      }
    }
  }
  React.useImperativeHandle(ref, () => ({
    childFunction,
    resetValue
  }));
  const childFunction = () => {
    setIsEdit(true)
    setComment(props.commentData)
  }
  const resetValue = () => {
    setIsEdit(false)
    setComment('')
  }
  return (
    <View style={styles.container}>
      <TextField
        // onFocus={props.scrollRef}
        multiline={Platform.OS == "ios" ? false : true}
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
})

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
