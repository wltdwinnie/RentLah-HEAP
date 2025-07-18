import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enResources = {
  translation: {
    loading: 'Loading...',
    settings: 'Settings',
    profile: 'Profile',
    appearance: 'Appearance',
    language: 'Language',
    logout: 'Log Out',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    resetPassword: 'Reset Password',
    login: 'Login',
    signup: 'Sign Up',
    forgotPassword: 'Forgot Password',
    'My Account': 'My Account',
    username: 'Username',
    'verified-email': 'Verified Email',
    Close: 'Close',
    // Add more translations as needed
  }
};

// Chinese translations (simplified example)
const zhResources = {
  translation: {
    loading: '加载中...',
    settings: '设置',
    profile: '个人资料',
    appearance: '外观',
    language: '语言',
    logout: '登出',
    email: '电子邮件',
    password: '密码',
    confirmPassword: '确认密码',
    resetPassword: '重设密码',
    login: '登录',
    signup: '注册',
    forgotPassword: '忘记密码',
    'My Account': '我的账户',
    username: '用户名',
    'verified-email': '已验证的电子邮件',
    Close: '关闭',
    // Add more translations as needed
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enResources,
      zh: zhResources
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false // We'll handle suspense separately
    }
  });

export default i18n;
