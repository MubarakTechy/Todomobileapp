
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [screen, setScreen] = useState('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const isLogin = screen === 'login';
  const isRegister = screen === 'register';
  const isForgotPassword = screen === 'forgot';

  // Login and Register
  const handleSubmit = () => {
    if (isLogin) {
      if (!email.trim() || !password.trim()) {
        Alert.alert('Missing fields', 'Please enter your email and password.');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Weak password', 'Password must be at least 6 characters.');
        return;
      }

      Alert.alert('Login', 'Your login form is ready.');
    } else {
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        Alert.alert('Missing fields', 'Please fill in all fields.');
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

      Alert.alert(`${name} Saved`, 'Your registration form is ready.');
    }
  };

  // Forgot Password
  const handleForgotPassword = () => {
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
      'Email Validated',
      'Your email is ready for password recovery. We will connect the reset API later.'
    );
  };

  // Switch between Login and Register
  const switchScreen = () => {
    setScreen(isLogin ? 'register' : 'login');

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
  };

  // Open Forgot Password
  const openForgotPassword = () => {
    setScreen('forgot');
    setEmail('');
  };

  // Return to Login
  const backToLogin = () => {
    setScreen('login');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* FORGOT PASSWORD SCREEN */}
          {isForgotPassword ? (
            <View style={styles.forgotScreen}>

              {/* Back Button */}
              <TouchableOpacity
                style={styles.backButton}
                onPress={backToLogin}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="arrow-back"
                  size={23}
                  color="#292743"
                />
              </TouchableOpacity>

              {/* Icon */}
              <View style={styles.forgotIconContainer}>
                <Ionicons
                  name="lock-open-outline"
                  size={45}
                  color="#5B52E4"
                />
              </View>

              {/* Heading */}
              <View style={styles.forgotHeadingContainer}>
                <Text style={styles.forgotHeading}>
                  Forgot Password?
                </Text>

                <Text style={styles.forgotSubHeading}>
                  Don't worry! It happens. Enter your registered email
                  address and we'll help you reset your password.
                </Text>
              </View>

              {/* Email Form */}
              <View style={styles.form}>
                <Text style={styles.label}>
                  Email Address
                </Text>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#999999"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                {/* Reset Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleForgotPassword}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitText}>
                    Send Reset Link
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>

              {/* Return to Login */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Remember your password?
                </Text>

                <TouchableOpacity onPress={backToLogin}>
                  <Text style={styles.footerLink}>
                    {' '}Login
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          ) : (
            <>
              {/* LOGIN AND REGISTER SCREENS */}

              {/* Logo */}
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>TD</Text>
                </View>
              </View>

              {/* Heading */}
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                  {isLogin ? 'Welcome Back!' : 'Create Account'}
                </Text>

                <Text style={styles.subHeading}>
                  {isLogin
                    ? 'Sign in to continue managing your tasks.'
                    : 'Create an account and start organizing your day.'}
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>

                {/* Full Name */}
                {!isLogin && (
                  <>
                    <Text style={styles.label}>Full Name</Text>

                    <View style={styles.inputContainer}>
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="#999999"
                      />

                      <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        placeholderTextColor="#AAAAAA"
                        value={name}
                        onChangeText={setName}
                      />
                    </View>
                  </>
                )}

                {/* Email */}
                <Text style={styles.label}>Email Address</Text>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#999999"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                {/* Password */}
                <Text style={styles.label}>Password</Text>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#999999"
                  />

                  <TextInput
                    style={styles.input}
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

                {/* Confirm Password */}
                {!isLogin && (
                  <>
                    <Text style={styles.label}>Confirm Password</Text>

                    <View style={styles.inputContainer}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#999999"
                      />

                      <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        placeholderTextColor="#AAAAAA"
                        secureTextEntry={!showPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                      />
                    </View>
                  </>
                )}

                {/* Forgot Password Link */}
                {isLogin && (
                  <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={openForgotPassword}
                  >
                    <Text style={styles.forgotText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitText}>
                    {isLogin ? 'Login' : 'Create Account'}
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

              </View>

              {/* Switch Authentication Screen */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {isLogin
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </Text>

                <TouchableOpacity onPress={switchScreen}>
                  <Text style={styles.footerLink}>
                    {isLogin ? ' Register' : ' Login'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Bottom Text */}
              <Text style={styles.bottomText}>
                Organize your day. Achieve your goals.
              </Text>
            </>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 45,
    paddingBottom: 30,
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#5B52E4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },

  headingContainer: {
    marginBottom: 35,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#292743',
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 22,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#292743',
    marginBottom: 10,
    marginTop: 18,
  },

  inputContainer: {
    height: 55,
    borderRadius: 13,
    backgroundColor: '#F7F7FB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#292743',
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },

  forgotText: {
    color: '#5B52E4',
    fontSize: 13,
    fontWeight: '600',
  },

  submitButton: {
    height: 55,
    backgroundColor: '#5B52E4',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 30,
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  footerText: {
    color: '#999999',
    fontSize: 13,
  },

  footerLink: {
    color: '#5B52E4',
    fontSize: 13,
    fontWeight: 'bold',
  },

  bottomText: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 40,
  },

  // FORGOT PASSWORD STYLES

  forgotScreen: {
    width: '100%',
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: '#F7F7FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 55,
  },

  forgotIconContainer: {
    width: 95,
    height: 95,
    borderRadius: 30,
    backgroundColor: '#F0EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },

  forgotHeadingContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },

  forgotHeading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#292743',
    marginBottom: 12,
    textAlign: 'center',
  },

  forgotSubHeading: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 23,
    textAlign: 'center',
  },
});
