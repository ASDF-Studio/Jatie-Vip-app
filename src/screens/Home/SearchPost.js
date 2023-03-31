import React from 'react';
import { strings } from '@/localization';
import { theme, TextStyles } from '@/theme';
import { ms } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants';
import { Text, View } from 'react-native';
import { Icon, TextField, TopBackButton } from '@/components';
import { faBell, faSearch } from '@fortawesome/pro-regular-svg-icons';
import { searchAllPost, searchAllPostSuccess } from '@/actions/PostActions';

const SearchPost = ({
  setSearchEnabled,
  dispatch,
  navigation,
  setsearchText,
  searchText,
  user,
  styles
}) => {
  return (
    <View
      style={styles.searchContainer}>
      <View style={styles.header}>
        <View style={styles.left}>
          <TopBackButton
            onPress={() => {
              setSearchEnabled(false);
              dispatch(searchAllPostSuccess([]));
            }}
            style={styles.TopBackButton}
          />
          <Text style={[TextStyles.header, styles.searchheaderText]}>
            {' '}
            {strings.exclusive.search}{' '}
          </Text>
        </View>
        <View style={styles.right}>
          <Icon
            icon={faBell}
            color={theme.light.colors.black}
            size={ms(20)}
            onPress={() => navigation.navigate(NAVIGATION.notification)}
            style={styles.bellIcon}
          />
        </View>
      </View>
      <View style={styles.searchBox}>
        <TextField
          style={styles.searchBoxTextFirld}
          placeholder={strings.home.searchposts}
          onChangeText={(text) => setsearchText(text)}
        />

        <Icon
          icon={faSearch}
          color={theme.light.colors.primary}
          size={ms(20)}
          style={styles.searchButton}
          onPress={() => {
            dispatch(searchAllPost(searchText, user?.id));
          }}
        />
      </View>
    </View>
  );
};

export default SearchPost;
