import { useColorScheme } from 'react-native';

const usePickColor = () =>{
    const colorScheme = useColorScheme();
    const pickerItemColor = colorScheme === 'dark' ? 'white' : 'black';
    const pickerBackgroundColor = colorScheme === 'dark' ? '#333' : '#fff'; 

    return{pickerItemColor,pickerBackgroundColor}
} 

export default usePickColor;