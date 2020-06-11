import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { get, keyBy, some } from 'lodash';
import { FormattedMessage } from 'react-intl';

import ItemForm from '@folio/inventory/src/edit/items/ItemForm';
import {
  CalloutContext,
  stripesConnect,
  stripesShape,
} from '@folio/stripes/core';
import {
  LoadingView,
  MessageBanner,
  Modal,
} from '@folio/stripes/components';

import css from './CreateItemModal.css';

const CreateItemModal = ({
  addItem,
  closeCB,
  itemToSave,
  mutator,
  resources,
  stripes,
}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const callout = useContext(CalloutContext);

  const onSubmit = useCallback((values) => {
    setIsLoading(true);

    return mutator.items.POST(values)
      .then((item) => {
        addItem(item);
        callout.sendCallout({ message: <FormattedMessage id="ui-plugin-create-item.success.onSave" /> });
        closeCB();
      })
      .catch(() => {
        setError('onSave');
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addItem, callout, closeCB]);

  const referenceTables = {
    contributorTypes: get(resources, 'contributorTypes.records'),
    contributorNameTypes: get(resources, 'contributorNameTypes.records'),
    instanceRelationshipTypes: get(resources, 'instanceRelationshipTypes.records'),
    identifierTypes: get(resources, 'identifierTypes.records'),
    classificationTypes: get(resources, 'classificationTypes.records'),
    instanceTypes: get(resources, 'instanceTypes.records'),
    instanceFormats: get(resources, 'instanceFormats.records'),
    alternativeTitleTypes: get(resources, 'alternativeTitleTypes.records'),
    instanceStatuses: get(resources, 'instanceStatuses.records'),
    modesOfIssuance: get(resources, 'modesOfIssuance.records'),
    electronicAccessRelationships: get(resources, 'electronicAccessRelationships.records'),
    statisticalCodeTypes: get(resources, 'statisticalCodeTypes.records'),
    statisticalCodes: get(resources, 'statisticalCodes.records'),
    illPolicies: get(resources, 'illPolicies.records'),
    holdingsTypes: get(resources, 'holdingsTypes.records'),
    callNumberTypes: get(resources, 'callNumberTypes.records'),
    holdingsNoteTypes: get(resources, 'holdingsNoteTypes.records'),
    materialTypes: get(resources, 'materialTypes.records'),
    loanTypes: get(resources, 'loanTypes.records'),
    itemNoteTypes: get(resources, 'itemNoteTypes.records'),
    itemDamagedStatuses: get(resources, 'itemDamagedStatuses.records'),
  };

  const holdingsRecord = get(resources, 'holdings.records.0', {});
  const isLoadingResources = !resources
    || some(Object.keys(referenceTables), (k) => !resources[k] || !resources[k].hasLoaded)
    || !resources.locations || resources.locations.pending
    || !resources.instance || resources.instance.pending
    || !resources.holdings || resources.holdings.pending;

  referenceTables.locationsById = keyBy(resources?.locations?.records, 'id');

  const instance = get(resources, 'instance.records.0', {});
  const initialValues = {
    status: { name: 'On order' },
    holdingsRecordId: holdingsRecord.id,
    ...itemToSave,
  };
  const errorKey = holdingsRecord.id ? error : 'noHolding';

  return (
    <Modal
      contentClass={css.createItemModalWrapper}
      dismissible
      label=""
      onClose={closeCB}
      open
      showHeader={false}
      size="large"
    >
      <div className={css.createItemModal}>
        {!isLoadingResources && errorKey && (
          <MessageBanner
            className={css.createItemError}
            type="warning"
          >
            <FormattedMessage id={`ui-plugin-create-item.error.${errorKey}`} />
          </MessageBanner>
        )}
        {(isLoading || isLoadingResources) ? <LoadingView /> : (
          <ItemForm
            okapi={stripes.okapi}
            stripes={stripes}
            onSubmit={onSubmit}
            initialValues={initialValues}
            referenceTables={referenceTables}
            holdingsRecord={holdingsRecord}
            instance={instance}
            onCancel={closeCB}
          />
        )}
      </div>
    </Modal>
  );
};

CreateItemModal.manifest = {
  identifierTypes: {
    type: 'okapi',
    records: 'identifierTypes',
    path: 'identifier-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
  contributorTypes: {
    type: 'okapi',
    records: 'contributorTypes',
    path: 'contributor-types?limit=400&query=cql.allRecords=1 sortby name',
  },
  contributorNameTypes: {
    type: 'okapi',
    records: 'contributorNameTypes',
    path: 'contributor-name-types?limit=1000&query=cql.allRecords=1 sortby ordering',
  },
  instanceFormats: {
    type: 'okapi',
    records: 'instanceFormats',
    path: 'instance-formats?limit=1000&query=cql.allRecords=1 sortby name',
  },
  instanceTypes: {
    type: 'okapi',
    records: 'instanceTypes',
    path: 'instance-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
  classificationTypes: {
    type: 'okapi',
    records: 'classificationTypes',
    path: 'classification-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
  alternativeTitleTypes: {
    type: 'okapi',
    records: 'alternativeTitleTypes',
    path: 'alternative-title-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
  locations: {
    type: 'okapi',
    records: 'locations',
    path: 'locations?limit=1000&query=cql.allRecords=1 sortby name',
  },
  instanceRelationshipTypes: {
    type: 'okapi',
    records: 'instanceRelationshipTypes',
    path: 'instance-relationship-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
  instanceStatuses: {
    type: 'okapi',
    records: 'instanceStatuses',
    path: 'instance-statuses?limit=1000&query=cql.allRecords=1 sortby name',
  },
  modesOfIssuance: {
    type: 'okapi',
    records: 'issuanceModes',
    path: 'modes-of-issuance?limit=1000&query=cql.allRecords=1 sortby name',
  },
  electronicAccessRelationships: {
    type: 'okapi',
    records: 'electronicAccessRelationships',
    path: 'electronic-access-relationships?limit=1000&query=cql.allRecords=1 sortby name',
  },
  statisticalCodeTypes: {
    type: 'okapi',
    records: 'statisticalCodeTypes',
    path: 'statistical-code-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
  statisticalCodes: {
    type: 'okapi',
    records: 'statisticalCodes',
    path: 'statistical-codes?limit=1000&query=cql.allRecords=1 sortby statisticalCodeTypeId',
  },
  illPolicies: {
    type: 'okapi',
    path: 'ill-policies?limit=1000&query=cql.allRecords=1 sortby name',
    records: 'illPolicies',
  },
  holdingsTypes: {
    type: 'okapi',
    path: 'holdings-types?limit=1000&query=cql.allRecords=1 sortby name',
    records: 'holdingsTypes',
  },
  callNumberTypes: {
    type: 'okapi',
    path: 'call-number-types?limit=1000&query=cql.allRecords=1 sortby name',
    records: 'callNumberTypes',
  },
  holdingsNoteTypes: {
    type: 'okapi',
    path: 'holdings-note-types?limit=1000&query=cql.allRecords=1 sortby name',
    records: 'holdingsNoteTypes',
  },
  materialTypes: {
    type: 'okapi',
    path: 'material-types',
    records: 'mtypes',
  },
  loanTypes: {
    type: 'okapi',
    path: 'loan-types',
    params: {
      query: 'cql.allRecords=1 sortby name',
      limit: '40',
    },
    records: 'loantypes',
  },
  instance: {
    type: 'okapi',
    path: 'inventory/instances/!{instanceId}',
  },
  items: {
    type: 'okapi',
    records: 'items',
    path: 'inventory/items',
    fetch: false,
    throwErrors: false,
  },
  holdings: {
    type: 'okapi',
    records: 'holdingsRecords',
    path: 'holdings-storage/holdings?query=instanceId==!{instanceId} and permanentLocationId==!{locationId}',
  },
  itemNoteTypes: {
    type: 'okapi',
    path: 'item-note-types',
    params: {
      query: 'cql.allRecords=1 sortby name',
      limit: '1000',
    },
    records: 'itemNoteTypes',
  },
  itemDamagedStatuses: {
    type: 'okapi',
    path: 'item-damaged-statuses?limit=1000&query=cql.allRecords=1 sortby name',
    records: 'itemDamageStatuses',
  },
};

CreateItemModal.propTypes = {
  stripes: stripesShape.isRequired,
  closeCB: PropTypes.func.isRequired,
  itemToSave: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired,
  mutator: PropTypes.object,
  resources: PropTypes.object,
};

export default stripesConnect(CreateItemModal);
