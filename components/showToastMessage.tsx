import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

export const showToastMessage = (
  type: ToastType,
  text1: string,
  text2: string
) => {
  Toast.show({
    type: type || 'info',
    text1: text1 || 'Mensaje',
    text2: text2 || '',
    visibilityTime: 4000,
    position:'top'
  });
};
