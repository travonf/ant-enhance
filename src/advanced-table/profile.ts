import { DataEntry } from './typings';

export const source = {
  search_form: 'search-form',
  submit_form: 'submit-form',
  detail_list: 'detail-list',
  update_form: 'update-form',
} as const;

export const defaultDataEntry: DataEntry<any> = {
  ComponentType: 'Input',
  disabled: true,
};
