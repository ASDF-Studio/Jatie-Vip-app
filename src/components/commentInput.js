import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import { TextField } from '@/components';
import { theme } from '@/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useMentions, TriggersConfig } from 'react-native-controlled-mentions';
import { ms, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import { faPaperPlaneTop } from '@fortawesome/pro-regular-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  commentOnPost,
  editComment,
  getAllPostSuccess,
  getPostByIdSuccess,
  searchAllPostSuccess,
  searchUserbyUserName,
  TYPES,
} from '@/actions/PostActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Loader } from './Loader';

import {
  getAllPostData,
  getPostByIdData,
  getSearchData,
} from '@/selectors/PostSelectors';
import { showMessage } from 'react-native-flash-message';
import { FontFamily } from '@/theme/Fonts';
import { POST_TYPE } from '@/constants/enums';
import { getUser } from '@/selectors/UserSelectors';
import { getAllPostByUserIdSuccess } from '@/actions/UserActions';
import { customShowMessage } from '@/utils';

export const CommentInput = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const ALLPOST = useSelector(getAllPostData);
  const [comment, setComment] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [searchedKeyword, setSearchedKeyword] = useState('');
  const searchUserSelector = useSelector(state => state.post);
  const SEARCH_DATA = useSelector(getSearchData);
  const singlePost = useSelector(getPostByIdData);
  const user = useSelector(getUser);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.COMMENT_ON_POST], state)
  );
  useEffect(() => {
    dispatch(searchUserbyUserName(searchedKeyword, user.id));
  }, [searchedKeyword]);
  // Create config as static object out of function component
  // Or memoize it inside FC using `useMemo`
  const triggersConfig = {
    mention: {
      // Symbol that will trigger keyword change
      trigger: '@',

      // Style which mention will be highlighted in the `TextInput`
      textStyle: {
        fontFamily: FontFamily.BrandonGrotesque_medium,
        color: theme.light.colors.mention,
      },
    },
  };

  const { textInputProps, triggers, mentionState } = useMentions({
    value: comment,
    onChange: setComment,
    // Add the config here
    triggersConfig,
  });

  const Suggestions: FC<SuggestionsProvidedProps> = ({ keyword, onSelect }) => {
    if (keyword == null) {
      return null;
    }

    setSearchedKeyword(keyword);

    return (
      <View style={{ height: 200 }}>
        <ScrollView>
          {searchUserSelector?.searchedUsers
            ?.filter(one =>
              one.username
                .toLocaleLowerCase()
                .includes(keyword.toLocaleLowerCase())
            )
            .map(one => (
              <Pressable
                key={one.id}
                onPress={() => {
                  const finalData = {
                    id: one.id,
                    name: one.username,
                  };
                  onSelect({ name: one.username });
                }}
                style={{ padding: 12 }}
              >
                <Text>{one.username}</Text>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    );
  };

  const onCommentSearch = () => {
    if (comment == '') {
      customShowMessage({
        message: strings.home.commentvalid,
        type: 'danger',
      });
    } else {
      setComment('');
      if (!isEdit) {
        var arr = SEARCH_DATA;
        dispatch(
          commentOnPost(
            props.postId,
            props.userId,
            comment.trim(),
            props.commentOwnerId
          )
        );
        props.updateParentState();
        var count = arr[props.postIndex]?.comments_aggregate?.aggregate?.count;
        arr[props.postIndex].comments_aggregate.aggregate.count = count + 1;

        dispatch(searchAllPostSuccess([...arr]));
      } else {
        setIsEdit(false);
        dispatch(
          editComment(
            props.commentId,
            props.userId,
            comment.trim(),
            props.commentIndex
          )
        );
        props.updateParentState();
      }
    }
  };

  const onUserProfileComment = () => {
    if (comment == '') {
      customShowMessage({
        message: strings.home.commentvalid,
        type: 'danger',
      });
    } else {
      setComment('');
      var arr = user.getAllPostsByUserId;
      if (!isEdit) {
        dispatch(
          commentOnPost(
            props.postId,
            props.userId,
            comment.trim(),
            props.commentOwnerId
          )
        );
        props.updateParentState();
        // console.log(
        //   '=============================================== ',
        //   arr,
        //   props.postIndex,
        //   '   =============================================== '
        // );
        const count = arr[props.postIndex].comments_aggregate.aggregate.count;
        arr[props.postIndex].comments_aggregate.aggregate.count = count + 1;
        // console.log(count);
        dispatch(getAllPostByUserIdSuccess(arr));
      } else {
        setIsEdit(false);
        dispatch(
          editComment(
            props.commentId,
            props.userId,
            comment.trim(),
            props.commentIndex
          )
        );
        props.updateParentState();
      }
    }
  };

  const onSinglepostComment = () => {
    if (comment == '') {
      customShowMessage({
        message: strings.home.commentvalid,
        type: 'danger',
      });
    } else {
      setComment('');
      if (!isEdit) {
        dispatch(
          commentOnPost(
            props.postId,
            props.userId,
            comment.trim(),
            props.commentOwnerId
          )
        );
        props.updateParentState();
        const count = singlePost.comments_aggregate.aggregate.count;
        singlePost.comments_aggregate.aggregate.count = count + 1;
        dispatch(getPostByIdSuccess({ ...singlePost }));
      } else {
        setIsEdit(false);
        dispatch(
          editComment(
            props.commentId,
            props.userId,
            comment.trim(),
            props.commentIndex
          )
        );
        props.updateParentState();
      }
    }
  };

  const onComment = () => {
    if (comment == '') {
      customShowMessage({
        message: strings.home.commentvalid,
        type: 'danger',
      });
    } else {
      setComment('');
      if (!isEdit) {
        var arr = ALLPOST;
        dispatch(
          commentOnPost(
            props.postId,
            props.userId,
            comment.trim(),
            props.commentOwnerId
          )
        );
        props.updateParentState();
        if (arr) {
          var count =
            arr[props.postIndex]?.comments_aggregate?.aggregate?.count;
          arr[props.postIndex].comments_aggregate.aggregate.count = count + 1;
          const ob = {
            data: arr,
          };
          dispatch(getAllPostSuccess(ob));
        }
      } else {
        setIsEdit(false);
        dispatch(
          editComment(
            props.commentId,
            props.userId,
            comment.trim(),
            props.commentIndex
          )
        );
        props.updateParentState();
      }
    }
  };
  React.useImperativeHandle(ref, () => ({
    childFunction,
    resetValue,
    childReplyFunction,
  }));
  const childFunction = () => {
    setIsEdit(true);
    setComment(props.commentData);
  };
  const childReplyFunction = value => {
    setComment('');
    setComment(value);
  };
  const resetValue = () => {
    setIsEdit(false);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Suggestions {...triggers.mention} />
      <TextField
        // onFocus={props.scrollRef}
        multiline={Platform.OS == 'ios' ? true : true}
        style={styles.textFiled}
        placeholder={strings.home.typeComment}
        {...textInputProps}
      />
      {isLoading ? (
        <Loader visible={true} size={'small'} style={styles.iconContainer} />
      ) : comment == '' ? (
        <></>
      ) : (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={
            props.type === POST_TYPE.SEARCH
              ? onCommentSearch
              : props.type === POST_TYPE.SINGLE_POST
              ? onSinglepostComment
              : props.type === POST_TYPE.USER_PROFILE
              ? onUserProfileComment
              : onComment
          }
        >
          <FontAwesomeIcon
            icon={faPaperPlaneTop}
            size={18}
            color={theme.light.colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

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
