
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import authStyles from './authStyles';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email.trim()) {
      Alert.alert('Missing email', 'Please enter your email address.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    Alert.alert(
      'Reset Link Ready',
      'Your password reset request is ready for API integration.'
    );
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => router.replace('/login')}
            style={{ alignSelf: 'flex-start', marginBottom: 30 }}
          >
            <Ionicons name="arrow-back" size={25} color="#292743" />
          </TouchableOpacity>

          <View style={authStyles.logoContainer}>
            <View style={authStyles.logo}>
              <Ionicons name="lock-closed" size={30} color="#FFFFFF" />
            </View>
          </View>

          <View style={authStyles.headingContainer}>
            <Text style={authStyles.heading}>Forgot Password?</Text>
            <Text style={authStyles.subHeading}>
              Don't worry! Enter your email address and we'll help you reset
              your password.
            </Text>
          </View>

          <View style={authStyles.form}>
            <Text style={authStyles.label}>Email Address</Text>

            <View style={authStyles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#999999" />
              <TextInput
                style={authStyles.input}
                placeholder="Enter your email"
                placeholderTextColor="#AAAAAA"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity
              style={authStyles.submitButton}
              onPress={handleResetPassword}
              activeOpacity={0.8}
            >
              <Text style={authStyles.submitText}>Send Reset Link</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={authStyles.footer}>
            <Text style={authStyles.footerText}>Remember your password?</Text>

            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={authStyles.footerLink}> Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={authStyles.bottomText}>
            Organize your day. Achieve your goals.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
