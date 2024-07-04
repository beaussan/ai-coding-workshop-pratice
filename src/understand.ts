import * as z from 'zod';

export type TagGroupMap = Record<
  string,
  {
    prefix: string;
    tags: readonly string[];
    description: string;
    tagsMeta: z.ZodType;
  }
>;

export type ImportMap<T extends string> = Record<T, boolean>;

export type TagDef<T extends TagGroupMap> = {
  [Key in keyof T]: Record<
    T[Key]['tags'][number],
    {
      description: string;
      canImport: ImportMap<T[Key]['tags'][number]>;
      meta: z.output<T[Key]['tagsMeta']>;
    }
  >;
};

export const tagGroups = {
  scope: {
    description:
      'A scope tag is used to add boundaries between modules of the monorepo.',
    prefix: 'scope:',
    tags: ['dash', 'shared'] as const,
    tagsMeta: z.object({
      libraryGenerator: z.object({
        canBeGenerated: z.boolean(),
      }),
    }),
  },
  type: {
    description: 'A type tag is used to add information about a library.',
    prefix: 'type:',
    tags: ['data', 'ui', 'feature'] as const,
    tagsMeta: z.object({
      libraryGenerator: z.object({
        canBeGenerated: z.boolean(),
        shouldGenerateStorybook: z.boolean(),
      }),
    }),
  },
} as const satisfies TagGroupMap;

export const tagDefs = {
  scope: {
    shared: {
      description: 'Shared libraries, used across all other libraries',
      canImport: {
        shared: true,
        dash: false,
      },
      meta: {
        libraryGenerator: {
          canBeGenerated: true,
        },
      },
    },
    dash: {
      description: 'Console application related libraries',
      canImport: {
        shared: true,
        dash: false,
      },
      meta: {
        libraryGenerator: {
          canBeGenerated: true,
        },
      },
    },
  },
  type: {
    data: {
      description: 'Data library, with state management and network',
      canImport: {
        data: true,
        feature: false,
        ui: false,
      },
      meta: {
        libraryGenerator: {
          canBeGenerated: true,
          shouldGenerateStorybook: false,
        },
      },
    },
    ui: {
      description: 'Ui library, with only component getting data via props',
      canImport: {
        data: false,
        feature: false,
        ui: true,
      },
      meta: {
        libraryGenerator: {
          canBeGenerated: true,
          shouldGenerateStorybook: true,
        },
      },
    },
    feature: {
      description:
        'Feature library, with connected ui & data to make a feature',
      canImport: {
        data: true,
        feature: true,
        ui: true,
      },
      meta: {
        libraryGenerator: {
          canBeGenerated: true,
          shouldGenerateStorybook: true,
        },
      },
    },
  },
} as const satisfies TagDef<typeof tagGroups>;

export type ScopeTagsList = (typeof tagGroups)['scope']['tags'][number];
export type TypeTagsList = (typeof tagGroups)['type']['tags'][number];
