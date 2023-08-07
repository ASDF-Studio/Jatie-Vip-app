import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TYPES } from '@/actions/UserActions';
import { Button, CustomLoader, TextField } from '@/components';
import { strings } from '@/localization';
import { styles } from '@/screens/SignUp/SignUp.style';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { AuthHeader } from '@/components/AuthHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { NAVIGATION } from '@/constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';
import { COUNTRY_LIST } from '@/constants';
import DatePicker from 'react-native-date-picker';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { theme } from '@/theme';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { navigationRef } from '@/navigation/RootNavigation';
import { customShowMessage } from '@/utils';
import { Required } from '../Profile/editProfile';

export function SignUp({ route }) {
  const { username, ID, number } = route.params;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [formatedDate, setFormatedDate] = useState('');
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
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.UPDATE_PROFILE], state)
  );

  const errors = useSelector(
    state => errorsSelector([TYPES.UPDATE_PROFILE], state),
    shallowEqual
  );
  const handleSubmit = () => {
    validation();
  };

  const onChange = selectedDate => {
    const formattedDate = moment(selectedDate).format('MMM DD, yyyy');
    const birthDate = moment(selectedDate).format('yyyy/MM/DD');

    setBirthday(birthDate);
    setShow(false);
    setDate(selectedDate);
    setFormatedDate(formattedDate);
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

  const validation = () => {
    if (name == '') {
      customShowMessage({
        message: strings.SignUp.name,
        type: 'danger',
      });
    } else if (email == '') {
      customShowMessage({
        message: strings.SignUp.emailPlaceHolder,
        type: 'danger',
      });
    }
    // else if (birthday == '') {
    //   customShowMessage({
    //     message: strings.SignUp.dobPlaceHolder,
    //     type: 'danger',
    //   });
    // } else if (genderValue == null) {
    //   customShowMessage({
    //     message: strings.SignUp.genderPlaceHolder,
    //     type: 'danger',
    //   });
    // } else if (countryvalue == null) {
    //   customShowMessage({
    //     message: strings.SignUp.countryPlaceHolder,
    //     type: 'danger',
    //   });
    // }
    else {
      var DATA = {
        birthday,
        name,
        genderValue,
        ID,
        email,
        countryvalue,
        username,
        number,
      };
      navigationRef.navigate(NAVIGATION.addProfilePicture, {
        prevData: DATA,
      });
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <AuthHeader title={strings.SignUp.title} />
        <Text style={styles.subTitle}>
          {strings.SignUp.yourName}
          <Required />
        </Text>

        <TextField
          autoCapitalize="none"
          onChangeText={setName}
          placeholder={strings.SignUp.name}
          value={name}
          placeholderStyle={styles.dropdowntextstyle}
        />
        <Text style={styles.subTitle}>
          {strings.SignUp.email}
          <Required />
        </Text>
        {isLoading && <CustomLoader open={isLoading} />}
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
              // value={moment(date).format('MM-DD-YYYY')}
              value={formatedDate}
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
          <DatePicker
            modal
            mode="date"
            open={show}
            // locale = "fr"
            date={date}
            onConfirm={date => {
              onChange(date);
            }}
            onCancel={() => {
              setShow(false);
            }}
            // onDateChange={onChange}
          />
        )}

        <Text style={styles.subTitle}>{strings.SignUp.gender}</Text>
        <DropDownPicker
          dropDownDirection="TOP"
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
          items={COUNTRY_LIST}
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
