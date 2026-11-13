
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

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    Alert.alert(
      'Login Ready',
      'Your login form is ready for API integration.'
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
          {/* Logo */}
          <View style={authStyles.logoContainer}>
            <View style={authStyles.logo}>
              <Text style={authStyles.logoText}>TD</Text>
            </View>
          </View>

          {/* Heading */}
          <View style={authStyles.headingContainer}>
            <Text style={authStyles.heading}>Welcome Back</Text>

            <Text style={authStyles.subHeading}>
              Login to continue organizing your day.
            </Text>
          </View>

          {/* Form */}
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

            <Text style={authStyles.label}>Password</Text>

            <View style={authStyles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#999999"
              />

              <TextInput
                style={authStyles.input}
                placeholder="Enter your password"
                placeholderTextColor="#AAAAAA"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={21}
                  color="#999999"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password Navigation */}
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', marginTop: 12 }}
              onPress={() => router.push('/forgot-password')}
            >
              <Text style={authStyles.footerLink}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={authStyles.submitButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={authStyles.submitText}>Login</Text>

              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Register Navigation */}
          <View style={authStyles.footer}>
            <Text style={authStyles.footerText}>
              Don't have an account?
            </Text>

            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={authStyles.footerLink}> Register</Text>
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
