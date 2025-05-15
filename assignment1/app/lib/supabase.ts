import { AppState, Platform } from 'react-native'
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

// Only import AsyncStorage for native platforms
let AsyncStorage: any = undefined
if (Platform.OS !== 'web') {
  AsyncStorage = require('@react-native-async-storage/async-storage').default
}

const supabaseUrl = 'https://lxbwebkumugyhysshekq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YndlYmt1bXVneWh5c3NoZWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzU4OTMsImV4cCI6MjA1OTc1MTg5M30.sGyvg_one_kd6MNwJCpcpjsIlzIRpqj7_6mZWPlHiVI'

// Conditionally pass AsyncStorage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
})

// Auto refresh session only for native platforms
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
}
