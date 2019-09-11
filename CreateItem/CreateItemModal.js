import React from 'react';
import PropTypes from 'prop-types';
import { get, keyBy, some } from 'lodash';
import { FormattedMessage } from 'react-intl';

import ItemForm from '@folio/inventory/src/edit/items/ItemForm';
import {
  Modal,
  omitProps,
} from '@folio/stripes/components';

import css from './CreateItemModal.css';

export default class CreateItemModal extends React.Component {
  static manifest = {
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

  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    closeCB: PropTypes.func.isRequired,
    locationId: PropTypes.string.isRequired,
    instanceId: PropTypes.string.isRequired,
    addItem: PropTypes.func.isRequired,
    mutator: PropTypes.object,
    onCloseModal: PropTypes.func,
    openWhen: PropTypes.bool,
    dataKey: PropTypes.string.isRequired,
    resources: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.connectedApp = props.stripes.connect(ItemForm, { dataKey: props.dataKey });

    this.state = {
      error: null,
    };
  }

  closeModal = () => {
    this.props.closeCB();
    this.setState({
      error: null,
    });
  }

  onSubmit = (values) => {
    const { addItem, mutator } = this.props;

    mutator.items.POST(values)
      .then((item) => {
        addItem(item);
        this.closeModal();
      })
      .catch(() => this.setState({ error: 'onSave' }));
  }

  render() {
    const { resources } = this.props;
    const { error } = this.state;

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

    if (!resources
      || some(Object.keys(referenceTables), (k) => !resources[k] || !resources[k].hasLoaded)
      || !resources.locations || !resources.locations.hasLoaded
      || !resources.instance || !resources.instance.hasLoaded
      || !resources.holdings || !resources.holdings.hasLoaded
    ) return null;

    referenceTables.locationsById = keyBy(resources.locations.records, 'id');

    const holdings = get(resources, 'holdings.records', [{}]);
    const holdingsRecord = {
      ...holdings[0],
      permanentLocationId: this.props.locationId,
    };
    const instance = get(resources, 'instance.records.0', {});
    const props = omitProps(this.props, ['resources', 'mutator', 'closeCB', 'locationId', 'instanceId']);
    const initialValues = {
      status: { name: 'On order' },
      holdingsRecordId: holdingsRecord.id,
    };
    const errorKey = holdingsRecord.id ? error : 'noHolding';

    return (
      <Modal
        dismissible
        label=""
        onClose={this.closeModal}
        open
        showHeader={false}
        size="large"
      >
        <div className={css.createItemModal}>
          {errorKey && (
            <div className={css.createItemError}>
              <FormattedMessage id={`ui-plugin-create-item.error.${errorKey}`} />
            </div>
          )}
          <this.connectedApp
            {...props}
            onSubmit={this.onSubmit}
            initialValues={initialValues}
            referenceTables={referenceTables}
            holdingsRecord={holdingsRecord}
            instance={instance}
            onCancel={this.closeModal}
          />
        </div>
      </Modal>
    );
  }
}
