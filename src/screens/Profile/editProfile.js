import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import { theme, TextStyles } from '@/theme';
import { FontFamily } from '@/theme/Fonts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faClose, faPen } from '@fortawesome/free-solid-svg-icons';
import { Icon, HorizontalLine, PopUp, Button, CustomLoader } from '@/components';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { TopBackButton } from '@/components';
import { ms, s, vs } from 'react-native-size-matters';
import { strings } from '@/localization';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { showMessage } from 'react-native-flash-message';
import { updateProfile } from '@/actions/UserActions';
import { COUNTRY_LIST, NAVIGATION } from '@/constants';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/actions/UserActions';

export default function EditProfile({ navigation }) {
  const userNameInput_ref = useRef();
  const dispatch = useDispatch()
  const user = useSelector(getUser);
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [subscriptionPopup, setSubscriptionPopup] = useState(false);
  const [openReplace, setReplace] = useState(false);
  const [genderListOpen, setGenderListOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(user?.gender || '');
  const [userName, setUserName] = useState(user?.username || '')
  const [birthday, setBirthday] = useState('');

  const [formatedDate, setFormatedDate] = useState(moment(user?.dateOfBirth).format('MMM DD, yyyy') || '');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);
  const [locationListOpen, setLocationListOpen] = useState(false);
  const [locationValue, setLocationValue] = useState(user?.location || '');
  const [location, setLocation] = useState([
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AX', label: 'Åland Islands' },
    { value: 'AL', label: 'Albania' },
    { value: 'DZ', label: 'Algeria' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AD', label: 'Andorra' },
    { value: 'AO', label: 'Angola' },
    { value: 'AI', label: 'Anguilla' },
    { value: 'AQ', label: 'Antarctica' },
    { value: 'AG', label: 'Antigua and Barbuda' },
    { value: 'AR', label: 'Argentina' },
    { value: 'AM', label: 'Armenia' },
    { value: 'AW', label: 'Aruba' },
    { value: 'AU', label: 'Australia' },
    { value: 'AT', label: 'Austria' },
    { value: 'AZ', label: 'Azerbaijan' },
    { value: 'BS', label: 'Bahamas' },
    { value: 'BH', label: 'Bahrain' },
    { value: 'BD', label: 'Bangladesh' },
    { value: 'BB', label: 'Barbados' },
    { value: 'BY', label: 'Belarus' },
    { value: 'BE', label: 'Belgium' },
    { value: 'BZ', label: 'Belize' },
    { value: 'BJ', label: 'Benin' },
    { value: 'BM', label: 'Bermuda' },
    { value: 'BT', label: 'Bhutan' },
    { value: 'BO', label: 'Bolivia, Plurinational State of' },
    { value: 'BQ', label: 'Bonaire, Sint Eustatius and Saba' },
    { value: 'BA', label: 'Bosnia and Herzegovina' },
    { value: 'BW', label: 'Botswana' },
    { value: 'BV', label: 'Bouvet Island' },
    { value: 'BR', label: 'Brazil' },
    { value: 'IO', label: 'British Indian Ocean Territory' },
    { value: 'BN', label: 'Brunei Darussalam' },
    { value: 'BG', label: 'Bulgaria' },
    { value: 'BF', label: 'Burkina Faso' },
    { value: 'BI', label: 'Burundi' },
    { value: 'KH', label: 'Cambodia' },
    { value: 'CM', label: 'Cameroon' },
    { value: 'CA', label: 'Canada' },
    { value: 'CV', label: 'Cape Verde' },
    { value: 'KY', label: 'Cayman Islands' },
    { value: 'CF', label: 'Central African Republic' },
    { value: 'TD', label: 'Chad' },
    { value: 'CL', label: 'Chile' },
    { value: 'CN', label: 'China' },
    { value: 'CX', label: 'Christmas Island' },
    { value: 'CC', label: 'Cocos (Keeling) Islands' },
    { value: 'CO', label: 'Colombia' },
    { value: 'KM', label: 'Comoros' },
    { value: 'CG', label: 'Congo' },
    { value: 'CD', label: 'Congo, the Democratic Republic of the' },
    { value: 'CK', label: 'Cook Islands' },
    { value: 'CR', label: 'Costa Rica' },
    { value: 'CI', label: "Côte d'Ivoire" },
    { value: 'HR', label: 'Croatia' },
    { value: 'CU', label: 'Cuba' },
    { value: 'CW', label: 'Curaçao' },
    { value: 'CY', label: 'Cyprus' },
    { value: 'CZ', label: 'Czech Republic' },
    { value: 'DK', label: 'Denmark' },
    { value: 'DJ', label: 'Djibouti' },
    { value: 'DM', label: 'Dominica' },
    { value: 'DO', label: 'Dominican Republic' },
    { value: 'EC', label: 'Ecuador' },
    { value: 'EG', label: 'Egypt' },
    { value: 'SV', label: 'El Salvador' },
    { value: 'GQ', label: 'Equatorial Guinea' },
    { value: 'ER', label: 'Eritrea' },
    { value: 'EE', label: 'Estonia' },
    { value: 'ET', label: 'Ethiopia' },
    { value: 'FK', label: 'Falkland Islands (Malvinas)' },
    { value: 'FO', label: 'Faroe Islands' },
    { value: 'FJ', label: 'Fiji' },
    { value: 'FI', label: 'Finland' },
    { value: 'FR', label: 'France' },
    { value: 'GF', label: 'French Guiana' },
    { value: 'PF', label: 'French Polynesia' },
    { value: 'TF', label: 'French Southern Territories' },
    { value: 'GA', label: 'Gabon' },
    { value: 'GM', label: 'Gambia' },
    { value: 'GE', label: 'Georgia' },
    { value: 'DE', label: 'Germany' },
    { value: 'GH', label: 'Ghana' },
    { value: 'GI', label: 'Gibraltar' },
    { value: 'GR', label: 'Greece' },
    { value: 'GL', label: 'Greenland' },
    { value: 'GD', label: 'Grenada' },
    { value: 'GP', label: 'Guadeloupe' },
    { value: 'GU', label: 'Guam' },
    { value: 'GT', label: 'Guatemala' },
    { value: 'GG', label: 'Guernsey' },
    { value: 'GN', label: 'Guinea' },
    { value: 'GW', label: 'Guinea-Bissau' },
    { value: 'GY', label: 'Guyana' },
    { value: 'HT', label: 'Haiti' },
    { value: 'HM', label: 'Heard Island and McDonald Mcdonald Islands' },
    { value: 'VA', label: 'Holy See (Vatican City State)' },
    { value: 'HN', label: 'Honduras' },
    { value: 'HK', label: 'Hong Kong' },
    { value: 'HU', label: 'Hungary' },
    { value: 'IS', label: 'Iceland' },
    { value: 'IN', label: 'India' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'IR', label: 'Iran, Islamic Republic of' },
    { value: 'IQ', label: 'Iraq' },
    { value: 'IE', label: 'Ireland' },
    { value: 'IM', label: 'Isle of Man' },
    { value: 'IL', label: 'Israel' },
    { value: 'IT', label: 'Italy' },
    { value: 'JM', label: 'Jamaica' },
    { value: 'JP', label: 'Japan' },
    { value: 'JE', label: 'Jersey' },
    { value: 'JO', label: 'Jordan' },
    { value: 'KZ', label: 'Kazakhstan' },
    { value: 'KE', label: 'Kenya' },
    { value: 'KI', label: 'Kiribati' },
    { value: 'KP', label: "Korea, Democratic People's Republic of" },
    { value: 'KR', label: 'Korea, Republic of' },
    { value: 'KW', label: 'Kuwait' },
    { value: 'KG', label: 'Kyrgyzstan' },
    { value: 'LA', label: "Lao People's Democratic Republic" },
    { value: 'LV', label: 'Latvia' },
    { value: 'LB', label: 'Lebanon' },
    { value: 'LS', label: 'Lesotho' },
    { value: 'LR', label: 'Liberia' },
    { value: 'LY', label: 'Libya' },
    { value: 'LI', label: 'Liechtenstein' },
    { value: 'LT', label: 'Lithuania' },
    { value: 'LU', label: 'Luxembourg' },
    { value: 'MO', label: 'Macao' },
    { value: 'MK', label: 'Macedonia, the Former Yugoslav Republic of' },
    { value: 'MG', label: 'Madagascar' },
    { value: 'MW', label: 'Malawi' },
    { value: 'MY', label: 'Malaysia' },
    { value: 'MV', label: 'Maldives' },
    { value: 'ML', label: 'Mali' },
    { value: 'MT', label: 'Malta' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MQ', label: 'Martinique' },
    { value: 'MR', label: 'Mauritania' },
    { value: 'MU', label: 'Mauritius' },
    { value: 'YT', label: 'Mayotte' },
    { value: 'MX', label: 'Mexico' },
    { value: 'FM', label: 'Micronesia, Federated States of' },
    { value: 'MD', label: 'Moldova, Republic of' },
    { value: 'MC', label: 'Monaco' },
    { value: 'MN', label: 'Mongolia' },
    { value: 'ME', label: 'Montenegro' },
    { value: 'MS', label: 'Montserrat' },
    { value: 'MA', label: 'Morocco' },
    { value: 'MZ', label: 'Mozambique' },
    { value: 'MM', label: 'Myanmar' },
    { value: 'NA', label: 'Namibia' },
    { value: 'NR', label: 'Nauru' },
    { value: 'NP', label: 'Nepal' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'NC', label: 'New Caledonia' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'NI', label: 'Nicaragua' },
    { value: 'NE', label: 'Niger' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'NU', label: 'Niue' },
    { value: 'NF', label: 'Norfolk Island' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'NO', label: 'Norway' },
    { value: 'OM', label: 'Oman' },
    { value: 'PK', label: 'Pakistan' },
    { value: 'PW', label: 'Palau' },
    { value: 'PS', label: 'Palestine, State of' },
    { value: 'PA', label: 'Panama' },
    { value: 'PG', label: 'Papua New Guinea' },
    { value: 'PY', label: 'Paraguay' },
    { value: 'PE', label: 'Peru' },
    { value: 'PH', label: 'Philippines' },
    { value: 'PN', label: 'Pitcairn' },
    { value: 'PL', label: 'Poland' },
    { value: 'PT', label: 'Portugal' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'QA', label: 'Qatar' },
    { value: 'RE', label: 'Réunion' },
    { value: 'RO', label: 'Romania' },
    { value: 'RU', label: 'Russian Federation' },
    { value: 'RW', label: 'Rwanda' },
    { value: 'BL', label: 'Saint Barthélemy' },
    { value: 'SH', label: 'Saint Helena, Ascension and Tristan da Cunha' },
    { value: 'KN', label: 'Saint Kitts and Nevis' },
    { value: 'LC', label: 'Saint Lucia' },
    { value: 'MF', label: 'Saint Martin (French part)' },
    { value: 'PM', label: 'Saint Pierre and Miquelon' },
    { value: 'VC', label: 'Saint Vincent and the Grenadines' },
    { value: 'WS', label: 'Samoa' },
    { value: 'SM', label: 'San Marino' },
    { value: 'ST', label: 'Sao Tome and Principe' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'SN', label: 'Senegal' },
    { value: 'RS', label: 'Serbia' },
    { value: 'SC', label: 'Seychelles' },
    { value: 'SL', label: 'Sierra Leone' },
    { value: 'SG', label: 'Singapore' },
    { value: 'SX', label: 'Sint Maarten (Dutch part)' },
    { value: 'SK', label: 'Slovakia' },
    { value: 'SI', label: 'Slovenia' },
    { value: 'SB', label: 'Solomon Islands' },
    { value: 'SO', label: 'Somalia' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
    { value: 'SS', label: 'South Sudan' },
    { value: 'ES', label: 'Spain' },
    { value: 'LK', label: 'Sri Lanka' },
    { value: 'SD', label: 'Sudan' },
    { value: 'SR', label: 'Suriname' },
    { value: 'SJ', label: 'Svalbard and Jan Mayen' },
    { value: 'SZ', label: 'Swaziland' },
    { value: 'SE', label: 'Sweden' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'SY', label: 'Syrian Arab Republic' },
    { value: 'TW', label: 'Taiwan, Province of China' },
    { value: 'TJ', label: 'Tajikistan' },
    { value: 'TZ', label: 'Tanzania, United Republic of' },
    { value: 'TH', label: 'Thailand' },
    { value: 'TL', label: 'Timor-Leste' },
    { value: 'TG', label: 'Togo' },
    { value: 'TK', label: 'Tokelau' },
    { value: 'TO', label: 'Tonga' },
    { value: 'TT', label: 'Trinidad and Tobago' },
    { value: 'TN', label: 'Tunisia' },
    { value: 'TR', label: 'Turkey' },
    { value: 'TM', label: 'Turkmenistan' },
    { value: 'TC', label: 'Turks and Caicos Islands' },
    { value: 'TV', label: 'Tuvalu' },
    { value: 'UG', label: 'Uganda' },
    { value: 'UA', label: 'Ukraine' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'UM', label: 'United States Minor Outlying Islands' },
    { value: 'UY', label: 'Uruguay' },
    { value: 'UZ', label: 'Uzbekistan' },
    { value: 'VU', label: 'Vanuatu' },
    { value: 'VE', label: 'Venezuela, Bolivarian Republic of' },
    { value: 'VN', label: 'Viet Nam' },
    { value: 'VG', label: 'Virgin Islands, British' },
    { value: 'VI', label: 'Virgin Islands, U.S.' },
    { value: 'WF', label: 'Wallis and Futuna' },
    { value: 'EH', label: 'Western Sahara' },
    { value: 'YE', label: 'Yemen' },
    { value: 'ZM', label: 'Zambia' },
    { value: 'ZW', label: 'Zimbabwe' },
  ]);
  const [closeAccount, setCloseAccount] = useState(false);
  const [replageImage, setReplageImage] = useState(
    'https://t4.ftcdn.net/jpg/00/88/53/89/360_F_88538986_5Bi4eJ667pocsO3BIlbN4fHKz8yUFSuA.jpg'
  );

  const [name, setName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.primaryEmail || '');
  const [loginPhone, setLoginPhone] = useState(user?.contact?.toString());
  const [profileImage, setprofileimage] = useState(user?.profilePic || "");
  const [mimeType, setmimeType] = useState(null)

  const PickFromCamera = () => {
    ImagePicker.openCamera({
      width: ms(300),
      height: ms(400),
      cropping: true,
    }).then(image => {
      setmimeType(image.mime)
      setprofileimage(image.path)
      setReplace(false);
    });
  };

  const SelectFromGallery = () => {
    ImagePicker.openPicker({
      width: ms(300),
      height: ms(400),
      cropping: true,
      freeStyleCropEnabled: true,
      cropperCircleOverlay: true,
    }).then(image => {
      setprofileimage(image.path)
      setmimeType(image.mime)
      setReplace(false);
    });
  };

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.UPDATE_PROFILE], state)
  );
  const onChange = selectedDate => {

    const formattedDate = moment(selectedDate).format('MMM DD, yyyy');
    const birthDate = moment(selectedDate).format("yyyy/MM/DD");
    setBirthday(birthDate)
    setShow(false);
    setDate(selectedDate);
    setFormatedDate(formattedDate)

  };
  const validation = () => {
    if (name == '') {
      showMessage({
        message: strings.SignUp.name,
        type: "danger"
      })
    } else if (email == '') {
      showMessage({
        message: strings.SignUp.emailPlaceHolder,
        type: "danger"
      })
    }
    else if (formatedDate == "") {
      showMessage({
        message: strings.SignUp.dobPlaceHolder,
        type: "danger"
      })
    }
    else if (genderValue == '') {
      showMessage({
        message: strings.SignUp.genderPlaceHolder,
        type: "danger"
      })
    }
    else if (locationValue == '') {
      showMessage({
        message: strings.SignUp.countryPlaceHolder,
        type: "danger"
      })
    }
    else if (userName == '') {
      showMessage({
        message: strings.setupUserId.subtitle,
        type: "danger"
      })
    }
    else {

      dispatch(updateProfile(formatedDate, name, genderValue, user?.id, email, locationValue, userName, user?.number, profileImage, mimeType, NAVIGATION.editProfile))
    }

  }
  const onSave = () => {
    validation()

  }
  const onRemove = () => {
    setprofileimage("")
    setmimeType(null)
  }
  return (
    <SafeAreaView style={styles.container}>
      <TopBackButton
        onPress={() => navigation.goBack()}
        style={styles.TopBackButton}
      />
      <Text style={[styles.headerText, TextStyles.header]}>
        {strings.profile.editProfile}{' '}
      </Text>
      <HorizontalLine
        color={theme.light.colors.infoBgLight}
        paddingTop={ms(10)}
      />
      <ScrollView
        style={styles.ScrollView}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        <CustomLoader
          open={isLoading}
        />
        <Text style={styles.profileTxt}>{strings.profile.profilePic}</Text>
        <View style={styles.ScrollViewContainer}>

          <View>
            <Image
              source={{
                uri: profileImage,
              }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.buttonAddProfile}>
            <Button
              title={strings.addYourProfilePicture.replace}
              style={styles.replaceBtn}
              onPress={() => setReplace(true)}
            />
            <Button
              onPress={() => onRemove()}
              title={strings.addYourProfilePicture.remove}
              style={styles.removeBtn}
              textStyle={{
                color: theme.light.colors.primary,
              }}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.textFiledContainer}>
            <Text style={styles.textFieldLebel}>
              {' '}
              {strings.SignUp.yourName}{' '}
            </Text>
            <TextInput
              style={styles.textFiled}
              value={name}
              onChangeText={val => setName(val)}
            />
          </View>
          <View style={styles.textFiledContainer}>
            <Text style={styles.textFieldLebel}> {strings.SignUp.email} </Text>
            <TextInput
              style={styles.textFiled}
              value={email}
              onChangeText={val => setEmail(val)}
            />
          </View>
          <View style={styles.textFiledContainer}>
            <Text style={styles.textFieldLebel}>
              {' '}
              {strings.SignUp.birthday}{' '}
            </Text>
            <TextInput
              style={styles.textFiled}
              selectTextOnFocus={false}
              editable={false}
              value={formatedDate}
            // value={Moment(date).format('DD-MM-YYYY')}
            />
            <View style={styles.CalendarIcon}>
              <Icon
                icon={faCalendar}
                color={theme.light.colors.info}
                onPress={() => setShow(true)}
              />
            </View>

            <DatePicker
              modal
              mode="date"
              open={show}
              date={date}
              onConfirm={date => {
                onChange(date)

              }}
              onCancel={() => {
                setShow(false);
              }}
            />
          </View>
          <View style={styles.textFiledContainer}>
            <Text style={styles.textFieldLebel}> {strings.SignUp.gender} </Text>
            <DropDownPicker
              schema={{
                label: 'label',
                value: 'value'
              }}

              dropDownDirection="TOP"
              placeholder={genderValue}
              open={genderListOpen}
              value={genderValue}
              items={gender}
              setOpen={setGenderListOpen}
              setValue={setGenderValue}
              setItems={setGender}
              style={genderListOpen ? styles.openDropDown : styles.textFiled}
              textStyle={styles.dropListTxt}
              min={0}
              max={2}
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
          </View>
          <View style={styles.textFiledContainer}>
            <Text style={styles.textFieldLebel}>
              {' '}
              {strings.SignUp.country}{' '}
            </Text>
            <DropDownPicker
              schema={{
                label: 'label',
                value: 'value'
              }}
              dropDownDirection="TOP"
              placeholder={locationValue}
              open={locationListOpen}
              value={locationValue}
              items={COUNTRY_LIST}
              setOpen={setLocationListOpen}
              setValue={setLocationValue}
              setItems={setLocation}
              style={locationListOpen ? styles.openDropDown : styles.textFiled}
              textStyle={styles.dropListTxt}
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
          </View>
          {/* userID */}
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={10}
            paddingBottom={20}
          />
          <View style={styles.textFiledContainer}>
            <Text style={styles.textFieldLebel}>
              {' '}
              {strings.profile.userID}{' '}
            </Text>
            <TextInput
              ref={userNameInput_ref}
              style={styles.textFiled}
              selectTextOnFocus={false}
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            <View style={styles.CalendarIcon}>
              <Icon
                icon={faPen}
                color={theme.light.colors.info}
                onPress={() => userNameInput_ref.current.focus()}
              />
            </View>
          </View>
          <HorizontalLine
            color={theme.light.colors.infoBgLight}
            paddingTop={10}
            paddingBottom={20}
          />
          <View style={styles.textFiledContainer}>
            <Text style={styles.textFieldLebel}>
              {' '}
              {strings.SignUp.loginPhone}{' '}
            </Text>
            <TextInput

              style={styles.textFiled}
              value={loginPhone}
              editable={false}

            // onChangeText={val => setLoginPhone(val)}
            />
          </View>
          {/* <View style={styles.marginTop} /> */}
          <Text style={styles.dropListTxt}>
            {' '}
            {strings.SignUp.loginFormBottomTxt}
          </Text>
        </View>
        <HorizontalLine
          color={theme.light.colors.infoBgLight}
          paddingTop={20}
        />
        <View style={styles.buttonContainer}>
          <View>
            <Button
              onPress={onSave}
              title={strings.operations.save} />
          </View>
          <View style={styles.closeMyAccountButtonContainer}>
            <Button
              title={strings.profile.closeMyAccount}
              style={styles.closeMyAccountButton}
              textStyle={{
                color: theme.light.colors.primary,
              }}
              onPress={() => setOpenPopUp(true)}
            />
          </View>
        </View>
        {closeAccount && (
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomTextLebel}>
              {' '}
              {strings.profile.closeWarning}{' '}
            </Text>
            <TouchableOpacity onPress={() => setSubscriptionPopup(true)}>
              <Text style={styles.bottomTextLink}>
                {strings.profile.manageSubscription}
              </Text>
            </TouchableOpacity>

            {/* Pop up message */}
            <PopUp open={subscriptionPopup} setOpen={setSubscriptionPopup}>
              <TouchableOpacity
                onPress={() => setSubscriptionPopup(false)}
                style={styles.popUpContainer}
              >
                <View style={styles.iconBackgroundClose}>
                  <FontAwesomeIcon
                    icon={faClose}
                    size={ms(13)}
                    color={theme.light.colors.primaryBgDark}
                  />
                </View>
              </TouchableOpacity>
              <Text style={[styles.errorTxtHeader, styles.errorTxtColor]}>
                {strings.profile.cancelSubscription}
              </Text>
              <View style={styles.ruleContainer}>
                <Text style={styles.errorTxt}>{strings.profile.rule1}</Text>
                <Text style={styles.errorTxt}>{strings.profile.rule2} </Text>
                <Text style={styles.errorTxt}>{strings.profile.rule3} </Text>
              </View>
              <Button
                title={strings.operations.okay}
                style={styles.closeMyAccountButton}
                textStyle={{
                  color: theme.light.colors.primary,
                }}
                onPress={() => setSubscriptionPopup(false)}
              />
            </PopUp>
          </View>
        )}

        <View style={styles.marginBottom50} />
      </ScrollView>

      <PopUp open={openPopUp} setOpen={setOpenPopUp}>
        <TouchableOpacity
          onPress={() => setOpenPopUp(false)}
          style={styles.popUpTouch}
        >
          <View style={styles.iconBackgroundClose}>
            <FontAwesomeIcon
              icon={faClose}
              size={13}
              color={theme.light.colors.primary}
            />
          </View>
        </TouchableOpacity>
        <Text style={[TextStyles.label, styles.closeConfirm]}>
          {strings.profile.closeConfirm}
        </Text>
        <Button
          title={strings.operations.no}
          style={styles.noButton}
          onPress={() => setOpenPopUp(false)}
        />
        <Button
          title={strings.operations.yes}
          style={styles.yesButton}
          textStyle={{
            color: theme.light.colors.primary,
          }}
          onPress={() => {
            setCloseAccount(true);
            setOpenPopUp(false);
          }}
        />
      </PopUp>

      {/* Replace Popup */}
      {openReplace && (
        <PopUp open={openReplace} setOpen={setReplace}>
          <Button
            title={strings.operations.imageFromCamera}
            style={styles.imageFromCameraButton}
            onPress={PickFromCamera}
          />
          <Button
            title={strings.operations.imageFromGallery}
            style={styles.imageFromGalleryButton}
            onPress={SelectFromGallery}
          />
        </PopUp>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.white,
  },
  header: {
    padding: ms(15),
  },
  headerIcon: {
    color: theme.light.colors.info,
  },
  TopBackButton: { paddingLeft: ms(10), paddingTop: ms(10) },
  headerText: {
    marginTop: vs(10),
    color: theme.light.colors.black,
    paddingLeft: ms(8),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: ms(10),
    marginBottom: ms(-30),
  },
  marginTop: { marginTop: vs(50) },
  closeMyAccountButtonContainer: { marginTop: ms(10) },
  closeMyAccountButton: {
    backgroundColor: theme.light.colors.white,
    borderWidth: 2,
    borderColor: theme.light.colors.primaryBgDark,
  },
  ScrollView: {
    flex: 1,
    padding: 8,
  },
  ScrollViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileTxt: {
    fontFamily: FontFamily.Recoleta_bold,
    color: theme.light.colors.black,
    paddingTop: ms(10),
  },
  profileImage: {
    width: s(100),
    height: s(100),
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    marginTop: vs(10),
  },
  buttonAddProfile: { flexDirection: 'row' },
  formContainer: {
    marginTop: vs(20),
  },
  textFiledContainer: {
    marginLeft: ms(5),
    marginRight: ms(5),
  },
  textFieldLebel: {
    color: theme.light.colors.activeTabLabel,
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(15, 0.3),
    paddingBottom: ms(10),
  },
  textFiled: {
    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.light.colors.textFieldBorderColor,
    padding: ms(10),
    height: vs(40),
    fontSize: ms(18, 0.3),
    fontFamily: FontFamily.BrandonGrotesque_regular,
    marginBottom: vs(15),
    placeholderTextColor: "red"
  },
  CalendarIcon: {
    position: 'absolute',
    top: 45,
    right: 15,
  },
  replaceBtn: {
    width: '38%',
    marginLeft: ms(10),
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  removeBtn: {
    width: '38%',
    marginLeft: ms(10),
    backgroundColor: theme.light.colors.white,
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 5,
  },
  replaceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.light.colors.primaryBg,
  },
  replaceContent: {
    backgroundColor: theme.light.colors.white,
    width: '100%',
    padding: ms(10),
  },

  dropListTxt: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    fontSize: ms(17, 0.3),
  },
  openDropDown: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderWidth: 1,
    borderColor: theme.light.colors.info,

    backgroundColor: theme.light.colors.textFieldBackgroundColor,
    padding: ms(10),
    height: vs(40),
    fontSize: ms(18, 0.3),
    fontFamily: FontFamily.BrandonGrotesque_regular,
    marginBottom: vs(15),
  },
  dropDownContainerStyle: {
    marginTop: ms(5),
    marginBottom: ms(17),
    borderWidth: 1,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderColor: theme.light.colors.dropDownBorder,

    //IOS
    shadowOffset: { width: -2, height: 4 },
    shadowColor: theme.light.colors.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    //android
    elevation: 50,
  },
  bottomTextContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingTop: ms(50),
  },
  bottomTextLebel: {
    textAlign: 'center',
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(18, 0.3),
    paddingHorizontal: ms(30),
  },
  bottomTextLink: {
    color: theme.light.colors.primaryBgDark,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(20, 0.3),
    marginBottom: -ms(30),
  },
  popUpContainer: {
    padding: ms(20),
  },
  errorTxtHeader: {
    fontFamily: FontFamily.BrandonGrotesque_medium,
    fontSize: ms(16, 0.3),
  },
  errorTxt: {
    fontFamily: FontFamily.BrandonGrotesque_regular,
    color: theme.light.colors.black,
    fontSize: ms(16, 0.3),
    right: ms(60),
  },
  ruleContainer: {
    alignItems: 'flex-start',
    padding: ms(20),
  },
  marginBottom50: {
    marginBottom: ms(50),
  },
  popUpTouch: {
    padding: 20,
  },
  iconBackgroundClose: {
    backgroundColor: theme.light.colors.primaryBgLight,
    padding: ms(10),
    borderRadius: 60,
  },
  noButton: {
    marginTop: vs(20),
  },
  yesButton: {
    marginTop: vs(10),
    backgroundColor: theme.light.colors.white,
    borderWidth: 2,
    borderColor: theme.light.colors.primary,
  },
  imageFromCameraButton: {
    margin: ms(5),
  },
  imageFromGalleryButton: {
    margin: ms(5),
  },
  errorTxtColor: {
    color: theme.light.colors.black,
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
  },
  closeConfirm: {
    textAlign: 'center',
    color: theme.light.colors.black,
    fontFamily: FontFamily.Recoleta_bold,
    fontSize: ms(14, 0.3),
    paddingHorizontal: 30,
  },
});
