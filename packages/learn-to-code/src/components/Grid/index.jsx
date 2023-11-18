import React from 'react';
import Proptypes from 'prop-types'

export default function Grid(props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {props.children}
    </div>
  );
}

Grid.propTypes = {
    children: Proptypes.node.isRequired
}