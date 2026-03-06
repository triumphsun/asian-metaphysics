export interface HelpItem {
  label: string;
  description: string;
}

/**
 * 動態計算標籤寬度並對齊輸出描述。
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

/**
 * 將原始參數對照映射表，轉換為規範化的標籤集 (Canonical Tags)。
 */
export const parseFlags = <T extends string>(
  args: string[],
  flagMap: Record<string, T>,
): Set<T> => {
  const flags = new Set<T>();
  args.forEach((arg) => {
    if (flagMap[arg]) {
      flags.add(flagMap[arg]);
    }
  });
  return flags;
};

export type Validator<T> = (flags: Set<T>) => string | null;

/**
 * 建立互斥標籤驗證規則。
 */
export const mutuallyExclusive = <T extends string>(group: T[]): Validator<T> => {
  return (flags: Set<T>) => {
    const present = group.filter((flag) => flags.has(flag));
    if (present.length > 1) {
      return `錯誤：標籤 [${present.join(', ')}] 不能同時使用。`;
    }
    return null;
  };
};

/**
 * 執行所有驗證規則。
 */
export const validateFlags = <T extends string>(
  flags: Set<T>,
  validators: Validator<T>[],
): string | null => {
  let errorMessage: string | null = null;
  validators.some((validator) => {
    errorMessage = validator(flags);
    return errorMessage !== null;
  });
  return errorMessage;
};
