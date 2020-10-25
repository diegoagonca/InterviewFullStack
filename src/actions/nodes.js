import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res
  };
};

const checkNodeStatusFailure = node => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

//Action reducer to get data bloks
const checkNodeDataBlocks = (node , dataBlock) => {
  return {
    type: types.CHECK_GET_NODE_DATA_BLOCKS,
    node,
    dataBlock
  };
};

export function callApiBlock(node) {

  console.log("****************----------- callApiBlock(node) = ", node);

  return async (dispatch) => {
    try {
      const resDataBlock = await fetch(`${node.url}/api/v1/blocks`);
      if(resDataBlock.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }
      const dataBlock = await resDataBlock.json();
      dispatch(checkNodeDataBlocks(node, dataBlock));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  }
};

export function handleGetDataNodeBlock(node) {
  return (dispatch) => dispatch(callApiBlock(node));
}

export function checkNodeStatuses(list) { //Call from src\containers\Nodes.js
  return (dispatch) => {
    list.forEach(node => {
      dispatch(checkNodeStatus(node));
    });
  };
}

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);
      if(res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }
      const json = await res.json();
      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

