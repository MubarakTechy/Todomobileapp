
import React, { useState } from 'react';
import { Pressable } from 'react-native'; // Make sure it's from 'react-native'

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

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Your passwords do not match.');
      return;
    }

    Alert.alert(
      'Registration Ready',
      `${name}, your form is ready for API integration.`
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
          <View style={authStyles.logoContainer}>
            <View style={authStyles.logo}>
              <Text style={authStyles.logoText}>TD</Text>
            </View>
          </View>

          <View style={authStyles.headingContainer}>
            <Text style={authStyles.heading}>Create Account</Text>
            <Text style={authStyles.subHeading}>
              Create an account and start organizing your day.
            </Text>
          </View>

          <View style={authStyles.form}>
            <Text style={authStyles.label}>Full Name</Text>

            <View style={authStyles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#999999" />
              <TextInput
                style={authStyles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#AAAAAA"
                value={name}
                onChangeText={setName}
              />
            </View>

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
              <Ionicons name="lock-closed-outline" size={20} color="#999999" />
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

            <Text style={authStyles.label}>Confirm Password</Text>

            <View style={authStyles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#999999" />
              <TextInput
                style={authStyles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#AAAAAA"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={21}
                  color="#999999"
                />
              </TouchableOpacity>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity
              style={authStyles.submitButton}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={authStyles.submitText}>Create Account</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Login Navigation */}
          <View style={authStyles.footer}>
            <Text style={authStyles.footerText}>
              Already have an account?
            </Text>
          <Pressable onPress={() => router.push('/login')}>
            <Text style={authStyles.footerLink}>Login</Text>
          </Pressable>
          </View>

          <Text style={authStyles.bottomText}>
            Organize your day. Achieve your goals.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
