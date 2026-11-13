
import { StyleSheet } from 'react-native';

const authStyles = StyleSheet.create({
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
    marginBottom: 30,
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
    fontSize: 25,
    fontWeight: 'bold',
  },

  headingContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },

  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#292743',
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 22,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#292743',
    marginBottom: 9,
    marginTop: 17,
  },

  inputContainer: {
    height: 55,
    backgroundColor: '#F7F7FB',
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    height: '100%',
    marginLeft: 12,
    fontSize: 14,
    color: '#292743',
  },

  submitButton: {
    height: 55,
    backgroundColor: '#5B52E4',
    borderRadius: 14,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  footerText: {
    fontSize: 14,
    color: '#888888',
  },

  footerLink: {
    fontSize: 14,
    color: '#5B52E4',
    fontWeight: 'bold',
  },

  bottomText: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 35,
  },
});

export default authStyles;
