import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/nodes";
import Node from "../components/Node";
import { Typography, Box } from "@material-ui/core";

export class Nodes extends Component {
  constructor(props) {
    super(props);
    this.state = { expandedNodeURL: null, nodeSelect: [] };
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
  }

  componentDidMount() {
    const { nodes, actions } = this.props;
    actions.checkNodeStatuses(nodes.list);    
  }

  componentDidUpdate(prevProps, prevState){
    const { actions } = this.props;
    if(prevState.expandedNodeURL != this.state.expandedNodeURL){
      if(this.state.expandedNodeURL !== null){
        actions.handleGetDataNodeBlock(this.state.nodeSelect);
      }
    }
  }

  toggleNodeExpanded(node) {
    const { online, url } = node;
    if(online){
      this.setState({
        expandedNodeURL: url === this.state.expandedNodeURL ? null : url,
        nodeSelect: node
      });
    }
  }

  render() {
    const { nodes } = this.props;
    return (
      <Box paddingTop={7}>
        <Typography variant="h4" component="h1">
          <strong style={{ color: "#000" }}>Nodes</strong>
        </Typography>
        {nodes.list.map((node) => (
          <Node
            node={node}
            key={node.url}
            expanded={node.url === this.state.expandedNodeURL}
            toggleNodeExpanded={this.toggleNodeExpanded} //HighOrderComponent
          />
        ))}
      </Box>
    );
  }
}

Nodes.propTypes = {
  actions: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    nodes: state.nodes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
