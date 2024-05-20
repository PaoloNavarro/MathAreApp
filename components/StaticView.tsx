import type { PropsWithChildren } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import { ThemedView } from '@/components/ThemedView';

type Props = PropsWithChildren<{}>;

export default function StaticView({ children }: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 55,
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
