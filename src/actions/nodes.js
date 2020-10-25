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
const checkNodeDataBlocks = (node, dataBlock) => {
  return {
    type: types.CHECK_GET_NODE_DATA_BLOCKS,
    node,
    dataBlock
  };
};

export function callApiBlock(nodeSelect) {
  return async (dispatch) => {
    try {
      dispatch({type: "CHECK_GET_NODE_DATA_BLOCKS", nodeSelect: nodeSelect});
      const resDataBlock = await fetch(`${nodeSelect.url}/api/v1/blocks`);
      if(resDataBlock.status >= 400) {
        dispatch(checkNodeStatusFailure(nodeSelect));
      }
      const dataBlock = await resDataBlock.json();
      dispatch(checkNodeDataBlocks(nodeSelect, dataBlock));
    } catch (err) {
      dispatch(checkNodeStatusFailure(nodeSelect));
    }
  }
};

export function handleGetDataNodeBlock(nodeSelect) {
  return (dispatch) => dispatch(callApiBlock(nodeSelect));
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

