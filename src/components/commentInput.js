import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Pressable, Text, Button } from 'react-native';
import { TextField } from '@/components';
import { theme } from '@/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useMentions, TriggersConfig, generateValueFromMentionStateAndChangedText } from 'react-native-controlled-mentions'
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
import { ScrollView } from 'react-native-gesture-handler';
export const CommentInput = React.forwardRef((props, ref,) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('');
  const [postId, setPostId] = useState('');
  const [userId, setUserId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [textValue, setTextValue] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.COMMENT_ON_POST], state)
  );

  const suggestions = [
    {
      id: '001',
      name: 'John'
    },
    {
      id: '002',
      name: 'Alex'
    },
    {
      id: '003',
      name: 'David'
    },
    {
      id: '004',
      name: 'Mary'
    },
    {
      id: '005',
      name: 'Michael'
    },
    {
      id: '006',
      name: 'Oliver'
    },
    {
      id: '007',
      name: 'Samantha'
    },
    {
      id: '008',
      name: 'Emily'
    },
    {
      id: '009',
      name: 'Jessica'
    },
    {
      id: '010',
      name: 'Nicole'
    },
  ];

  // Create config as static object out of function component
  // Or memoize it inside FC using `useMemo`
  const triggersConfig: TriggersConfig<'mention'> = {
    mention: {
      // Symbol that will trigger keyword change
      trigger: '@',

      // Style which mention will be highlighted in the `TextInput`
      textStyle: { fontWeight: 'bold', color: 'blue' },
    },
    // How to parse regex match and get required for data for internal logic
    getTriggerData: (match) => {
      const [name, id] = match.split(':');

      return ({
        original: match,
        trigger: '##',
        name,
        id,
      });
    },
    // How to generate internal mention value from selected suggestion
    getTriggerValue: (suggestion) => `${suggestion.name}:${suggestion.id}`,

    // How the highlighted mention will appear in TextInput for user
    getPlainString: (triggerData) => triggerData.name,
  };

  const newReg = (KinputString) => {
    const inputString = "Hi {@}[Alex](003) how are you is it working Ok for you?";
    const nameRegex = /\{[@\w]+\}\[(\w+)\]\((\d+)\)/;
    const outputString = inputString.replace(nameRegex, "Hi @$1");
    const idMatch = inputString.match(nameRegex);
    const id = idMatch ? idMatch[2] : null;
    return id
  }

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

    return (
      <View style={{ height: 200 }}>
        <ScrollView >
          {suggestions
            .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
            .map(one => (
              <Pressable
                key={one.id}
                onPress={() => onSelect(one)}
                style={{ padding: 12 }}
              >
                <Text>{one.name}</Text>
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
    console.log("props=-=-=-=-=-=-=>", JSON.stringify(props));
    setIsEdit(true)
    setComment(props.commentData)
  }
  const resetValue = () => {
    setIsEdit(false)
    setComment('')
  }
  return (
    <View style={styles.container}>
      <Suggestions {...triggers.mention} />
      <TextField
        multiline={true}
        style={styles.textFiled}
        // value={comment}
        // onChange={setComment}
        placeholder={strings.home.typeComment}
        {...textInputProps}
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
