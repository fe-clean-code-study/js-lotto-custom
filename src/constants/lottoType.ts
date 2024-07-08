export interface LottoType {
  selectedCount: number;
  minNumber: number;
  maxNumber: number;
  winningInfo: {
    matchCount: number;
    reward: number;
    includeBonus?: boolean;
  }[];
}

export const LOTTO_TYPE: { [key: string]: LottoType } = {
  '1': {
    selectedCount: 6,
    minNumber: 1,
    maxNumber: 45,
    winningInfo: [
      {
        matchCount: 3,
        reward: 5000,
      },
      {
        matchCount: 4,
        reward: 50000,
      },
      {
        matchCount: 5,
        reward: 1500000,
      },
      {
        matchCount: 5,
        includeBonus: true,
        reward: 30000000,
      },
      {
        matchCount: 6,
        reward: 2000000000,
      },
    ],
  },
  '2': {
    selectedCount: 6,
    minNumber: 1,
    maxNumber: 54,
    winningInfo: [
      {
        matchCount: 4,
        reward: 5000,
      },
      {
        matchCount: 5,
        reward: 50000,
      },
      {
        matchCount: 5,
        reward: 1500000,
      },
      {
        matchCount: 5,
        includeBonus: true,
        reward: 30000000,
      },
      {
        matchCount: 6,
        reward: 2000000000,
      },
    ],
  },
  '3': {
    selectedCount: 4,
    minNumber: 1,
    maxNumber: 40,
    winningInfo: [
      {
        matchCount: 4,
        reward: 5000,
      },
      {
        matchCount: 5,
        reward: 50000,
      },
      {
        matchCount: 5,
        reward: 1500000,
      },
      {
        matchCount: 5,
        includeBonus: true,
        reward: 30000000,
      },
      {
        matchCount: 6,
        reward: 2000000000,
      },
    ],
  },
  '4': {
    selectedCount: 7,
    minNumber: 1,
    maxNumber: 69,
    winningInfo: [
      {
        matchCount: 4,
        reward: 5000,
      },
      {
        matchCount: 5,
        reward: 50000,
      },
      {
        matchCount: 5,
        reward: 1500000,
      },
      {
        matchCount: 5,
        includeBonus: true,
        reward: 30000000,
      },
      {
        matchCount: 6,
        reward: 2000000000,
      },
    ],
  },
};
