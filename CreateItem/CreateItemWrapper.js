import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Icon,
} from '@folio/stripes/components';

import CreateItemModal from './CreateItemModal';

const CreateItemWrapper = ({
  addItem,
  disabled,
  instanceId,
  itemToSave,
  locationId,
  marginBottom0,
  searchButtonStyle,
  searchLabel,
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const openModal = useCallback(() => setIsModalOpened(true), []);
  const closeModal = useCallback(() => setIsModalOpened(false), []);

  return (
    <div>
      <Button
        data-test-add-item
        disabled={disabled}
        key="searchButton"
        buttonStyle={searchButtonStyle}
        marginBottom0={marginBottom0}
        onClick={openModal}
      >
        {searchLabel || <Icon icon="search" color="#fff" />}
      </Button>
      {isModalOpened && (
        <CreateItemModal
          closeCB={closeModal}
          addItem={addItem}
          locationId={locationId}
          instanceId={instanceId}
          itemToSave={itemToSave}
        />
      )}
    </div>
  );
};

CreateItemWrapper.defaultProps = {
  disabled: false,
  itemToSave: {},
  searchButtonStyle: 'primary noRightRadius',
};

CreateItemWrapper.propTypes = {
  addItem: PropTypes.func.isRequired,
  instanceId: PropTypes.string,
  locationId: PropTypes.string,
  disabled: PropTypes.bool,
  searchLabel: PropTypes.node,
  searchButtonStyle: PropTypes.string,
  marginBottom0: PropTypes.bool,
  itemToSave: PropTypes.object,
};

export default CreateItemWrapper;
