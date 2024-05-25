import { useColorScheme } from 'react-native';

const useCardColors = () => {
    const colorScheme = useColorScheme();
    const cardBackgroundColor = colorScheme === 'dark' ? 'black' : 'white';
    const cardBorderColor = colorScheme === 'dark' ? 'white' : 'black';
    return { cardBackgroundColor, cardBorderColor };
};

export default useCardColors;
