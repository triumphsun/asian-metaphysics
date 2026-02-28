# 技術棧說明 (Tech Stack)

本專案是一個基於 TypeScript 的 Node.js 應用程式，整合了現代化的開發工具鏈與程式碼規範。

## 1. 語言與執行環境 (Languages & Runtime)
- **TypeScript (v5.9.3)**: 核心開發語言。
- **Node.js**: 執行環境（目標為 ESNext）。
- **CommonJS (CJS)**: 模組化標準（由 `tsconfig.json` 設定）。

## 2. 建置與執行工具 (Build & Execution)
- **esbuild (v0.27.3)**: 負責專案打包。
  - 進入點: `src/index.ts`
  - 輸出點: `dist/index.js`
  - 配置: 支援 Bundling 與 Node 平台設定。
- **tsx (v4.21.0)**: 用於開發環境執行 TypeScript（`npm run dev`），不需預先手動打包。

## 3. 程式碼品質與格式化 (Linting & Formatting)
- **ESLint (v8.57.1)**: 靜態程式碼檢查。
  - **Airbnb 規範**: 使用 `eslint-config-airbnb-base` 與 `eslint-config-airbnb-typescript/base`。
  - **TypeScript 整合**: 使用 `@typescript-eslint/eslint-plugin` 與 `@typescript-eslint/parser`。
- **Prettier (v3.8.1)**: 自動程式碼格式化。
  - 已透過 `eslint-plugin-prettier` 與 `eslint-config-prettier` 整合進 ESLint 流程。
  - 配置詳見 `.prettierrc`。

## 4. 測試框架 (Testing)
- **Jest (v30.2.0)**: 測試執行器。
- **ts-jest (v29.4.6)**: 讓 Jest 能直接執行 TypeScript 測試案例。
- **配置**: 支援路徑別名解析（`moduleNameMapper`），詳見 `jest.config.js`。

## 5. 路徑別名 (Path Alias)
- **別名規則**: `@/*` 指向 `src/*`。
- **支援範圍**:
  - **TypeScript**: 透過 `tsconfig.json` 的 `paths` 設定。
  - **Jest**: 透過 `jest.config.js` 的 `moduleNameMapper` 設定。
  - **ESLint**: 使用 `eslint-import-resolver-typescript` 解析別名路徑。
  - **esbuild**: 原生支援 `tsconfig.json` 的路徑解析。

## 6. 專案結構 (Project Structure)
- `src/`: 原始碼目錄。
  - `index.ts`: 程式進入點。
  - `index.test.ts`: 單元測試。
  - `utils/`: 通用工具函式。
- `dist/`: 打包後的輸出目錄（已列入 `.gitignore`）。
- `docs/`: 專案相關文件。

## 7. 常用指令 (Scripts)
- `npm run dev -- <args>`: 開發模式下執行程式。
- `npm run build`: 打包專案至 `dist/`。
- `npm run test`: 執行所有單元測試。
- `npm run lint`: 執行 ESLint 檢查。
- `npm run format`: 使用 Prettier 格式化程式碼。
