import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
// COMPONENTS
import ErrorMessage from './ErrorMessage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class InputText extends React.Component {
  state = {
    showPassword: false,
    changeBg: false,
  };

  onBlur = async () => {
    const {onBlur} = this.props;
    const {changeBg} = this.state;
    if (changeBg) {
      this.setState({changeBg: false});
    }

    await onBlur();
  };

  renderShowPassword = () => {
    const {showPassword} = this.state;
    const {
      showPasswordIconColor,
      showPasswordIconSize,
      customIcon,
      showPasswordIconName,
      hidePasswordIconName,
    } = this.props;
    const FormIcon = customIcon || Icon;
    showPasswordIcon = showPasswordIconName;
    hidePasswordIcon = hidePasswordIconName;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState(prevState => ({
            showPassword: !prevState.showPassword,
          }));
        }}>
        <FormIcon
          name={showPassword ? showPasswordIcon : hidePasswordIcon}
          size={showPasswordIconSize}
          color={showPasswordIconColor}
        />
      </TouchableOpacity>
    );
  };

  changeBackground = changeBackgroundOnFocus => {
    if (changeBackgroundOnFocus) {
      this.setState({changeBg: true});
    }
  };

  render() {
    const {showPassword, changeBg} = this.state;
    const {
      field,
      label,
      onChange,
      reference,
      errors,
      iconSize,
      iconColor,
      customStyles,
      styleName,
      placeholder,
      changeBackgroundOnFocus,
      defaultValue,
      customIcon,
      showPasswordIconName,
      hidePasswordIconName,
    } = this.props;
    const FormIcon = customIcon || Icon;
    let iconName = null;
    if (field.icon) {
      iconName = field.icon.name !== undefined ? field.icon.name : field.icon;
    }
    if (field.iconLeft) {
      iconName =
        field.iconLeft.name !== undefined
          ? field.iconLeft.name
          : field.iconLeft;
    }
    if (field.iconRight) {
      iconName =
        field.iconRight.name !== undefined
          ? field.iconRight.name
          : field.iconRight;
    }
    return (
      <View
        style={StyleSheet.flatten([
          styles.inputTextContainer,
          customStyles.inputTextContainer,
          customStyles[`inputTextContainer${styleName}`],
        ])}>
        {label && (
          <Text
            style={StyleSheet.flatten([
              styles.inputTextLabel,
              customStyles.inputTextLabel,
              customStyles[`inputTextLabel${styleName}`],
            ])}>
            {label}
          </Text>
        )}
        <View
          style={StyleSheet.flatten([
            styles.inputTextWrapper,
            customStyles.inputTextWrapper,
            customStyles[`inputTextWrapper${styleName}`],
            (field.icon || field.iconLeft || field.iconRight) && {
              paddingHorizontal: 5,
            },
          ])}>
          {(field.icon || field.iconLeft) && (
            <FormIcon name={iconName} size={iconSize} color={iconColor} />
          )}
          <TextInput
            {...field}
            secureTextEntry={field.secureTextEntry && !showPassword}
            ref={reference}
            placeholder={placeholder}
            value={defaultValue}
            onChangeText={text => onChange(text)}
            onBlur={() => this.onBlur()}
            onFocus={() => this.changeBackground(changeBackgroundOnFocus)}
            style={StyleSheet.flatten([
              styles.inputText,
              customStyles.inputText,
              customStyles[`inputText${styleName}`],
              (field.icon || field.iconLeft || field.iconRight) && {
                marginHorizontal: 5,
              },
              changeBg && [
                styles.inputTextOnFocusBackground,
                customStyles.inputTextOnFocusBackground,
                customStyles[`inputTextOnFocusBackground${styleName}`],
              ],
            ])}
          />
          {field.type === 'password' && this.renderShowPassword()}
          {field.type !== 'password' && field.iconRight && (
            <FormIcon name={iconName} size={iconSize} color={iconColor} />
          )}
        </View>
        {errors[field.name] && (
          <ErrorMessage
            error={errors[field.name]}
            name={styleName}
            customStyles={customStyles}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputTextContainer: {
    marginBottom: 20,
  },
  inputTextLabel: {
    marginBottom: 15,
    fontWeight: '800',
  },
  inputTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000',
  },
  inputText: {
    flex: 1,
    padding: 10,
  },
  inputTextOnFocusBackground: {
    backgroundColor: 'gray',
    color: 'white',
  },
});

InputText.defaultProps = {
  showPasswordIconColor: '#000',
  showPasswordIconSize: 25,
  iconSize: 25,
  iconColor: '#000',
  customStyles: {},
  onBlur: () => {},
  changeBackgroundOnFocus: false,
  placeholder: null,
  label: null,
  defaultValue: null,
  customIcon: null,
  showPasswordIconName: 'eye-outline',
  hidePasswordIconName: 'eye-off',
};

InputText.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  reference: PropTypes.func.isRequired,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  errors: PropTypes.object,
  showPasswordIconColor: PropTypes.string,
  showPasswordIconSize: PropTypes.number,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  showPasswordIconName: PropTypes.string,
  hidePasswordIconName: PropTypes.string,
  placeholder: PropTypes.string,
  customStyles: PropTypes.object,

};

export default InputText;
