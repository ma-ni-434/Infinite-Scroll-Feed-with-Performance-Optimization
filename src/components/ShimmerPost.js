import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

export default function ShimmerPost() {
  return (
    <View style={styles.card}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.title}
      />
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.body}
      />
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.bodySmall}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
  },
  title: {
    height: 20,
    width: "60%",
    marginBottom: 10,
  },
  body: {
    height: 14,
    width: "90%",
    marginBottom: 8,
  },
  bodySmall: {
    height: 14,
    width: "70%",
  },
});
