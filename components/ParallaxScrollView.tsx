import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';


type Props = PropsWithChildren<{
}>;

export default function ParallaxScrollView({
  children,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);


  return (
    
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={26}>
        <Animated.View
        style={styles.Header}>
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
   

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Header:{
    paddingTop:0,
  },
  content: {
    marginTop:55,
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
