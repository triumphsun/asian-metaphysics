export interface HelpItem {
  label: string;
  description: string;
}

/**
 * 動態計算標籤寬度並對齊輸出描述。
 * @param items 包含標籤與描述的列表
 * @param indent 縮排空格數
 */
export const printAligned = (items: HelpItem[], indent = 2): void => {
  if (items.length === 0) return;
  const maxLen = Math.max(...items.map((item) => item.label.length));
  const indentation = ' '.repeat(indent);

  items.forEach(({ label, description }) => {
    const padding = ' '.repeat(maxLen - label.length + 2);
    console.log(`${indentation}${label}${padding}${description}`);
  });
};
