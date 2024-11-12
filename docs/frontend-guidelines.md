# React Native 與 TypeScript 前端開發規範

## 0. 開發原則

1. 重複的邏輯原則：
   - 避免過早的過度設計（Overdesign）
   - 當相同的邏輯或功能出現三次以上時，才應考慮將其提取為可重用函數（util functions）。
   - 避免過早地將邏輯抽象化，導致不必要的複雜度。
   - (這邊指的 util funcitons 是放在 utils 檔案下的 function，非頁面內使用的 function )
2. 可讀性優先:
   - 代碼應該易於理解，命名規範清晰。
   - 簡單而直觀的程式碼不僅有助於團隊協作，也能提高未來維護和擴展的效率。
3. 文檔和註釋
  撰寫清晰的文檔與註釋，特別是在複雜的邏輯或決策上。
4. NeverNesting
5. 
   - 避免過多的巢狀條件判斷
   - 過多的 if-else 或 switch-case 嵌套會使代碼變得難以理解。
   - 應該使用早 Early Return (提前返回) 或合適的邏輯分支來減少巢狀層數。
   - Function 可使用 return 減少巢狀層數，Forloop 可以用 continue 或 break 減少巢狀層數
   - Function 的範例:
    ```typescript
    // 應該的做法
    function processOrder(order: Order) {
      if (!order.isValid()) {
        console.log('Invalid order');
        return;
      }
      if (order.items.length === 0) {
        console.log('No items in order');
        return;
      }
      // 處理訂單
    }

    // 不建議
    function processOrder(order: Order) {
      if (order.isValid()) {
        if (order.items.length > 0) {
            // 處理訂單
          } else {
            console.log('No items in order');
          }
      } else {
        console.log('Invalid order');
      }
    }
    ```
6. 單一職責原則（Single Responsibility Principle）
   - 每個函數、元件或模組應該只負責一項功能或邏輯。過多的功能混合會導致程式碼的複雜性和難以維護。
7. 錯誤處理
   - 使用 try-catch 處理異常，並合理回報錯誤。
   - 在 API 請求中，保證對錯誤進行適當的處理和回應。
  ```typescript
  // 錯誤處理範例
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.status == 200) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // 可以將錯誤傳遞給外層處理
    }
  };
  ```


## 1. File Structure

資料夾結構:

```plaintext
src/
├── assets/            # 靜態資源（例如圖片、字體）
├── src/               # 頁面程式碼
├── services/          # API 和網路請求
└── App.tsx            # 主程式
```

## 2. Naming Conventions

- 自定義 hook: 使用 use 作為自定義 hook 的前綴(例如: useUser)。
- 函數和變數: 使用 **camelCase** 命名函數和變數（例如：handlePress，fetchUserData）。
- component 元件: 使用 **PascalCase**，(例如： UserProfile)，並記得 `export default` 該元件
  - 附註: component 雖然長得像 function 但請不要使用 camelcase，不然 react 會辨識不到
- interface 或 type: 使用 **PascalCase**，(例如：UserProfileProps)
- 若要在其他頁面使用此頁 interface ，可以 `export interface`，並在其他頁 `import interface`
```typescript
// user.tsx
export interface UserProp {
  id: number;
  name: string;
  email: string;
}

// userprofile.tsx
import { UserProp } from './user'

const UserProfile: React.FC<UserProfileProps> = ({ 
  user 
}: UserProfileProps ) => {
  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
};

export default UserProfile;
```


## 3. TypeScript Typing Conventions

使用 interface (優先使用) 或 type 來定義元件的型別（props）：

```typescript
import React from 'react';
import { Text, View } from 'react-native';

interface UserProfileProps {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user 
}: UserProfileProps ) => {
  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
};

export default UserProfile;
```

## 4. Styling Conventions
使用 `StyleSheet.create` 定義 styling (css) ，按元件部分分組 styling ，以提高效能和可讀性。

```typescript
// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home</Text>
    </View>
  );
};

// 用 stylesheet 來定義 styling
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333' 
  },
});

export default HomeScreen;
```

## 5. Error Handling
使用 `try-catch` 處理非同步錯誤。

```typescript
const loadUserData = async () => {
  try {
    const data = await fetchUserData();
    setUser(data);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    setErrorMessage('Unable to load user data.');
  }
};
```

## 6. Folder Aliases and Import Organization
在 `tsconfig.json` 中設置**資料夾別名**以更清晰的import library、component、styling。

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@screens/*": ["screens/*"],
      "@hooks/*": ["hooks/*"]
    }
  }
}
```
組織良好的 import 範例：

```typescript
import React from 'react';
import { View } from 'react-native';

import Header from '@components/Header';
import useUser from '@hooks/useUser';

import styles from './styles';
```