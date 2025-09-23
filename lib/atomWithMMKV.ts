import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

type SyncStorage<T> = {
  getItem: (key: string) => T | null
  setItem: (key: string, newValue: T) => void
  removeItem: (key: string) => void
}

const mmkvStorage = createJSONStorage(() => ({
  getItem: (key) => {
    const value = storage.getString(key)
    return value ? JSON.parse(value) : null
  },
  setItem: (key, newValue) => {
    storage.set(key, JSON.stringify(newValue))
  },
  removeItem: (key) => {
    storage.delete(key)
  },
}))

export function atomWithMMKV<T>(key: string, initialValue: T) {
  return atomWithStorage(key, initialValue, mmkvStorage)
}
