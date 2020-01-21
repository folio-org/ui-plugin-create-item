import React, { useState } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import {
  Button,
  Icon,
} from '@folio/stripes/components';

import css from './CreateItemWrapper.css';
import CreateItemModal from './CreateItemModal';

const CreateItemWrapper = ({
  addItem,
  disabled,
  instanceId,
  locationId,
  marginBottom0,
  marginTop0,
  searchButtonStyle,
  searchLabel,
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => setIsModalOpened(!isModalOpened);

  const getStyle = () => {
    return className(
      css.searchControl,
      { [css.marginBottom0]: marginBottom0 },
      { [css.marginTop0]: marginTop0 },
    );
  };

  return (
    <div className={getStyle}>
      <Button
        data-test-add-item
        disabled={disabled}
        key="searchButton"
        buttonStyle={searchButtonStyle}
        onClick={toggleModal}
      >
        {searchLabel || <Icon icon="search" color="#fff" />}
      </Button>
      {isModalOpened && (
        <CreateItemModal
          closeCB={toggleModal}
          addItem={addItem}
          locationId={locationId}
          instanceId={instanceId}
        />
      )}
    </div>
  );
};

CreateItemWrapper.defaultProps = {
  disabled: false,
  searchButtonStyle: 'primary noRightRadius',
};

CreateItemWrapper.propTypes = {
  addItem: PropTypes.func.isRequired,
  instanceId: PropTypes.string.isRequired,
  locationId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  searchLabel: PropTypes.node,
  searchButtonStyle: PropTypes.string,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
};

export default CreateItemWrapper;
