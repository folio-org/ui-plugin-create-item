import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, omitProps } from '@folio/stripes/components';
import className from 'classnames';

import css from './CreateItemWrapper.css';
import CreateItemModal from './CreateItemModal';

export default class CreateItemWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.connectedCreateItemModal = props.stripes.connect(CreateItemModal, { dataKey: props.dataKey });
  }

  state = {
    openModal: false,
  }

  getStyle() {
    const { marginBottom0, marginTop0 } = this.props;

    return className(
      css.searchControl,
      { [css.marginBottom0]: marginBottom0 },
      { [css.marginTop0]: marginTop0 },
    );
  }

  openModal = () => this.setState({
    openModal: true,
  });

  closeModal = () => this.setState({
    openModal: false,
  });

  render() {
    const { disabled, searchButtonStyle, searchLabel } = this.props;
    const props = omitProps(this.props, ['disabled', 'searchButtonStyle', 'searchLabel', 'marginBottom0', 'marginTop0']);

    return (
      <div className={this.getStyle()}>
        <Button
          data-test-add-item
          disabled={disabled}
          key="searchButton"
          buttonStyle={searchButtonStyle}
          onClick={this.openModal}
        >
          {searchLabel || <Icon icon="search" color="#fff" />}
        </Button>
        {this.state.openModal && (
          <this.connectedCreateItemModal
            closeCB={this.closeModal}
            {...props}
          />
        )}
      </div>
    );
  }
}

CreateItemWrapper.defaultProps = {
  dataKey: 'createItem',
  disabled: false,
  searchButtonStyle: 'primary noRightRadius',
};

CreateItemWrapper.propTypes = {
  dataKey: PropTypes.string,
  disabled: PropTypes.bool,
  searchLabel: PropTypes.node,
  searchButtonStyle: PropTypes.string,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
  stripes: PropTypes.object,
};
