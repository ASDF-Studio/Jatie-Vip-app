import React from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, Text, Platform } from 'react-native';
import { TextField } from '@/components';
import { theme } from '@/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useMentions, TriggersConfig } from 'react-native-controlled-mentions'
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { faPaperPlaneTop } from '@fortawesome/pro-regular-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { commentOnPost, editComment, getAllPostSuccess, searchUserbyUserName, TYPES } from '@/actions/PostActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Loader } from './Loader';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { getAllPostData } from '@/selectors/PostSelectors';
import { FontFamily } from '@/theme/Fonts';

export const CommentInput = React.forwardRef((props, ref,) => {
  const dispatch = useDispatch()
  const ALLPOST = useSelector(getAllPostData)
  const [comment, setComment] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [searchedKeyword, setSearchedKeyword] = useState('')
  const searchUserSelector = useSelector(getAllPostData)
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.COMMENT_ON_POST], state)
  );
  useEffect(() => {
    dispatch(searchUserbyUserName(searchedKeyword))
  }, [searchedKeyword])
  // Create config as static object out of function component
  // Or memoize it inside FC using `useMemo`
  const triggersConfig: TriggersConfig<'mention'> = {
    mention: {
      // Symbol that will trigger keyword change
      trigger: '@',

      // Style which mention will be highlighted in the `TextInput`
      textStyle: { fontFamily: FontFamily.BrandonGrotesque_medium, color: theme.light.colors.mention, },

    },
  };

  const { textInputProps, triggers, mentionState } = useMentions({
    value: comment,
    onChange: setComment,

    // Add the config here
    triggersConfig,
  });

  const Suggestions: FC<SuggestionsProvidedProps> = ({
    keyword,
    onSelect
  }) => {

    if (keyword == null) {
      return null;
    }

    setSearchedKeyword(keyword);

    return (
      <View style={{ height: 200 }}>
        <ScrollView >
          {searchUserSelector?.searchedUsers?.filter(one => one.username.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
            .map(one => (
              <Pressable
                key={one.id}
                onPress={() => {
                  const finalData = {
                    id: one.id,
                    name: one.username,
                  }
                  onSelect(finalData)
                }}
                style={{ padding: 12 }}
              >
                <Text>{one.username}</Text>
              </Pressable>
            ))
          }
        </ScrollView>
      </View>

    );
  };

  const onComment = () => {
    if (comment == "") {
      showMessage({
        message: strings.home.commentvalid,
        backgroundColor: theme.light.colors.activeTabIcon
      });
    } else {
      setComment('')
      if (!isEdit) {
        var arr = ALLPOST
        dispatch(commentOnPost(props.postId, props.userId, comment.trim(), props.commentOwnerId))
        props.updateParentState()
        var count = arr[props.postIndex]?.comments_aggregate?.aggregate?.count
        arr[props.postIndex].comments_aggregate.aggregate.count = count + 1;
        const ob = {
          data: arr
        }
        dispatch(getAllPostSuccess(ob))
      } else {
        setIsEdit(false)
        dispatch(editComment(props.commentId, props.userId, comment.trim(), props.commentIndex))
        props.updateParentState()
      }
    }
  }
  React.useImperativeHandle(ref, () => ({
    childFunction,
    resetValue,
    childReplyFunction
  }));
  const childFunction = () => {
    setIsEdit(true)
    setComment(props.commentData)
  }
  const childReplyFunction = (value) => {
    setComment('')
    setComment(value)
  }
  const resetValue = () => {
    setIsEdit(false)
    setComment('')
  }
  return (
    <View style={styles.container}>
      <Suggestions {...triggers.mention} />
      <TextField
        // onFocus={props.scrollRef}
        multiline={Platform.OS == "ios" ? true : true}
        style={styles.textFiled}
        placeholder={strings.home.typeComment}
        {...textInputProps}
      />
      {isLoading ? (<Loader
        visible={true}
        size={"small"}
        style={styles.iconContainer}
      />)
        :
        (comment == "" ? <></> :
          <TouchableOpacity style={styles.iconContainer}
            onPress={onComment}
          >
            <FontAwesomeIcon
              icon={faPaperPlaneTop}
              size={18}
              color={theme.light.colors.primary}
            />
          </TouchableOpacity>)
      }
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: theme.light.colors.infoBgLight,
    width: '100%',
  },
  textFiled: {
    backgroundColor: theme.light.colors.white,
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
