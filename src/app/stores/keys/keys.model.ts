export interface LokaliseKey {
  project_id: string;
  key_id: number;
  created_at: string;
  created_at_timestamp: number;
  key_name: {
    ios: string;
    android: string;
    web: string;
    other: string;
  };
  filenames: {
    ios: string;
    android: string;
    web: string;
    other: string;
  };
  description: string;
  platforms: string[];
  tags: string[];
  is_plural: boolean;
  plural_name: string;
  is_hidden: boolean;
  is_archived: boolean;
  context: string;
  base_words: number;
  char_limit: number;
  custom_attributes: string;
  modified_at: string;
  modified_at_timestamp: number;
  translations_modified_at: string;
  translations_modified_at_timestamp: number;
}
