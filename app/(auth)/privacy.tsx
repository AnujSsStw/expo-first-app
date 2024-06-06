import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const PrivacyScreen = () => {
  return (
    <ScrollView style={{}}>
      <ThemedView
        style={{
          padding: 16,
        }}
      >
        <ThemedText style={styles.heading}>SillyTV Privacy Policy</ThemedText>
        <ThemedText>
          SillyTV respects your privacy and is committed to protecting your
          personal information. This Privacy Policy explains what information we
          collect, how we use it, and your choices about your information.
        </ThemedText>

        <ThemedText style={styles.subheading}>
          Information We Collect:
        </ThemedText>
        <ThemedText>
          - We collect information you provide directly, such as your email
          address, username, and password when you create an account.
        </ThemedText>
        <ThemedText>
          - We may collect information about your use of the SillyTV app, such
          as the shows and movies you watch and your browsing history within the
          app.
        </ThemedText>
        <ThemedText>
          - We may collect device information, such as your device type and
          operating system.
        </ThemedText>

        <ThemedText style={styles.subheading}>
          How We Use Your Information:
        </ThemedText>
        <ThemedText>
          - We use your information to provide and improve the SillyTV service,
          including personalized recommendations.
        </ThemedText>
        <ThemedText>
          - We may use your information to send you marketing communications,
          such as emails about new content or promotions. (You can opt out of
          these communications at any time.)
        </ThemedText>
        <ThemedText>
          - We may use your information to analyze trends and improve the
          SillyTV app.
        </ThemedText>

        <ThemedText style={styles.subheading}>Your Choices:</ThemedText>
        <ThemedText>
          - You can access and update your information in your account settings.
        </ThemedText>
        <ThemedText>
          - You can opt out of marketing communications by following the
          unsubscribe instructions in the emails you receive.
        </ThemedText>

        <ThemedText style={styles.subheading}>Security:</ThemedText>
        <ThemedText>
          We take reasonable steps to protect your information from unauthorized
          access, disclosure, alteration, or destruction. However, no internet
          transmission is completely secure, and we cannot guarantee the
          security of your information.
        </ThemedText>

        <ThemedText style={styles.subheading}>
          Changes to this Privacy Policy:
        </ThemedText>
        <ThemedText>
          We may update this Privacy Policy from time to time. We will post any
          changes on our website and in the SillyTV app.
        </ThemedText>

        <ThemedText style={styles.heading}>SillyTV Refund Policy</ThemedText>
        <ThemedText style={styles.important}>
          **Please note:** All sales are final. SillyTV does not offer refunds
          for any purchases.
        </ThemedText>

        <ThemedText>
          We encourage you to carefully review the details of your purchase
          before completing it.
        </ThemedText>
        <ThemedText>
          This policy applies to all purchases made through the SillyTV app.
        </ThemedText>

        <ThemedText style={styles.disclaimer}>
          **Disclaimer:** This is a sample policy. You may want to consult with
          a lawyer to ensure your policy complies with all applicable laws and
          regulations.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  important: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
});

export default PrivacyScreen;
