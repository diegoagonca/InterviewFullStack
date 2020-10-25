import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './nodes';

describe('Actions', () => {
  beforeAll(() => {});
  afterAll(() => {});

  const node = {
    url: 'http://localhost:3002',
    online: false,
    name: null
  };

  const nodeSelect = {
    url: 'https://calm-anchorage-82141.herokuapp.com',
    online: false,
    name: 'Node 3',
    loading: false 
  }

  //New test - Diego
  it('should create an action to check call API block', () => {
    const dispatch = jest.fn();
    const expected = {
      type: "CHECK_GET_NODE_DATA_BLOCKS",
      nodeSelect: nodeSelect
    };
    expect(typeof (ActionCreators.callApiBlock(nodeSelect))).toEqual('function');
    ActionCreators.callApiBlock(nodeSelect)(dispatch);
    expect(dispatch).toBeCalledWith(expected);
  });

  it('should create an action to save fuel savings', () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.CHECK_NODE_STATUS_START,
      node
    };
    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.checkNodeStatus(node))).toEqual('function');
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.checkNodeStatus(node)(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
  });


});
