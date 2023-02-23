import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { TYPES } from '@/actions/UserActions';
import { Button, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/SignUp/SignUp.style';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { AuthHeader } from '@/components/AuthHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { navigationRef } from '@/navigation/RootNavigation';
import { NAVIGATION } from '@/constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { theme } from '@/theme';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [openGenderDropDown, setOpenGenderDropDown] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: 'Prefer not to say', value: 'Prefer not to say' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);

  const [openCountryDropDown, setOpenCountryDropDown] = useState(false);
  const [countryvalue, setCountryvalue] = useState(null);
  const [countryItems, setCountryItems] = useState([
    { label: 'United State', value: 'United State' },
    { label: 'United kingdom', value: 'United kingdom' },
    { label: 'Australia', value: 'Australia' },
    { label: 'Bangladesh', value: 'Bangladesh' },
    { label: 'India', value: 'India' },
    { label: 'China', value: 'China' },
    { label: 'Pakistan', value: 'Pakistan' },
    { label: 'UAE', value: 'UAE' },
    { label: 'Saudi Arabia', value: 'Saudi Arabia' },
    { label: 'Qatar', value: 'Qatar' },
    { label: 'Iran', value: 'Iran' },
    { label: 'Iraq', value: 'Iraq' },
  ]);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.LOGIN], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.LOGIN], state),
    shallowEqual
  );

  const handleSubmit = () => {
    navigationRef.navigate(NAVIGATION.addProfilePicture);
  };

  const onChange = selectedDate => {
    const formattedDate = moment(selectedDate).format('MMM DD, yyyy');

    console.log('selected date', formattedDate);
    setShow(false);
    setDate(formattedDate);
  };

  const showMode = currentMode => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    setShow(true);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <AuthHeader title={strings.SignUp.title} />
        <Text style={styles.subTitle}>{strings.SignUp.yourName}</Text>

        <TextField
          autoCapitalize="none"
          onChangeText={setName}
          placeholder={strings.SignUp.name}
          value={name}
          placeholderStyle={styles.dropdowntextstyle}
        />
        <Text style={styles.subTitle}>{strings.SignUp.email}</Text>

        <TextField
          autoCapitalize="none"
          onChangeText={setEmail}
          placeholder={strings.SignUp.emailPlaceHolder}
          value={email}
        />

        <Text style={styles.subTitle}>{strings.SignUp.birthday}</Text>

        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.showDatepicker}
        >
          <View pointerEvents="none" style={styles.calenderView}>
            <TextInput
              // value={date}
              placeholder={strings.SignUp.dobPlaceHolder}
              value={moment(date).format('MM-DD-YYYY')}
              style={styles.dobInput}
            />
            <View style={styles.calenderIcon}>
              <FontAwesomeIcon
                icon={faCalendar}
                color={theme.light.colors.info}
              />
            </View>
          </View>
        </TouchableOpacity>

        {show && (
          // <DateTimePicker
          //   value={new Date(date)}
          //   mode={mode}
          //   onChange={onChange}
          // />
          <DatePicker
            modal
            mode="date"
            open={show}
            // locale = "fr"
            date={date}
            onConfirm={date => {
              setShow(false);
              setDate(date);
            }}
            onCancel={() => {
              setShow(false);
            }}
            // onDateChange={onChange}
          />
        )}

        <Text style={styles.subTitle}>{strings.SignUp.gender}</Text>
        <DropDownPicker
          open={openGenderDropDown}
          value={genderValue}
          items={genderItems}
          setOpen={setOpenGenderDropDown}
          setValue={setGenderValue}
          setItems={setGenderItems}
          // style={styles.dropDownPicker}
          style={
            openGenderDropDown ? styles.openDropDown : styles.dropDownPicker
          }
          placeholder={strings.SignUp.genderPlaceHolder}
          placeholderStyle={styles.dropdowntextstyle}
          listMode="SCROLLVIEW"
          zIndex={3000}
          zIndexInverse={1000}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          TickIconComponent={() => (
            <FontAwesomeIcon
              icon={faCheck}
              color={theme.light.colors.primary}
            />
          )}
        />
        <Text style={styles.subTitle}>{strings.SignUp.country}</Text>

        <DropDownPicker
          open={openCountryDropDown}
          value={countryvalue}
          items={countryItems}
          setOpen={setOpenCountryDropDown}
          setValue={setCountryvalue}
          setItems={setCountryItems}
          // style={styles.dropDownPicker}
          style={
            openCountryDropDown ? styles.openDropDown : styles.dropDownPicker
          }
          placeholder={strings.SignUp.countryPlaceHolder}
          placeholderStyle={styles.dropdowntextstyle}
          listMode="SCROLLVIEW"
          zIndex={1000}
          zIndexInverse={3000}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          TickIconComponent={() => (
            <FontAwesomeIcon
              icon={faCheck}
              color={theme.light.colors.primary}
            />
          )}
        />
        <Button
          onPress={handleSubmit}
          style={styles.submitButton}
          title={isLoading ? strings.common.loading : strings.login.continue}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
