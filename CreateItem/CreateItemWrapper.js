import React, { useState } from 'react';
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
  locationId,
  marginBottom0,
  searchButtonStyle,
  searchLabel,
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => setIsModalOpened(!isModalOpened);

  return (
    <div>
      <Button
        data-test-add-item
        disabled={disabled}
        key="searchButton"
        buttonStyle={searchButtonStyle}
        marginBottom0={marginBottom0}
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
  locationId: PropTypes.string,
  disabled: PropTypes.bool,
  searchLabel: PropTypes.node,
  searchButtonStyle: PropTypes.string,
  marginBottom0: PropTypes.bool,
};

export default CreateItemWrapper;
