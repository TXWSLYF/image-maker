import { difference, merge } from 'lodash';
import { groupLayer, imgLayer } from 'src/layer';
import treeWalker from './treeWalker';

test('treeWalker', () => {
  const tree: ILayersById = {
    '1': merge(groupLayer('1'), { properties: { children: ['5', '2', '6'] } }),
    '2': merge(groupLayer('2'), { properties: { children: ['3'] } }),
    '3': imgLayer('3'),
    '4': imgLayer('4'),
    '5': merge(groupLayer('5'), { properties: { children: ['10', '9', '4'] } }),
    '6': merge(groupLayer('6'), { properties: { children: ['7', '8'] } }),
    '7': imgLayer('7'),
    '8': imgLayer('8'),
    '9': imgLayer('9'),
    '10': imgLayer('10'),
  };

  const arr1: string[] = [];
  const arr2: string[] = [];
  const arr3: string[] = [];
  const arr4: string[] = [];

  treeWalker('1', tree, (id) => {
    arr1.push(id);
  });

  treeWalker('2', tree, (id) => {
    arr2.push(id);
  });

  treeWalker('3', tree, (id) => {
    arr3.push(id);
  });

  treeWalker('5', tree, (id) => {
    arr4.push(id);
  });

  expect(arr1).toHaveLength(10);
  expect(arr2).toHaveLength(2);
  expect(arr3).toHaveLength(1);
  expect(arr4).toHaveLength(4);

  expect(difference(arr1, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])).toEqual([]);
  expect(difference(arr2, ['2'])).toEqual(['3']);
  expect(arr3).toEqual(['3']);
  expect(difference(arr4, ['5'])).toEqual(['10', '9', '4']);
});
