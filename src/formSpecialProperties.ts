import { ProductEnum } from './Enum/ProductEnum';
export const formSpecialProperties = {
  [ProductEnum.DVD]: {
    'size': {
      'label': 'Size (MB)',
      'type': 'number',
      'value': 0,
      'error': '',
      'validator': (value: string) => parseInt(value) > 0? '': 'Size must be greater than 0',
      'required': true,
    }
  },
  [ProductEnum.BOOK]: {
    'weight': {
      'label': 'Weight (KG)',
      'type': 'number',
      'value': 0,
      'error': '',
      'validator': (value: string) => parseInt(value) > 0? '': 'Weight must be greater than 0',
      'required': true,
    }
  },
  [ProductEnum.FURNITURE]: {
    'height': {
      'label': 'Height (CM)',
      'type': 'number',
      'value': 0,
      'error': '',
      'validator': (value: string) => parseInt(value) > 0? '': 'Height must be greater than 0',
      'required': true,
    },
    'width': {
      'label': 'Width (CM)',
      'type': 'number',
      'value': 0,
      'error': '',
      'validator': (value: string) => parseInt(value) > 0? '': 'Width must be greater than 0',
      'required': true,
    },
    'length': {
      'label': 'Length (CM)',
      'type': 'number',
      'value': 0,
      'error': '',
      'validator': (value: string) => parseInt(value) > 0? '': 'Length must be greater than 0',
      'required': true,
    }
  }
};

export const formSpecialPropertiesDescription={
  [ProductEnum.DVD]: 'Please provide size',
  [ProductEnum.BOOK]: 'Please provide weight',
  [ProductEnum.FURNITURE]: 'Please provide dimensions'
};